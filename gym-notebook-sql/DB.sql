use gymappdb;

DROP TABLE IF EXISTS Follower;
DROP TABLE IF EXISTS DailyRoutine;
DROP TABLE IF EXISTS WeeklySchedule;
DROP TABLE IF EXISTS Exercise;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users
(
  id INT AUTO_INCREMENT PRIMARY KEY,
  uid VARCHAR(30),
  username VARCHAR(15) NOT NULL UNIQUE,
  userPassword VARCHAR(32),
  firstName VARCHAR(20),
  lastName VARCHAR(20),
  DoB DATE,
  imagePath VARCHAR(200),
  email VARCHAR(100) UNIQUE,
  profileBio VARCHAR(512),
  currentWeeklyScheduleID BIGINT,
  CHECK (length(userPassword) >= 4)
);

CREATE TABLE Exercise
(
  id CHAR(4) PRIMARY KEY UNIQUE,
  workoutName VARCHAR(100),
  bodyPart VARCHAR(100),
  targetMuscle VARCHAR(100),
  gifUrl VARCHAR(256),
  equipment VARCHAR(100)
);

CREATE TABLE WeeklySchedule
(
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  accessStatus ENUM('private', 'public') NOT NULL,
  title LONGTEXT,
  created DATE,
  upvotes INT,
  userID INT NOT NULL,
  FOREIGN KEY (userID) REFERENCES Users(id)
          ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE DailyRoutine
(
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  exerciseID CHAR(4),
  FOREIGN KEY(exerciseID) REFERENCES Exercise(id),
  sets INT,
  reps INT,
  weight varchar(7),
  dayOfWeek ENUM('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday') NOT NULL,
  weeklyScheduleID BIGINT NOT NULL,
  FOREIGN KEY (weeklyScheduleID) REFERENCES WeeklySchedule(id)
          ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Follower
(
  followedUserID INT NOT NULL,
  followerUserID INT NOT NULL,
  CONSTRAINT EqIds CHECK (followedUserID != followerUserID),
  PRIMARY KEY (followedUserID, followerUserID)
);
