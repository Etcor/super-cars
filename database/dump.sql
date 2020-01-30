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
1	Porsche 918	/images/porsche-918.jpg	2015	The Porsche 918 Spyder is a mid-engine plug-in hybrid sports car manufactured by German automobile manufacturer Porsche.	214	887	2000	22	Hypercar	f	http://www.youtube.com/embed/Wo_6X25DXAQ?start=20&end=50&autoplay=1&loop=1
2	Ferrari La Ferrari	/images/ferrari-la-ferrari.jpg	2016	LaFerrari, project name F150 (also unofficially referred to as the Ferrari LaFerrari or Ferrari F150), is a limited production hybrid sports car built by Italian automotive manufacturer Ferrari.	218	949	2000	13	Hypercar	f	http://www.youtube.com/embed/k28ANdynLgU?start=58&end=113&autoplay=1&loop=1
3	Pagani Huayra	/images/pagani-huayra.jpg	2017	The Pagani Huayra, it’s the successor to the almighty Pagani Zonda and it’s named after a South American wind god called Huayra Tata. 	210	700	1500	16	Supercar	f	http://www.youtube.com/embed/3E6P1aQijv8?start=60&end=115&autoplay=1&loop=1
4	Bugatti Chiron	/images/bugatti-chiron.jpg	2018	The Bugatti Chiron is a mid-engine two-seater sports car developed and manufactured in Molsheim, France by French automobile manufacturer Bugatti Automobiles S.A.S..	261	1500	2500	10	Supercar	f	http://www.youtube.com/embed/uHke3z0Bb-8?start=14&end=47&autoplay=1&loop=1
5	Ford GT	/images/ford-gt.jpg	2019	The teardrop shape of the Ford GT is the result of extensive work in the wind tunnel. Its carbon-fiber body and its 647-horsepower 3.5L EcoBoost® V6 engine are the ultimate expressions of technological innovation.	216	647	1250	10	Supercar	f	http://www.youtube.com/embed/qnIt8vYJoaY?start=90&end=132&autoplay=1&loop=1
6	Ferrari 328 GTS	/images/ferrari-328-gts.jpg	1989	The Ferrari 328 GTB and GTS (Type F106) are mid-engine V8, two seat sports cars produced by Italian automotive manufacturer Ferrari.	166	260	650	14	Supercar	f	http://www.youtube.com/embed/YUZnALGSiD0?start=37&end=84&autoplay=1&loop=1
7	Ford Mustang Shelby GT350	/images/ford-mustang-shelby-gt350.jpg	2019	As a track-ready version of the Ford Mustang, the 2019 Shelby GT350 has even more muscular styling and next-level performance.	180	710	500	16	Muscle	f	http://www.youtube.com/embed/wdAHyK7n3oA?start=20&end=68&autoplay=1&loop=1
8	Lamborghini Gallardo	/images/lamborghini-gallardo.jpg	2009	The Lamborghini Gallardo is a sports car built by the Italian automotive manufacturer Lamborghini from 2003 to 2013.	202	560	800	15	Supercar	f	http://www.youtube.com/embed/Qr9KWMhJYac?start=97&end=122&autoplay=1&loop=1
\.


--
-- Data for Name: rentals; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.rentals ("rentalId", "userId", "carId", total, "startDate", "endDate") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users ("userId", "firstName", "lastName", email, password, photo, verified) FROM stdin;
13	Ethan	Cordes	ethancordes7@gmail.com	$2b$10$qmrvjGSas7gFURkHQvLzROJ6L9bLcCnvoR9YCL3msuD11Od.7cF2W	\N	f
14	Kamryn	Min	kamrynmin@gmail.com	$2b$10$CEADljyNemEFj.QFGyZ0xOVQO9zo7hn44RLVKMZbj84eZtw//b2JG	\N	f
15	Andrew	Robins	h.andrew.robins@gmail.com	$2b$10$gLx2iqKEDhMiCvBLFQoVregayHM0lJ90eVEbeQ1nVTyWpZ1TmydBa	\N	f
16	Timothy	Lee	timothylee3508@gmail.com	$2b$10$ByARktkawlVXh3.DyfySL.b0aaQykQDZinZ4C4./1GUIvuBSWwBbK	\N	f
\.


--
-- Name: cars_carId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cars_carId_seq"', 8, true);


--
-- Name: rentals_rentalId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."rentals_rentalId_seq"', 3, true);


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

