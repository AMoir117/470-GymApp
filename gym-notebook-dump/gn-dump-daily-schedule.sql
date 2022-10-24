use gym_notebook;
DROP TABLE IF EXISTS daily_schedule CASCADE;

CREATE TABLE daily_schedule (
   day_id INT NOT NULL,
   week_id INT NOT NULL,
   exercise_id INT NOT NULL
   
,  PRIMARY KEY (week_id, day_id, exercise_id)
);

CREATE INDEX daily_schedule_ids USING BTREE on daily_schedule (week_id, day_id, exercise_id);

LOCK TABLES daily_schedule WRITE;

INSERT INTO daily_schedule VALUES 	(1, 001, 0042), (2, 001, 1146), (3, 001, 0476), (4, 001, 0034), (5, 001, 0873), (6, 001, 1208), (7, 001, 0220);

UNLOCK TABLES;