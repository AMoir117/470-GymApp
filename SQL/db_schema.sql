DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Exercise;
DROP TABLE IF EXISTS Friend;
DROP TABLE IF EXISTS Posts;
DROP TABLE IF EXISTS DailyRoutine;



CREATE TABLE User
(
  id INT PRIMARY KEY,
  username VARCHAR(15) NOT NULL UNIQUE,
  firstName VARCHAR(20),
  lastName VARCHAR(20),
  DoB DATE,
  imagePath VARCHAR(100)
);


CREATE TABLE Post
(
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  mode ENUM('private', 'friends', 'public') NOT NULL,
  title LONGTEXT,
  stamp TIMESTAMP,
  upvotes INT,
  user INT NOT NULL,
  exerciseID CHAR(4) NOT NULL,
  FOREIGN KEY (exerciseID) REFERENCES Excercise(id),
          ON UPDATE CASCADE
          ON DELETE CASCADE,

  FOREIGN KEY (user) REFERENCES User(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE,
)


CREATE TABLE DailyRoutine
(
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  exerciseID CHAR(4),
  user INT NOT NULL,
  sets INT,
  reps INT,
  weight INT,
  dayOfWeek ENUM('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT') NOT NULL,
  FOREIGN KEY(exerciseID) REFERENCES Exercise(id)
  FOREIGN KEY (user) REFERENCES User(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE,
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
)
