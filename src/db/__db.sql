--To connect locally to postgres--
--psql -U postgres;

--To connect to external postgres db--
--psql -h hostname -d databasename -U username;


-- CREATE DATABASE cumin; --Create a new table/database named cumin

-- \c cumin; --Change the location to the newly created cumin database

CREATE TABLE app_user
(
    id SERIAL PRIMARY KEY,
    login_id VARCHAR(255)  NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    verification INT NOT NULL,
    verified BOOL NOT NULL,

    photo_id VARCHAR(255),
    major VARCHAR(255),
    school VARCHAR(255),
    contact_info VARCHAR(255)
);

CREATE TABLE app_request
(
    id SERIAL PRIMARY KEY,
    login_id_FROM VARCHAR(255)  NOT NULL,
    login_id_TO VARCHAR(255) NOT NULL
);

CREATE TABLE app_match
(
    id SERIAL PRIMARY KEY,
    user1 VARCHAR(255) NOT NULL,
    user2 VARCHAR(255) NOT NULL
);

