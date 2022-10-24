use gym_notebook;
DROP TABLE IF EXISTS friends CASCADE;

CREATE TABLE friends (
   username varchar(30) NOT NULL,
   user_id INT NOT NULL,
   date_added DATETIME NOT NULL
   
,  PRIMARY KEY (user_id, username)
);

CREATE INDEX friends_user_id USING BTREE on friends (user_id, username);

LOCK TABLES friends WRITE;

INSERT INTO friends VALUES 	('TheNewGuy', 100001, '2005-6-14'), ('IronMikeTyson', 100001, '2013-7-21'),
							('murraych', 100002, '2005-6-14'), ('IronMikeTyson', 100002, '2007-9-9'),
                            ('TheNewGuy', 100003, '2007-9-9'), ('murraych', 100003, '2013-7-21');

UNLOCK TABLES;
