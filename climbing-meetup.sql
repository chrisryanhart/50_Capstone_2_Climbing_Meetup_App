\echo 'Delete and recreate climbing_metup db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE climbing_meetup;
CREATE DATABASE climbing_meetup;
\connect climbing_meetup

\i climbing-meetup-schema.sql
\i climbing-meetup-seed.sql

