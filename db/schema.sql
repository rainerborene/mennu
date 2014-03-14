--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: addresses; Type: TABLE; Schema: public; Owner: rainerborene; Tablespace: 
--

CREATE TABLE addresses (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    street citext NOT NULL,
    street_number citext NOT NULL,
    neighborhood citext NOT NULL,
    city citext NOT NULL,
    state citext NOT NULL,
    postal_code citext NOT NULL,
    geolocation geometry(Point) NOT NULL,
    phone citext NOT NULL,
    place_id uuid,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.addresses OWNER TO rainerborene;

--
-- Name: business_hours; Type: TABLE; Schema: public; Owner: rainerborene; Tablespace: 
--

CREATE TABLE business_hours (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    weekday integer NOT NULL,
    start_time time without time zone NOT NULL,
    end_time interval NOT NULL,
    place_id uuid,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.business_hours OWNER TO rainerborene;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: rainerborene; Tablespace: 
--

CREATE TABLE categories (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    name citext NOT NULL,
    slug citext NOT NULL,
    place_id uuid
);


ALTER TABLE public.categories OWNER TO rainerborene;

--
-- Name: items; Type: TABLE; Schema: public; Owner: rainerborene; Tablespace: 
--

CREATE TABLE items (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    name citext NOT NULL,
    description citext,
    show_price boolean DEFAULT true,
    price double precision,
    code integer,
    "position" integer,
    self_service boolean DEFAULT false,
    category_id uuid,
    place_id uuid,
    published_at timestamp without time zone,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.items OWNER TO rainerborene;

--
-- Name: photos; Type: TABLE; Schema: public; Owner: rainerborene; Tablespace: 
--

CREATE TABLE photos (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    description citext,
    image citext NOT NULL,
    width integer NOT NULL,
    height integer NOT NULL,
    content_type citext NOT NULL,
    attachable_id uuid NOT NULL,
    attachable_type citext NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.photos OWNER TO rainerborene;

--
-- Name: places; Type: TABLE; Schema: public; Owner: rainerborene; Tablespace: 
--

CREATE TABLE places (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    name citext NOT NULL,
    slug citext NOT NULL,
    email citext NOT NULL,
    password_digest citext NOT NULL,
    description citext NOT NULL,
    logo citext,
    website citext,
    establishment_types citext[],
    opened_to_public boolean DEFAULT true,
    expire_at timestamp without time zone,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    last_publication timestamp without time zone
);


ALTER TABLE public.places OWNER TO rainerborene;

--
-- Name: schema_info; Type: TABLE; Schema: public; Owner: rainerborene; Tablespace: 
--

CREATE TABLE schema_info (
    version integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.schema_info OWNER TO rainerborene;

--
-- Name: users; Type: TABLE; Schema: public; Owner: rainerborene; Tablespace: 
--

CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    uid citext NOT NULL,
    name citext,
    email citext NOT NULL,
    slug citext,
    secret citext,
    token citext,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.users OWNER TO rainerborene;

--
-- Name: addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: rainerborene; Tablespace: 
--

ALTER TABLE ONLY addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (id);


--
-- Name: business_hours_pkey; Type: CONSTRAINT; Schema: public; Owner: rainerborene; Tablespace: 
--

ALTER TABLE ONLY business_hours
    ADD CONSTRAINT business_hours_pkey PRIMARY KEY (id);


--
-- Name: categories_pkey; Type: CONSTRAINT; Schema: public; Owner: rainerborene; Tablespace: 
--

ALTER TABLE ONLY categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: items_pkey; Type: CONSTRAINT; Schema: public; Owner: rainerborene; Tablespace: 
--

ALTER TABLE ONLY items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- Name: photos_pkey; Type: CONSTRAINT; Schema: public; Owner: rainerborene; Tablespace: 
--

ALTER TABLE ONLY photos
    ADD CONSTRAINT photos_pkey PRIMARY KEY (id);


--
-- Name: places_pkey; Type: CONSTRAINT; Schema: public; Owner: rainerborene; Tablespace: 
--

ALTER TABLE ONLY places
    ADD CONSTRAINT places_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: rainerborene; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: addresses_place_id_index; Type: INDEX; Schema: public; Owner: rainerborene; Tablespace: 
--

CREATE INDEX addresses_place_id_index ON addresses USING btree (place_id);


--
-- Name: business_hours_place_id_index; Type: INDEX; Schema: public; Owner: rainerborene; Tablespace: 
--

CREATE INDEX business_hours_place_id_index ON business_hours USING btree (place_id);


--
-- Name: categories_place_id_index; Type: INDEX; Schema: public; Owner: rainerborene; Tablespace: 
--

CREATE INDEX categories_place_id_index ON categories USING btree (place_id);


--
-- Name: items_category_id_index; Type: INDEX; Schema: public; Owner: rainerborene; Tablespace: 
--

CREATE INDEX items_category_id_index ON items USING btree (category_id);


--
-- Name: items_place_id_index; Type: INDEX; Schema: public; Owner: rainerborene; Tablespace: 
--

CREATE INDEX items_place_id_index ON items USING btree (place_id);


--
-- Name: photos_attachable_id_attachable_type_index; Type: INDEX; Schema: public; Owner: rainerborene; Tablespace: 
--

CREATE INDEX photos_attachable_id_attachable_type_index ON photos USING btree (attachable_id, attachable_type);


--
-- Name: places_email_index; Type: INDEX; Schema: public; Owner: rainerborene; Tablespace: 
--

CREATE UNIQUE INDEX places_email_index ON places USING btree (email);


--
-- Name: places_slug_index; Type: INDEX; Schema: public; Owner: rainerborene; Tablespace: 
--

CREATE UNIQUE INDEX places_slug_index ON places USING btree (slug);


--
-- Name: users_slug_index; Type: INDEX; Schema: public; Owner: rainerborene; Tablespace: 
--

CREATE UNIQUE INDEX users_slug_index ON users USING btree (slug);


--
-- Name: users_uid_index; Type: INDEX; Schema: public; Owner: rainerborene; Tablespace: 
--

CREATE UNIQUE INDEX users_uid_index ON users USING btree (uid);


--
-- Name: addresses_place_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rainerborene
--

ALTER TABLE ONLY addresses
    ADD CONSTRAINT addresses_place_id_fkey FOREIGN KEY (place_id) REFERENCES places(id);


--
-- Name: business_hours_place_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rainerborene
--

ALTER TABLE ONLY business_hours
    ADD CONSTRAINT business_hours_place_id_fkey FOREIGN KEY (place_id) REFERENCES places(id);


--
-- Name: categories_place_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rainerborene
--

ALTER TABLE ONLY categories
    ADD CONSTRAINT categories_place_id_fkey FOREIGN KEY (place_id) REFERENCES places(id);


--
-- Name: items_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rainerborene
--

ALTER TABLE ONLY items
    ADD CONSTRAINT items_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id);


--
-- Name: items_place_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rainerborene
--

ALTER TABLE ONLY items
    ADD CONSTRAINT items_place_id_fkey FOREIGN KEY (place_id) REFERENCES places(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: rainerborene
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM rainerborene;
GRANT ALL ON SCHEMA public TO rainerborene;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

