const dbConnection = require("../../database/mySQLconnect");
const dateFormat = require("dateformat");

function now() {
	return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

const allExercises = async (ctx) => {
	console.log("exercises all exercises called.");
	return new Promise((resolve, reject) => {
		const query = `
                       SELECT *
                        FROM 
                            exercises
                        ORDER BY id
                        `;
		dbConnection.query(
			{
				sql: query,
			},
			(error, tuples) => {
				if (error) {
					console.log("Connection error in ExercisesController::allExercises", error);
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			}
		);
	}).catch((err) => {
		console.log("Database connection error in allExercises.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};

const exerciseByName = (ctx) => {
	console.log("exercises exercise by name called.");
	return new Promise((resolve, reject) => {
		const query = `SELECT * FROM Exercises WHERE workoutName = ?;`;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.workoutName]
			}, (error, tuples) => {
				if (error) {
					console.log("Connection error in ExercisesController::exerciseByName", error);
					ctx.body = [];
					ctx.status = 200;
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			});
		console.log(ctx.params);
	}).catch((err) => {
		console.log("Database connection error in exerciseByName.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};

const exerciseByID = (ctx) => {
	console.log("exercises exercise by ID called.");
	return new Promise((resolve, reject) => {
		const query = `SELECT * FROM Exercises WHERE id = ?`;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.id]
			}, (error, tuples) => {
				if (error) {
					console.log("Connection error in ExercisesController::exerciseByID", error);
					ctx.body = [];
					ctx.status = 200;
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			});
	}).catch((err) => {
		console.log("Database connection error in exerciseByID.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};

const exerciseByBodyPart = (ctx) => {
	console.log("exercises exercise by bodyPart called.");
	return new Promise((resolve, reject) => {
		const query = `SELECT * FROM Exercises WHERE bodyPart = ?`;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.bodyPart]
			}, (error, tuples) => {
				if (error) {
					console.log("Connection error in ExercisesController::exerciseByBodyPart", error);
					ctx.body = [];
					ctx.status = 200;
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			});
	}).catch((err) => {
		console.log("Database connection error in exerciseByBodyPart.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};

const exerciseByMuscle = (ctx) => {
	console.log("exercises exercise by muscle called.");
	return new Promise((resolve, reject) => {
		const query = `SELECT * FROM Exercises WHERE targetMuscle = ?`;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.targetMuscle]
			}, (error, tuples) => {
				if (error) {
					console.log("Connection error in ExercisesController::exerciseByMuscle", error);
					ctx.body = [];
					ctx.status = 200;
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			});
	}).catch((err) => {
		console.log("Database connection error in exerciseByMuscle.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};

const exerciseByEquipment = (ctx) => {
	console.log("exercises exercise by Equipment called.");
	return new Promise((resolve, reject) => {
		const query = `SELECT * FROM Exercises WHERE equipment = ?`;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.equipment]
			}, (error, tuples) => {
				if (error) {
					console.log("Connection error in ExercisesController::exerciseByEquipment", error);
					ctx.body = [];
					ctx.status = 200;
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			});
	}).catch((err) => {
		console.log("Database connection error in exerciseByEquipment.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};


module.exports = {
	allExercises,
	exerciseByName,
	exerciseByID,
	exerciseByBodyPart,
	exerciseByMuscle,
	exerciseByEquipment
};
