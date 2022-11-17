const dbConnection = require("../../database/mySQLconnect");
const dateFormat = require("dateformat");

function now() {
	return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}


const addFollower = (ctx) => {
	console.log("follower addFollower called.");
	return new Promise((resolve, reject) => {
		const query = `INSERT INTO Follower
                   (followedUserID, followerUserID)
                   VALUES (?, ?);
                   `;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.followedUserID, ctx.params.followerUserID],
			},
			(error, tuples) => {
				if (error) {
					console.log("Connection error in FollowerController::addFollower", error);
					ctx.body = [];
					ctx.status = 200;
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			}
		);
		console.log(ctx.params);
	}).catch((err) => {
		console.log("Database connection error in addFollower.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};

const removeFollower = (ctx) => {
	console.log("follower removeFollower called.");
	return new Promise((resolve, reject) => {
		const query = `DELETE FROM Follower
                   WHERE followerUserID = ?
                   `;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.followerUserID],
			},
			(error, tuples) => {
				if (error) {
					console.log("Connection error in FollowerController::removeFollower", error);
					ctx.body = [];
					ctx.status = 200;
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			}
		);
		console.log(ctx.params);
	}).catch((err) => {
		console.log("Database connection error in removeFollower.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};


module.exports = {
  addFollower,
  removeFollower
};
