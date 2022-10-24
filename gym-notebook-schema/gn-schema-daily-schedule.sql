use gym_notebook;
DROP TABLE IF EXISTS daily_schedule CASCADE;

CREATE TABLE daily_schedule (
   day_id INT NOT NULL,
   week_id INT NOT NULL,
   exercise_id INT NOT NULL
   
,  PRIMARY KEY (week_id, day_id, exercise_id)
);

CREATE INDEX daily_schedule_ids USING BTREE on daily_schedule (week_id, day_id, exercise_id);

