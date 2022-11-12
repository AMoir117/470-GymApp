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
                values: [ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in UsersController::userByName", error);
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
                values: [ctx.params.id]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in UsersController::userByID", error);
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
        console.log("Database connection error in userByID.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
};

const getUsersFollowers = async (ctx) => {
    console.log('getUsersFollowers called.');
    return new Promise((resolve, reject) => {
        const query = `
                      SELECT * FROM Users Users_Table
                      LEFT JOIN Follower Follower_Table
                      ON Follower_Table.followerUserID = Users_Table.id
                      WHERE Follower_Table.followedUserID = ?;
                      `;
        dbConnection.query({
            sql: query,
            values: [ctx.params.followedUserID]
        }, (error, tuples) => {
            if (error) {
                console.log("Connection error in UsersController::getUsersFollowers", error);
                return reject(error);
            }
            ctx.body = tuples;
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getUsersFollowers.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

module.exports = {
    allUsers,
    userByName,
    userByID,
    getUsersFollowers
};
