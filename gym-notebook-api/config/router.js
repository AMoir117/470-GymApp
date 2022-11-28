const Authorize = require("../app/Middleware/Authorize.js");
const VerifyJWT = require("../app/Middleware/VerifyJWT.js");

/*
|--------------------------------------------------------------------------
| Default router
|--------------------------------------------------------------------------
|
| Default router is used to define any routes that don't belong to a
| controller. Also used as a parent container for the other routers.
|
*/
const router = require("koa-router")({
	prefix: "/api/v1",
});

// Login router configuration.
// const LoginController = require("../app/Controllers/LoginController.js");
// const loginRouter = require("koa-router")({
// 	prefix: "/login",
// });
// loginRouter.get("/:user_id", LoginController.authorizeUser, (err) =>
// 	console.log("exercisesRoutes.js: login-route error:", err)
// );

// Exercises router configuration.
const ExercisesController = require("../app/Controllers/ExerciseController.js");
const exercisesRouter = require("koa-router")({
	prefix: "/exercises",
});
exercisesRouter.get("/all-exercises", ExercisesController.allExercises, (err) => console.log(`allExercises ran into an error: ${err}`));
exercisesRouter.get("/name/:workoutName", ExercisesController.exerciseByName, (err) => console.log(`exerciseByName ran into an error: ${err}`));
exercisesRouter.get("/id/:id", ExercisesController.exerciseByID, (err) => console.log(`exerciseByID ran into an error: ${err}`));
exercisesRouter.get("/bodypart/:bodyPart", ExercisesController.exerciseByBodyPart, (err) =>
	console.log(`exerciseByBodyPart ran into an error: ${err}`)
);
exercisesRouter.get("/muscle/:targetMuscle", ExercisesController.exerciseByMuscle, (err) =>
	console.log(`exerciseByMuscle ran into an error: ${err}`)
);
exercisesRouter.get("/equipment/:equipment", ExercisesController.exerciseByEquipment, (err) =>
	console.log(`exerciseByEquipment ran into an error: ${err}`)
);

// Users router configuration.
const UsersController = require("../app/Controllers/UsersController.js");
const usersRouter = require("koa-router")({
	prefix: "/users",
});
usersRouter.get("/all-users", UsersController.allUsers, (err) => console.log(`allUsers ran into an error: ${err}`));
usersRouter.get("/uid/:uid", UsersController.userByUid, (err) => console.log(`userByName ran into an error: ${err}`));
usersRouter.get("/id/:id", UsersController.userByID, (err) => console.log(`userByID ran into an error: ${err}`));


// get followers of ID (NOTE: this should really be called get-followed-users)
usersRouter.get("/get-followers/:followerUserID", UsersController.getUsersFollowers, (err) =>
	console.log(`getUsersFollowers ran into an error: ${err}`)
);

usersRouter.post("/insert-user", UsersController.insertNewUser, (err) => console.log(`insertUser ran into an error: ${err}`));

usersRouter.put("/use-weekly-schedule/:currentWeeklyScheduleID/:userID", UsersController.useWeeklySchedule, (err) =>
	console.log(`increment-upvotes ran into an error: ${err}`)
);

usersRouter.put("/edit-profile/:username/:firstName/:lastName/:email/:profileBio/:id", UsersController.editUserProfile, (err) =>
	console.log(`editUser ran into an error: ${err}`)
);

usersRouter.put("/change-picture/:imagePath/:id", UsersController.changePicture, (err) => console.log(`change-picture ran into an error: ${err}`));

// WeeklySchedule router configuration
const WeeklyScheduleController = require("../app/Controllers/WeeklyScheduleController.js");
const WeeklyScheduleRouter = require("koa-router")({
	prefix: "/weekly-schedule",
});
WeeklyScheduleRouter.get("/lobby", WeeklyScheduleController.getPublicSchedules, (err) => console.log(`lobby ran into an error: ${err}`));
WeeklyScheduleRouter.get("/get-all-schedules/:userID", WeeklyScheduleController.getAllSchedules, (err) =>
	console.log(`get-all-schedules ran into an error: ${err}`)
);
WeeklyScheduleRouter.put("/increment-upvotes/:weeklyScheduleID", WeeklyScheduleController.incrementUpvotes, (err) =>
	console.log(`increment-upvotes ran into an error: ${err}`)
);
WeeklyScheduleRouter.get("/id/:weeklyScheduleID", WeeklyScheduleController.getTitleById, (err) =>
	console.log(`getTitleById ran into an error: ${err}`)
);

