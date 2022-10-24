use gym_notebook;
DROP TABLE IF EXISTS days_of_week CASCADE;

CREATE TABLE days_of_week (
   day_name varchar(15) UNIQUE NOT NULL,
   day_id INT NOT NULL UNIQUE
   
,  PRIMARY KEY (day_id)
);

CREATE INDEX days_of_week_day_id USING BTREE on days_of_week (day_id);

