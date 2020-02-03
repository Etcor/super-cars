--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.rentals DROP CONSTRAINT rentals_pkey;
ALTER TABLE ONLY public.cars DROP CONSTRAINT cars_pkey;
ALTER TABLE public.users ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE public.rentals ALTER COLUMN "rentalId" DROP DEFAULT;
ALTER TABLE public.cars ALTER COLUMN "carId" DROP DEFAULT;
DROP SEQUENCE public."users_userId_seq";
DROP TABLE public.users;
DROP SEQUENCE public."rentals_rentalId_seq";
DROP TABLE public.rentals;
DROP SEQUENCE public."cars_carId_seq";
DROP TABLE public.cars;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cars; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cars (
    "carId" integer NOT NULL,
    make text NOT NULL,
    image text NOT NULL,
    year integer NOT NULL,
    "shortDescription" text NOT NULL,
    "topSpeed" integer NOT NULL,
    "horsePower" integer NOT NULL,
    rate integer NOT NULL,
    mpg integer NOT NULL,
    category text NOT NULL,
    availability boolean DEFAULT true NOT NULL,
    video text
);


--
-- Name: cars_carId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cars_carId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cars_carId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cars_carId_seq" OWNED BY public.cars."carId";


--
-- Name: rentals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rentals (
    "rentalId" integer NOT NULL,
    "userId" integer NOT NULL,
    "carId" integer NOT NULL,
    total integer NOT NULL,
    "startDate" timestamp(6) with time zone NOT NULL,
    "endDate" timestamp(6) with time zone NOT NULL
);


--
-- Name: rentals_rentalId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."rentals_rentalId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: rentals_rentalId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."rentals_rentalId_seq" OWNED BY public.rentals."rentalId";


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    "userId" integer NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    photo text,
    verified boolean DEFAULT false NOT NULL
);


--
-- Name: users_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."users_userId_seq" OWNED BY public.users."userId";


--
-- Name: cars carId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cars ALTER COLUMN "carId" SET DEFAULT nextval('public."cars_carId_seq"'::regclass);


--
-- Name: rentals rentalId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rentals ALTER COLUMN "rentalId" SET DEFAULT nextval('public."rentals_rentalId_seq"'::regclass);


--
-- Name: users userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN "userId" SET DEFAULT nextval('public."users_userId_seq"'::regclass);


