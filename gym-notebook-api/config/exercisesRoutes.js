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

router.get("/", function (ctx) {
	console.log("router.get(/)");
	return (ctx.body = "What is up??");
});

/*
|--------------------------------------------------------------------------
| login router
|--------------------------------------------------------------------------
|
| Description
|
*/

// Login router configuration.

const LoginController = require("../app/Controllers/LoginController.js");
const loginRouter = require("koa-router")({
	prefix: "/login",
});
loginRouter.get("/:user_id", LoginController.authorizeUser, (err) =>
	console.log("exercisesRoutes.js: login-route error:", err)
);

// Routes router configuration.

const ExercisesController = require("../app/Controllers/ExerciseController.js");
const exercisesRouter = require("koa-router")({
	prefix: "/exercises",
});

//exercisesRouter.use(VerifyJWT);
exercisesRouter.get("/all-exercises", ExercisesController.allExercises, (err) =>
	console.log(`allExercises ran into an error: ${err}`)
);
//exercisesRouter.get('/:routeID/', Authorize('admin'), ExercisesController.exerciseWithExerciseID);

/**
 * Register all of the controllers into the default controller.
 */
router.use("", loginRouter.routes(), exercisesRouter.routes());

module.exports = function (app) {
	app.use(router.routes());
	app.use(router.allowedMethods());
};
