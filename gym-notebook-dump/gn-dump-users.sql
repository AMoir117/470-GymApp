use gym_notebook;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
   username varchar(100) UNIQUE NOT NULL,
   user_id INT NOT NULL AUTO_INCREMENT,
   `password` varchar(32) NOT NULL,
   email varchar(40) UNIQUE NOT NULL,
   first_name varchar(30) NOT NULL,
   last_name varchar(30) NOT NULL,
   date_created DATE DEFAULT (CURRENT_DATE),
   date_of_birth DATE,
   bio varchar(300) DEFAULT NULL,
   profile_image varchar(50) DEFAULT NULL
   
,  PRIMARY KEY (user_id)
) AUTO_INCREMENT=100000;

CREATE INDEX users_user_id USING BTREE on users(user_id);

LOCK TABLES users WRITE;

INSERT INTO users VALUES 	('murraych',default, 'password', 'murraych@sonoma.edu','christopher', 'murray', default,'1994-08-11','This is my bio.', default), 
							('TheNewGuy',default, '0125345', 'TNG@yahoo.com','edward', 'snowden', default,'1985-11-26','The whistleblower.', default),
                            ('IronMikeTyson',default, 'IronMike', 'Iron_Mike_Tyson@gmail.com','mike', 'tyson', default,'1968-1-2','The greatest in the world.', default);

UNLOCK TABLES;
