const dbConnection = require("../../database/mySQLconnect");
const dateFormat = require("dateformat");

function now() {
	return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

const allUsers = async (ctx) => {
	console.log("users allusers called.");
	return new Promise((resolve, reject) => {
		const query = `
                       SELECT *
                        FROM
                            users
                        ORDER BY id
                        `;
		dbConnection.query(
			{
				sql: query,
			},
			(error, tuples) => {
				if (error) {
					console.log("Connection error in UsersController::allUsers", error);
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			}
		);
	}).catch((err) => {
		console.log("Database connection error in allUsers.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};

const userByName = (ctx) => {
	console.log("users user by name called.");
	return new Promise((resolve, reject) => {
		const query = `SELECT * FROM Users WHERE username = ?;`;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.username],
			},
			(error, tuples) => {
				if (error) {
					console.log("Connection error in UsersController::userByName", error);
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
		console.log("Database connection error in userByName.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};

const userByID = (ctx) => {
	console.log("users user by id called.");
	return new Promise((resolve, reject) => {
		const query = `SELECT * FROM Users WHERE id = ?;`;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.id],
			},
			(error, tuples) => {
				if (error) {
					console.log("Connection error in UsersController::userByID", error);
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
		console.log("Database connection error in userByID.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};
	console.log("users user by id called.");
	return new Promise((resolve, reject) => {
		const query = `SELECT * FROM Users WHERE id = ?;`;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.id],
			},
			(error, tuples) => {
				if (error) {
					console.log("Connection error in UsersController::userByID", error);
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
		console.log("Database connection error in userByID.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};

const insertNewUser = (ctx) => {
	const usersTableAttributes = [
		"username",
		"userPassword",
		"firstName",
		"lastName",
		"DoB",
		//'imagePath',
		"email",
		"profileBio",
	];

	let valuesFromRequest = JSON.parse(JSON.stringify(ctx.request.body)); // make a deep copy of ctx.request.body

	// Pad the values that we received through the request with the default values.
	const valuesToInsert = {
		...valuesFromRequest,
		...{
			// default values
			username: valuesFromRequest["username"],
			userPassword: valuesFromRequest["userPassword"],
			firstName: valuesFromRequest["firstName"],
			lastName: valuesFromRequest["lastName"],
			DoB: valuesFromRequest["DoB"],
			email: valuesFromRequest["email"],
			profileBio: valuesFromRequest["profileBio"],
			//imagePath: valuesFromRequest['imagePath']
		},
	};

	const valueMarkers = Array(usersTableAttributes.length).fill("?").join(", ");

	// insert into tableName (a list of attributes) value(a list of values);

	// valueMarkers now contains eight (routesTableAttributes.length) question marks like so: '?, ?, ?, ?, ?, ?, ?, ?';
	const attributeValuesArray = usersTableAttributes.reduce((valuesAssembled, attribute) => {
		valuesAssembled.push(valuesToInsert[attribute]);
		return valuesAssembled;
	}, []);

	// attributeValuesArray also has routesTableAttributes.length element. Its element i contains
	// values[ routeTableAttributes[i] ]. For example, attributeValuesArray[5] contains 'Active'

	return new Promise((resolve, reject) => {
		console.log(`API server::insertNewUser: ${JSON.stringify(ctx.request.body)}`);
		console.log(
			`API server::insertNewUser after having added default values: ${JSON.stringify(
				valuesToInsert
			)}`
		);

		const query = `
                       INSERT INTO users (${usersTableAttributes})
                              VALUES (${valueMarkers})
                        `;
		dbConnection.query(
			{
				sql: query,
				values: attributeValuesArray,
			},
			(error, tuples) => {
				if (error) {
					console.log("Connection error in UsersController::userWithUserID", error);
					ctx.body = [];
					ctx.status = 200;
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			}
		);
	}).catch((error) => console.log(`insertNewUser failed with error message, ${error}`));
};

const getUsersFollowers = async (ctx) => {
	console.log("getUsersFollowers called.");
	return new Promise((resolve, reject) => {
		const query = `
                      SELECT * FROM Users Users_Table
                      LEFT JOIN Follower Follower_Table
                      ON Follower_Table.followerUserID = Users_Table.id
                      WHERE Follower_Table.followedUserID = ?;
                      `;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.followedUserID],
			},
			(error, tuples) => {
				if (error) {
					console.log("Connection error in UsersController::getUsersFollowers", error);
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			}
		);
	}).catch((err) => {
		console.log("Database connection error in getUsersFollowers.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};

const useWeeklySchedule = async (ctx) => {
    console.log('useWeeklySchedule called.');
    return new Promise((resolve, reject) => {
        const query = `
                      UPDATE Users
                      SET currentWeeklyScheduleID = ?
                      WHERE id = ?;
                      `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.currentWeeklyScheduleID, ctx.params.userID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in userController::useWeeklySchedule", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in useWeeklySchedule.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}


const insertNewUser = (ctx) => {
	const usersTableAttributes = [
		"username",
		"userPassword",
		"firstName",
		"lastName",
		"DoB",
		"imagePath",
		"email",
		"profileBio",
	];

	let valuesFromRequest = JSON.parse(JSON.stringify(ctx.request.body)); // make a deep copy of ctx.request.body

	// Pad the values that we received through the request with the default values.
	const valuesToInsert = {
		...valuesFromRequest,
		...{
			// default values
			username: valuesFromRequest["username"],
			userPassword: valuesFromRequest["userPassword"],
			firstName: valuesFromRequest["firstName"],
			lastName: valuesFromRequest["lastName"],
			DoB: valuesFromRequest["DoB"],
			imagePath: valuesFromRequest["imagePath"],
			email: valuesFromRequest["email"],
			profileBio: valuesFromRequest["profileBio"],
		},
	};

	const valueMarkers = Array(usersTableAttributes.length).fill("?").join(", ");

	// insert into tableName (a list of attributes) value(a list of values);

	// valueMarkers now contains eight (routesTableAttributes.length) question marks like so: '?, ?, ?, ?, ?, ?, ?, ?';
	const attributeValuesArray = usersTableAttributes.reduce((valuesAssembled, attribute) => {
		valuesAssembled.push(valuesToInsert[attribute]);
		return valuesAssembled;
	}, []);

	// attributeValuesArray also has routesTableAttributes.length element. Its element i contains
	// values[ routeTableAttributes[i] ]. For example, attributeValuesArray[5] contains 'Active'

	return new Promise((resolve, reject) => {
		console.log(`API server::insertNewUser: ${JSON.stringify(ctx.request.body)}`);
		console.log(
			`API server::insertNewUser after having added default values: ${JSON.stringify(
				valuesToInsert
			)}`
		);

		const query = `
                       INSERT INTO users (${usersTableAttributes}) 
                              VALUES (${valueMarkers})
                        `;
		dbConnection.query(
			{
				sql: query,
				values: attributeValuesArray,
			},
			(error, tuples) => {
				if (error) {
					console.log("Connection error in UsersController::userWithUserID", error);
					ctx.body = [];
					ctx.status = 200;
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			}
		);
	}).catch((error) => console.log(`insertNewUser failed with error message, ${error}`));
};

const getUsersFollowers = async (ctx) => {
	console.log("getUsersFollowers called.");
	return new Promise((resolve, reject) => {
		const query = `
                      SELECT * FROM Users Users_Table
                      LEFT JOIN Follower Follower_Table
                      ON Follower_Table.followerUserID = Users_Table.id
                      WHERE Follower_Table.followedUserID = ?;
                      `;
		dbConnection.query(
			{
				sql: query,
				values: [ctx.params.followedUserID],
			},
			(error, tuples) => {
				if (error) {
					console.log("Connection error in UsersController::getUsersFollowers", error);
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			}
		);
	}).catch((err) => {
		console.log("Database connection error in getUsersFollowers.", err);
		// The UI side will have to look for the value of status and
		// if it is not 200, act appropriately.
		ctx.body = [];
		ctx.status = 500;
	});
};

module.exports = {
	allUsers,
	userByName,
	userByID,
	insertNewUser,
	getUsersFollowers,
  useWeeklySchedule
};
