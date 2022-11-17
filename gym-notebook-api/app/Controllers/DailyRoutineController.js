const dbConnection = require("../../database/mySQLconnect");
const dateFormat = require("dateformat");

function now() {
	return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

const getDailyRoutines = async (ctx) => {
	console.log("getDailyRoutines called.");
	return new Promise((resolve, reject) => {
		const query = `
                      SELECT *
                      FROM
                          DailyRoutine
                      WHERE dayOfWeek = ? AND weeklyScheduleID = ?;
                      `;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.dayOfWeek, ctx.params.weeklyScheduleID],
			},
			(error, tuples) => {
				if (error) {
					console.log(
						"Connection error in DailyRoutineController::getDailyRoutines",
						error
					);
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			}
		);
	}).catch((err) => {
		console.log("Database connection error in getDailyRoutines.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};

const updateRoutine = async (ctx) => {
	console.log("updateRoutine called.");
	return new Promise((resolve, reject) => {
		const query = `
                      UPDATE DailyRoutine
                      SET sets = ?, reps = ?, weight = ?
                      WHERE id = ?;
                      `;
		dbConnection.query(
			{
				sql: query,
				values: [
					ctx.params.sets,
					ctx.params.reps,
					ctx.params.weight,
					ctx.params.dailyRoutineID,
				],
			},
			(error, tuples) => {
				if (error) {
					console.log("Connection error in DailyRoutineController::updateRoutine", error);
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			}
		);
	}).catch((err) => {
		console.log("Database connection error in updateRoutine.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};

const deleteRoutine = async (ctx) => {
	console.log("deleteRoutine called.");
	return new Promise((resolve, reject) => {
		const query = `
                      DELETE FROM DailyRoutine
                      WHERE id = ?;
                      `;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.dailyRoutineID],
			},
			(error, tuples) => {
				if (error) {
					console.log("Connection error in DailyRoutineController::deleteRoutine", error);
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			}
		);
	}).catch((err) => {
		console.log("Database connection error in deleteRoutine.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};

const insertNewDailyRoutine = async (ctx) => {
	console.log("insertNewDailyRoutine called.");
	return new Promise((resolve, reject) => {
		const query = `
                  INSERT INTO DailyRoutine
                  (exerciseID, sets, reps, weight, dayOfWeek, weeklyScheduleID)
                  VALUES (?, ?, ?, ?, ?, ?);
                  `;
		dbConnection.query(
			{
				sql: query,
				values: [
					ctx.params.exerciseID,
					ctx.params.sets,
					ctx.params.reps,
					ctx.params.weight,
					ctx.params.dayOfWeek,
					ctx.params.weeklyScheduleID,
				],
			},
			(error, tuples) => {
				if (error) {
					console.log(
						"Connection error in DailyRoutineController::insertNewDailyRoutine",
						error
					);
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			}
		);
	}).catch((err) => {
		console.log("Database connection error in insertNewDailyRoutine.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};

module.exports = {
	getDailyRoutines,
	updateRoutine,
	deleteRoutine,
	insertNewDailyRoutine,
};
