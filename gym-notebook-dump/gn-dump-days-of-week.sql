use gym_notebook;
DROP TABLE IF EXISTS days_of_week CASCADE;

CREATE TABLE days_of_week (
   day_id INT NOT NULL UNIQUE,
   day_name varchar(15) NOT NULL UNIQUE
   
,  PRIMARY KEY (day_id)
);

CREATE INDEX days_of_week_day_id USING BTREE on days_of_week (day_id);

LOCK TABLES days_of_week WRITE;

INSERT INTO days_of_week VALUES 	(1,'Monday'), (2,'Tuesday'), (3,'Wednesday'), (4,'Thursday'), (5,'Friday'), (6,'Saturday'), (7,'Sunday');

UNLOCK TABLES;
