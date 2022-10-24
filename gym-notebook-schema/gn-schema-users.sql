use gym_notebook;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
   username varchar(100) UNIQUE NOT NULL,
   user_id INT NOT NULL AUTO_INCREMENT,
   password varchar(32) NOT NULL,
   first_name varchar(30) NOT NULL,
   last_name varchar(30) NOT NULL,
   date_created DATE DEFAULT CURRENT_TIMESTAMP,
   date_of_birth DATE,
   bio varchar(300) DEFAULT NULL,
   profile_image varchar(50) DEFAULT NULL
   
,  PRIMARY KEY (user_id)
) AUTO_INCREMENT=100000;

CREATE INDEX users_user_id USING BTREE on users(user_id);

