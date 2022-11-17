# Notes

* DailyRoutine id could potentially be removed

* SQL Inserts moved to individual files

* use the name "gymappdb" as your database name

* To add upvotes to DB use(this requires safemode to be off): UPDATE WeeklySchedule SET upvotes = FLOOR(1 + RAND( ) * 100) WHERE accessStatus = 'public';


* TODO:

* follower table might need to reference to the user table so it can update/delete cascade when a user account is deleted
