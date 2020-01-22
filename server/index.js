require('dotenv/config');
const express = require('express');

const db = require('./database');
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
  const getAllCarsSql = `
    SELECT *
      FROM "cars"
  `;
  db.query(getAllCarsSql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/cars', (req, res, next) => {
  if (!req.session.userId) {
    throw (new ClientError('UserId is not logged in!', 400));
  }
  const sql = `
    SELECT "c" "userId",
           "c" "total",
           "c" "start-date",
           "c" "end-date"
           "p" "make"
           "p" "rate"
      FROM "rentals" as "c"
      JOIN "cars" as "p" using "carId"
     WHERE "c"."userId" = $1
  `;
  const params = [req.session.userId];
  db.query(sql, params)
    .then(result => res.status(200).json(result.rows))
    .catch(err => {
      console.err(err);
      next(new ClientError('An unexpected error occured'), 404);
    });
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