--
-- Data for Name: cars; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cars ("carId", make, image, year, "shortDescription", "topSpeed", "horsePower", rate, mpg, category, availability, video) FROM stdin;
1	Porsche 918	/images/porsche-918.jpg	2015	The 918 Spyder has been developed fully consistently and from the ground up as a performance hybrid with plug-in technology.	214	887	2000	22	Hypercar	t	http://www.youtube.com/embed/Wo_6X25DXAQ?start=20&end=50&autoplay=1&loop=1
2	Ferrari La Ferrari	/images/ferrari-la-ferrari.jpg	2016	Ferrari LaFerrari is a limited production hybrid sports car and is one of the highest performance road cars Ferrari has ever produced.	218	949	2800	13	Hypercar	t	http://www.youtube.com/embed/k28ANdynLgU?start=58&end=113&autoplay=1&loop=1
3	Pagani Huayra	/images/pagani-huayra.jpg	2017	The Huayra Roadster's power delivery is truly incredible and its best feature the open top. There are only 100 units in the world.	210	700	1500	16	Supercar	t	http://www.youtube.com/embed/3E6P1aQijv8?start=60&end=115&autoplay=1&loop=1
4	Bugatti Chiron	/images/bugatti-chiron.jpg	2018	The Bugatti Chiron is the fastest, most powerful, and exclusive production super sports car of Bugatti, a unique masterpiece of art.	261	1500	3500	11	Supercar	t	http://www.youtube.com/embed/uHke3z0Bb-8?start=14&end=47&autoplay=1&loop=1
5	Ford GT	/images/ford-gt.jpg	2019	The Ford GT is an American mid-engine supercar that is a true street-legal race car, with a light yet powerful design.	216	647	1250	11	Supercar	t	http://www.youtube.com/embed/qnIt8vYJoaY?start=90&end=132&autoplay=1&loop=1
6	Ferrari 328 GTS	/images/ferrari-328-gts.jpg	1989	The Ferrari 328 GTB considered by many to be one of the most reliable Ferraris ever built, 328s have always been the enthusiast’s favorite.	166	260	650	14	Supercar	t	http://www.youtube.com/embed/YUZnALGSiD0?start=37&end=84&autoplay=1&loop=1
7	Ford Mustang Shelby GT350	/images/ford-mustang-shelby-gt350.jpg	2019	As a track-ready version of the Ford Mustang, the 2019 Shelby GT350 has even more muscular styling and next-level performance.	180	710	500	16	Muscle	t	http://www.youtube.com/embed/wdAHyK7n3oA?start=20&end=68&autoplay=1&loop=1
8	Lamborghini Gallardo	/images/lamborghini-gallardo.jpg	2009	The Lamborghini Gallardo’s sharply creased styling and V-10 prove irresistible to drivers who want to be both seen and heard.	202	560	800	15	Supercar	t	http://www.youtube.com/embed/Qr9KWMhJYac?start=97&end=122&autoplay=1&loop=1
9	Lamborghini Aventador	/images/lamborghini-aventador.jpg	2019	Powered by a screaming non-turbo V12 and clad in bombastic body panels, the Aventador is firmly positioned in the supercar stratosphere	217	729	1500	11	Supercar	t	https://www.youtube.com/embed/tcoACBAGhW8?start=70&end=102
10	Lamborghini Urus	/images/lamborghini-urus.jpg	2019	Lamborghini Urus has a cutting-edge, distinct and streamlined design with multiple souls: sporty, elegant and off-road.	190	641	900	15	Supercar	t	https://www.youtube.com/embed/ArZU0o1dlDk?start=39&end=66
11	McLaren 720S	/images/mclaren-720s.jpg	2018	The 720S embodies our relentless quest to push the limits of possibility. Lighter, stronger, faster. It’s all of these and more.	212	710	1250	26	Supercar	t	https://www.youtube.com/embed/PasQcALPgE0?start=37&end=64
12	Koenigsegg Agera	/images/koenigsegg-agera.jpg	2010	The Agera features the now famous ‘ghost’ lighting system and it was named Hypercar of the Year in 2010 by Top Gear magazine.	245	960	1650	13	Supercar	t	https://www.youtube.com/embed/E6aHQD1UqoQ?start=69&end=119
13	Dodge Charger	/images/dodge-charge.jpg	2020	The Charger channels its NASCAR roots and is the only vehicle in its segment with rear-wheel drive and two throaty V-8 engines	196	707	400	23	Muscle	t	https://www.youtube.com/embed/ArZU0o1dlDk?start=39&end=66
14	Chevrolet Corvette ZR1	/images/chevrolet-corvette-zr1.jpg	2019	It’s a supercar delivering the icon’s fastest, most powerful, most advanced performance in a production Corvette to date.	212	755	500	15	Muscle	t	https://www.youtube.com/embed/rJtyqwkfRnc?start=0&end=22
15	Mclaren P1	/images/mclaren-p1.jpg	2019	The P1 is a superhero among supercars: supermodel shapely, heroically powerful, designed and engineered to  be the best driver's car.	217	903	2750	17	Hypercar	t	https://www.youtube.com/embed/t0zaJ6K1zmk
16	Aston Martin Vulcan	/images/aston-martin-vulcan.jpg	2019	Aston Martin's Vulcan, high-performance lightweight track-only car and built 24 of them was a nod to Aston's history with 24-hour endurance races.	225	800	3500	18	Supercar	t	https://www.youtube.com/embed/ahMzhw9pqFg
\.


--
-- Data for Name: rentals; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.rentals ("rentalId", "userId", "carId", total, "startDate", "endDate") FROM stdin;
4	13	4	2500	2020-01-30 00:00:00-08	2020-01-31 00:00:00-08
5	13	3	1500	2020-01-31 00:00:00-08	2020-02-01 00:00:00-08
6	13	2	2000	2020-01-30 00:00:00-08	2020-01-31 00:00:00-08
7	13	2	2000	2020-01-30 00:00:00-08	2020-01-31 00:00:00-08
8	13	6	650	2020-02-01 00:00:00-08	2020-02-02 00:00:00-08
9	16	4	2500	2020-01-30 00:00:00-08	2020-01-31 00:00:00-08
10	16	7	500	2020-01-31 00:00:00-08	2020-02-01 00:00:00-08
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users ("userId", "firstName", "lastName", email, password, photo, verified) FROM stdin;
14	Kamryn	Min	kamrynmin@gmail.com	$2b$10$CEADljyNemEFj.QFGyZ0xOVQO9zo7hn44RLVKMZbj84eZtw//b2JG	\N	f
15	Andrew	Robins	h.andrew.robins@gmail.com	$2b$10$gLx2iqKEDhMiCvBLFQoVregayHM0lJ90eVEbeQ1nVTyWpZ1TmydBa	\N	f
13	Ethan	Cordes	ethancordes7@gmail.com	$2b$10$qmrvjGSas7gFURkHQvLzROJ6L9bLcCnvoR9YCL3msuD11Od.7cF2W	\N	t
16	Timothy	Lee	timothylee3508@gmail.com	$2b$10$ByARktkawlVXh3.DyfySL.b0aaQykQDZinZ4C4./1GUIvuBSWwBbK	\N	f
\.


--
-- Name: cars_carId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cars_carId_seq"', 8, true);


--
-- Name: rentals_rentalId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."rentals_rentalId_seq"', 10, true);


--
-- Name: users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."users_userId_seq"', 16, true);


--
-- Name: cars cars_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_pkey PRIMARY KEY ("carId");


--
-- Name: rentals rentals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rentals
    ADD CONSTRAINT rentals_pkey PRIMARY KEY ("rentalId");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("userId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--
