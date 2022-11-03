using GymAppDB;

DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS DailyRoutine;
DROP TABLE IF EXISTS WeeklySchedule;
DROP TABLE IF EXISTS Exercise;
DROP TABLE IF EXISTS Friend;


CREATE TABLE User
(
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(15) NOT NULL UNIQUE,
  password VARCHAR(32) CONSTRAINT Chk_Pass CHECK (LEN(password) >= 4) NOT NULL,
  firstName VARCHAR(20),
  lastName VARCHAR(20),
  DoB DATE,
  imagePath VARCHAR(100)
);

CREATE TABLE DailyRoutine
(
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  exerciseID CHAR(4),
  FOREIGN KEY(exerciseID) REFERENCES Exercise(id),
  user INT NOT NULL UNIQUE,
  sets INT,
  reps INT,
  weight INT,
  dayOfWeek ENUM('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT') NOT NULL,
  weeklyScheduleID BIGINT NOT NULL,
  FOREIGN KEY (weeklyScheduleID) REFERENCES WeeklySchedule(id)
          ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (user) REFERENCES User(id)
          ON UPDATE CASCADE ON DELETE CASCADE,
);

CREATE TABLE WeeklySchedule
(
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  mode ENUM('private', 'friends', 'public') NOT NULL,
  title LONGTEXT,
  stamp TIMESTAMP,
  upvotes INT,
  user INT NOT NULL UNIQUE,
  FOREIGN KEY (user) REFERENCES User(id)
          ON UPDATE CASCADE ON DELETE CASCADE,
);

CREATE TABLE Exercise
(
  id CHAR(4) PRIMARY KEY,
  name VARCHAR(100),
  bodyPart VARCHAR(100),
  targetMuscle VARCHAR(100),
  gifUrl VARCHAR(256),
  equipment VARCHAR(100)
);


CREATE TABLE Friend
(
  ID1 INT NOT NULL REFERENCES User(id),
  ID2 INT NOT NULL REFERENCES User(id),
  CONSTRAINT OneWayRelationship CHECK (ID1 < ID2),
  CONSTRAINT ID1_ID2 PRIMARY KEY (ID1, ID2),
  CONSTRAINT ID2_ID1 UNIQUE (ID2, ID1)
);


INSERT INTO User (username, password, firstName, lastName, DoB) VALUES ('arnolds17', 'arnold47!', 'Arnold', 'S', TO_DATE('30/07/1947'));

INSERT INTO User (username, password, firstName, lastName, DoB) VALUES ('cfranco41', 'franco41!c', 'Franco', 'Columbu', TO_DATE('07/08/1941'));

INSERT INTO Friend (ID1, ID2) VALUES (1, 2);

INSERT INTO Exercise (id, name, bodyPart, targetMuscle, gifUrl, equipment) VALUES ('0001', '3/4 sit-up', 'waist', 'abs', 'http://d205bpvrqc9yn1.cloudfront.net/0001.gif', 'body weight');
INSERT INTO Exercise (id, name, bodyPart, targetMuscle, gifUrl, equipment) VALUES ('0002', '45° side bend', 'waist', 'abs', 'http://d205bpvrqc9yn1.cloudfront.net/0002.gif', 'body weight');
INSERT INTO Exercise (id, name, bodyPart, targetMuscle, gifUrl, equipment) VALUES ('0001', 'air bike', 'waist', 'abs', 'http://d205bpvrqc9yn1.cloudfront.net/0003.gif', 'body weight');

INSERT INTO WeeklySchedule (mode, title, stamp, upvotes, user) VALUES ('public', 'Path to Mr. Olympia', CURRENT_TIMESTAMP(), 0, 1);


INSERT INTO DailyRoutine (exerciseID, user, sets, reps, dayOfWeek, weeklyScheduleID) VALUES ('0001', 1, 3, 35, 'MON');
