require('dotenv/config');
const express = require('express');

const db = require('./database');
const bcrypt = require('bcrypt');
const format = require('pg-format');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/cars', (req, res, next) => {
  const { category, orderBy } = req.query;
  if (category && !orderBy) {
    const sql = format(
      'select * from %I where %I = %L;',
      'cars', 'category', category
    );
    db.query(sql)
      .then(result => {
        const cars = result.rows;
        res.json(cars);
      })
      .catch(err => next(err));
  } else if (!category && orderBy) {
    const sql = format(
      'select * from %I order by %I desc;',
      'cars', orderBy
    );
    db.query(sql)
      .then(result => {
        const cars = result.rows;
        res.json(cars);
      })
      .catch(err => next(err));
  } else if (category && orderBy) {
    const sql = format(
      'select * from "cars" where "category" = %L order by %I desc;',
      category, orderBy
    );
    db.query(sql)
      .then(result => {
        const cars = result.rows;
        res.json(cars);
      })
      .catch(err => next(err));
  } else {
    const sql = `
      select * from "cars";
    `;
    db.query(sql)
      .then(result => {
        const cars = result.rows;
        res.json(cars);
      })
      .catch(err => next(err));
  }
});

app.get('/api/cars/:carId', (req, res, next) => {
  const { carId } = req.params;
  const idIsValid = typeof parseInt(carId) === 'number' && carId > 0;
  if (!idIsValid) {
    return next(new ClientError('Id must be a positive integer.', 400));
  }
  const sql = format(
    `select * from "cars"
      where "carId" = %L;`, carId
  );
  db.query(sql)
    .then(result => {
      const car = result.rows[0];
      if (!car) {
        throw new ClientError(`Cannot find a car with Id ${carId}.`, 404);
      }
      res.json(car);
    })
    .catch(err => next(err));
});

app.get('/api/users/:userId', (req, res, next) => {
  const { userId } = req.params;
  const idIsValid = typeof parseInt(userId) === 'number' && userId > 0;
  if (!idIsValid) {
    return next(new ClientError('Id must be a positive integer.', 400));
  }
  const sql = format(
    `select * from "users"
      where "userId" = %L;`, userId
  );
  db.query(sql)
    .then(result => {
      const user = result.rows[0];
      if (!user) {
        throw new ClientError(`Cannot find a car with Id ${userId}.`, 404);
      }
      res.json(user);
    })
    .catch(err => next(err));
});

app.get('/api/rentals', (req, res, next) => {
  const { userId } = req.session;
  if (!userId) {
    return next(new ClientError('Invalid userId.', 400));
  }
  const dbRentalsColumns = ['rentalId', 'userId', 'carId', 'total', 'startDate', 'endDate'];
  const dbCarsColumns = ['make', 'availability', 'image'];
  const sql = format(`
    select "r".%I,
            "c".%I
      from "cars" as "c"
      join "rentals" as "r" using (%I)
      where "r".%I = %L;`,
  dbRentalsColumns, dbCarsColumns, 'carId', 'userId', userId
  );
  db.query(sql)
    .then(result => {
      const pastRentals = result.rows;
      res.json(pastRentals);
    })
    .catch(err => next(err));
});

app.post('/api/rentals', (req, res, next) => {
  const { userId } = req.session;
  const { carId, total, startDate, endDate } = req.body;
  if (!userId) {
    return next(new ClientError('User must have a valid Id.', 400));
  } else if (!carId || !total || !startDate || !endDate) {
    return next(new ClientError('User must fill all fields.', 400));
  }
  const dbColumns = ['rentalId', 'userId', 'carId', 'total', 'startDate', 'endDate'];
  const rentalDetails = [userId, carId, total, startDate, endDate];
  const sql = format(`
      insert into %I (%I)
      values (default, %L)
      returning *;`, 'rentals', dbColumns, rentalDetails
  );
  db.query(sql)
    .then(response => {
      const rentalConfirmation = response.rows[0];
      const sql = format(`
          update "cars"
              set "availability" = %L
            where "carId"        = %L
        returning "availability";`, 'false', carId
      );
      return (
        db.query(sql)
          .then(() => res.json(rentalConfirmation))
      );
    })
    .catch(err => next(err));
});

app.post('/api/users', (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return next(new ClientError('User must fill all fields.', 400));
  }
  bcrypt
    .hash(password, 10)
    .then(hash => {
      const dbColumns = ['firstName', 'lastName', 'email', 'password'];
      const accountDetails = [firstName, lastName, email, hash];
      const sql = format(`
          insert into %I (%I)
          values (%L)`, 'users', dbColumns, accountDetails
      );
      return (
        db.query(sql)
          .then(result => res.status(201).json({
            message: 'Account created successfully.'
          }))
      );
    }).catch(err => next(err));
});

app.get('/api/auth', (req, res, next) => {
  if (!req.session.userId) {
    return res.json({ user: null });
  }
  const sql = `
    select "u"."userId",
           "u"."firstName",
           "u"."lastName",
           "u"."email",
           "u"."verified"
      from "users" as "u"
     where "userId" = $1
     group by "u"."userId"
     limit 1
  `;
  const params = [req.session.userId];
  db
    .query(sql, params)
    .then(result => {
      const user = result.rows[0];
      req.session.userId = user.userId;
      res.json({ user });
    })
    .catch(err => next(err));
});

app.post('/api/auth', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ClientError('User must have email and password to login.', 400));
  }
  bcrypt
    .hash(password, 10)
    .then(hash => {
      const sql = format(`
          select *
            from "users"
           where "email" = %L;`, email
      );
      return (
        db.query(sql)
          .then(result => {
            const user = result.rows[0];
            if (!user) {
              throw new ClientError('Email or password is not correct', 400);
            }
            const { password: dbPassword, userId } = user;
            return (
              bcrypt
                .compare(password, dbPassword)
                .then(response => {
                  if (!response) {
                    throw new ClientError('Email or password is not correct', 400);
                  }
                  req.session.userId = userId;
                  return res.json(user);
                })
            );
          })
      );
    })
    .catch(err => next(err));
});

app.put('/api/users/:userId', (req, res, next) => {
  const { firstName, lastName, email } = req.body;
  const { userId } = req.session;
  const userIdIsValid = typeof parseInt(userId) === 'number' && userId > 0;

  if (!userIdIsValid) {
    throw next(new ClientError('Id must be a positive integer.', 400));
  } else if (!firstName || !lastName || !email) {
    throw next(new ClientError('Cannot find all information', 400));
  }

  const sql = format(
      `update %I
          set "firstName" = %L,
              "lastName" = %L,
              "email" = %L
        where "userId" = %L
    returning *;`, 'users', firstName, lastName, email, userId
  );

  db.query(sql)
    .then(result => {
      const user = result.rows[0];
      res.json(user);
    })
    .catch(err => next(err));
});

app.delete('/api/auth', (req, res, next) => {
  delete req.session.userId;
  return res.status(204).json({ user: null });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
