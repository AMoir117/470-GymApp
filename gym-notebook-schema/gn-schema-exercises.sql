use gym_notebook;
DROP TABLE IF EXISTS exercises CASCADE;

CREATE TABLE exercises (
   name varchar(100) UNIQUE NOT NULL,
   exercise_id INT UNIQUE NOT NULL,
   body_part varchar(30) NOT NULL ,
   target_muscle varchar(30) NOT NULL ,
   gif_url varchar(50) UNIQUE NOT NULL,
   equipment varchar(30) NOT NULL
   
,  PRIMARY KEY (exercise_id)
);

CREATE INDEX exercise_exercise_id USING BTREE on exercises (exercise_id);

