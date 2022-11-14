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
            U.imagePath 
        FROM 
            WeeklySchedule W LEFT JOIN Users U 
        ON 
            W.userID = U.id 
        WHERE 
            accessStatus = 'public' 
        ORDER BY 
            upvotes ASC;

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

module.exports = {
	getPublicSchedules,
};
