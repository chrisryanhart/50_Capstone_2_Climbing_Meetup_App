CREATE TABLE states (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    state_id INTEGER NOT NULL
        REFERENCES states,
    type TEXT NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    profile_image TEXT,
    user_age INTEGER,
    user_gender TEXT,
    is_parent BOOLEAN,
    has_dogs BOOLEAN,
    bio TEXT,
    location_id INTEGER NOT NULL    
        REFERENCES locations ON DELETE SET NULL,
    preferences JSON
);

CREATE TABLE meetups (
    id SERIAL PRIMARY KEY,
    creator_user_id INTEGER NOT NULL
        REFERENCES users ON DELETE CASCADE,
    date DATE NOT NULL,
    time TIME NOT NULL,
    duration INTEGER NOT NULL,
    location_id INT NOT NULL
        REFERENCES locations ON DELETE SET NULL,
    description TEXT
);

CREATE TABLE meetups_attendees (
    meetup_id INTEGER
        REFERENCES meetups ON DELETE CASCADE,
    attendee_user_id INTEGER
        REFERENCES users ON DELETE CASCADE,
    PRIMARY KEY (meetup_id, attendee_user_id)
);