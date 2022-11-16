const dbConnection = require("../../database/mySQLconnect");
const dateFormat = require("dateformat");

function now() {
	return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

const getPublicSchedules = async (ctx) => {
	console.log("getPublicSchedules called.");
	return new Promise((resolve, reject) => {
		const query = `
        SELECT 
            W.id, 
            W.title, 
            W.upvotes, 
            U.username, 
            U.imagePath,
			U.firstName,
			U.lastName,
			U.profileBio
        FROM 
            WeeklySchedule W LEFT JOIN Users U 
        ON 
            W.userID = U.id 
        WHERE 
            accessStatus = 'public' 
        ORDER BY 
            upvotes DESC;

	

                      `;
		dbConnection.query(
			{
				sql: query,
			},
			(error, tuples) => {
				if (error) {
					console.log(
						"Connection error in WeeklyScheduleController::getPublicSchedules",
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
		console.log("Database connection error in getPublicSchedules.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};

const getAllSchedules = async (ctx) => {
	console.log("getAllSchedules called.");
	return new Promise((resolve, reject) => {
		const query = `
                      SELECT *
                      FROM
                          WeeklySchedule
                      WHERE userID = ?;
                      `;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.userID],
			},
			(error, tuples) => {
				if (error) {
					console.log(
						"Connection error in WeeklyScheduleController::getAllSchedules",
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
		console.log("Database connection error in getAllSchedules.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};

const incrementUpvotes = async (ctx) => {
	console.log("incrementUpvotes called.");
	return new Promise((resolve, reject) => {
		const query = `
                      UPDATE WeeklySchedule
                      SET upvotes=upvotes+1
                      WHERE id = ?;
                      `;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.weeklyScheduleID],
			},
			(error, tuples) => {
				if (error) {
					console.log(
						"Connection error in WeeklyScheduleController::incrementUpvotes",
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
		console.log("Database connection error in incrementUpvotes.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};

const editWeeklyScheduleTitle = async (ctx) => {
	console.log("editWeeklyScheduleTitle called.");
	return new Promise((resolve, reject) => {
		const query = `
                      UPDATE WeeklySchedule
                      SET title = ?
                      WHERE id = ?;
                      `;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.title, ctx.params.weeklyScheduleID],
			},
			(error, tuples) => {
				if (error) {
					console.log(
						"Connection error in WeeklyScheduleController::editWeeklyScheduleTitle",
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
		console.log("Database connection error in editWeeklyScheduleTitle.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};

const deleteWeeklySchedule = async (ctx) => {
	console.log("deleteWeeklySchedule called.");
	return new Promise((resolve, reject) => {
		const query = `
                      DELETE FROM WeeklySchedule
                      WHERE id = ?;
                      `;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.weeklyScheduleID],
			},
			(error, tuples) => {
				if (error) {
					console.log(
						"Connection error in WeeklyScheduleController::deleteWeeklySchedule",
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
		console.log("Database connection error in deleteWeeklySchedule.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};

const getTitleById = async (ctx) => {
	console.log("getTitleById called.");
	return new Promise((resolve, reject) => {
		const query = `
                      SELECT title FROM WeeklySchedule WHERE id = ?;
                      `;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.weeklyScheduleID],
			},
			(error, tuples) => {
				if (error) {
					console.log(
						"Connection error in WeeklyScheduleController::getTitleById",
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
		console.log("Database connection error in getTitleById.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};

const editWeeklyScheduleStatus = async (ctx) => {
	console.log("editWeeklyScheduleStatus called.");
	return new Promise((resolve, reject) => {
		const query = `
                      UPDATE WeeklySchedule
                      SET accessStatus = ?
                      WHERE id = ?;
                      `;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.accessStatus, ctx.params.weeklyScheduleID],
			},
			(error, tuples) => {
				if (error) {
					console.log(
						"Connection error in WeeklyScheduleController::editWeeklyScheduleStatus",
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
		console.log("Database connection error in editWeeklyScheduleStatus.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};

const insertNewWeeklySchedule = async (ctx) => {
	console.log("insertNewWeeklySchedule called.");
	return new Promise((resolve, reject) => {
		const query = `
                      INSERT INTO WeeklySchedule
                      (accessStatus, title, upvotes, userID)
                      VALUES (?, ?, ?, ?)
                      `;
		dbConnection.query(
			{
				sql: query,
				values: [
					ctx.params.accessStatus,
					ctx.params.title,
					ctx.params.upvotes,
					ctx.params.userID,
				],
			},
			(error, tuples) => {
				if (error) {
					console.log(
						"Connection error in WeeklyScheduleController::insertNewWeeklySchedule",
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
		console.log("Database connection error in insertNewWeeklySchedule.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};

module.exports = {
	getPublicSchedules,
	getAllSchedules,
	incrementUpvotes,
	editWeeklyScheduleTitle,
	deleteWeeklySchedule,
	getTitleById,
	insertNewWeeklySchedule,
	editWeeklyScheduleStatus,
};
