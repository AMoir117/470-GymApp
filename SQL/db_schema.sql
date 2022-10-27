DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Exercise;
DROP TABLE IF EXISTS FriendsList;
DROP TABLE IF EXISTS WeeklySchedule;
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


CREATE TABLE Posts
(
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  mode ENUM('private', 'friends', 'public') NOT NULL,
  title LONGTEXT,
  stamp TIMESTAMP,
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

CREATE TABLE FriendsList
(
  id INT,
  FOREIGN KEY (id) REFERENCES User(id),
  friendIDs VARCHAR(MAXINT)
);
