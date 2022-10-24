DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Exercise;
DROP TABLE IF EXISTS FriendsList;
DROP TABLE IF EXISTS WeeklySchedule;

CREATE TABLE User
(
  id INT PRIMARY KEY,
  username VARCHAR(15) NOT NULL UNIQUE,
  firstName VARCHAR(20),
  lastName VARCHAR(20),
  DoB DATE,
);


CREATE TABLE WeeklySchedule
(
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  mode ENUM('private', 'friends', 'public') NOT NULL,

  mondayRoutineID INT,
  FOREIGN KEY (mondayRoutineID) REFERENCES DailyRoutine(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE,

  tuesdayRoutineID INT,
  FOREIGN KEY (tuesdayRoutineID) REFERENCES DailyRoutine(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE,

  wednesdayRoutineID INT,
  FOREIGN KEY (wednesdayRoutineID) REFERENCES DailyRoutine(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE,

  thursdayRoutineID INT,
  FOREIGN KEY (thursdayRoutineID) REFERENCES DailyRoutine(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE,

  fridayRoutineID INT,
  FOREIGN KEY (fridayRoutineID) REFERENCES DailyRoutine(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE,
);


CREATE TABLE DailyRoutine
(
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  exerciseID CHAR(4),
  FOREIGN KEY (exerciseID) REFERENCES Exercise(id)
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


CREATE TABLE FriendsList
(
  id INT,
  PRIMARY KEY (id) REFERENCES User(id),
  friendIDs VARCHAR(MAXINT)
);
