\echo 'Delete and recreate climbing_meetup_timezone_test db'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE climbing_meetup_timezone_test;
CREATE DATABASE climbing_meetup_timezone_test;
\connect climbing_meetup_timezone_test;

\i climbing-meetup-schema.sql
\i climbing-meetup-seed.sql
