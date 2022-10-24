use gym_notebook;
DROP TABLE IF EXISTS friends CASCADE;

CREATE TABLE friends (
   username varchar(30) DEFAULT NULL,
   user_id INT DEFAULT NULL,
   date_added DATETIME DEFAULT NULL
   
,  PRIMARY KEY (user_id)
);

CREATE INDEX friends_user_id USING BTREE on friends (user_id);