WeeklyScheduleRouter.get("/profile-view/:userID/:accessStatus", WeeklyScheduleController.getPublicSchedulesById, (err) =>
	console.log(`getPublicSchedulesById ran into an error: ${err}`)
);

WeeklyScheduleRouter.delete("/delete/:weeklyScheduleID", WeeklyScheduleController.deleteWeeklySchedule, (err) =>
	console.log(`delete WeeklySchedule ran into an error: ${err}`)
);

WeeklyScheduleRouter.post("/insert/:accessStatus/:title/:upvotes/:userID", WeeklyScheduleController.insertNewWeeklySchedule, (err) =>
	console.log(`insertNewWeeklySchedule ran into an error: ${err}`)
);

WeeklyScheduleRouter.put("/update-status/:accessStatus/:weeklyScheduleID", WeeklyScheduleController.editWeeklyScheduleStatus, (err) =>
	console.log(`update-status ran into an error: ${err}`)
);
WeeklyScheduleRouter.put("/update-title/:title/:weeklyScheduleID", WeeklyScheduleController.editWeeklyScheduleTitle, (err) =>
	console.log(`update-title ran into an error: ${err}`)
);

WeeklyScheduleRouter.get("/last-insert-id", WeeklyScheduleController.getLastInsertId, (err) =>
	console.log(`getLastInsertId ran into an error: ${err}`)
);

const DailyRoutineController = require("../app/Controllers/DailyRoutineController.js");
const DailyRoutineRouter = require("koa-router")({
	prefix: "/daily-routine",
});
DailyRoutineRouter.get("/get-daily-routines/:dayOfWeek/:weeklyScheduleID", DailyRoutineController.getDailyRoutines, (err) =>
	console.log(`get-daily-routines ran into an error: ${err}`)
);
DailyRoutineRouter.get("/by-weekly-schedule/:weeklyScheduleID", DailyRoutineController.getDailyRoutineByWeeklyScheduleID, (err) =>
	console.log(`by-weekly-schedule ran into an error: ${err}`)
);

DailyRoutineRouter.put("/update/:sets/:reps/:weight/:dailyRoutineID", DailyRoutineController.updateRoutine, (err) =>
	console.log(`update-daily-routine ran into an error: ${err}`)
);

DailyRoutineRouter.delete("/delete/:dailyRoutineID", DailyRoutineController.deleteRoutine, (err) =>
	console.log(`delete-daily-routine ran into an error: ${err}`)
);

DailyRoutineRouter.post("/insert/:exerciseID/:sets/:reps/:weight/:dayOfWeek/:weeklyScheduleID", DailyRoutineController.insertNewDailyRoutine, (err) =>
	console.log(`daily-routine-insert ran into an error: ${err}`)
);

const FollowerController = require("../app/Controllers/FollowerController.js");
const FollowerRouter = require("koa-router")({
	prefix: "/follower",
});

FollowerRouter.post("/insert/:followedUserID/:followerUserID/", FollowerController.addFollower, (err) =>
	console.log(`follower-insert ran into an error: ${err}`)
);
FollowerRouter.delete("/delete/:followedUserID/:followerUserID", FollowerController.removeFollower, (err) =>
	console.log(`follower-delete ran into an error: ${err}`)
);

FollowerRouter.get("/search/:followedUserID/:followerUserID", FollowerController.searchFollower, (err) =>
	console.log(`follower-search ran into an error: ${err}`)
);

/**
 * Register all of the controllers into the default controller.
 */
router.use(
	"",
	// loginRouter.routes(),
	exercisesRouter.routes(),
	usersRouter.routes(),
	WeeklyScheduleRouter.routes(),
	DailyRoutineRouter.routes(),
	FollowerRouter.routes()
);

module.exports = function (app) {
	app.use(router.routes());
	app.use(router.allowedMethods());
};
