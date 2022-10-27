use gym_notebook;
DROP TABLE IF EXISTS weekly_schedule CASCADE;

CREATE TABLE weekly_schedule (
   week_title varchar(30) NOT NULL,
   week_id INT NOT NULL,
   day_id DATETIME NOT NULL,
   created_by varchar(30) NOT NULL
   
,  PRIMARY KEY (week_id, day_id)
);

CREATE INDEX weekly_schedule_weed_id USING BTREE on weekly_schedule (week_id, day_id);
