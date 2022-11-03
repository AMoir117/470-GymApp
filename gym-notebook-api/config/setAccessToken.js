const jwt = require('jsonwebtoken');


function setAccessToken(ctx, user) {
    console.log('setAccessToken:: cookie = ', ctx.cookies.get('access_token'));
    console.log('setAccessToken:: ctx.state contains', ctx.state);

    // Create an expiration date 20 minutes in the future for the user's access_token *cookie*
    const exp_date = Date.now() + (20 * 60 * 1000);


    // Set the data that will be sent in the user's access_token. The exp setting should probably
    // be set slightly ahead of the cookie's expiration date that stores it so that we can be
    // sure that if the cookie is present, then the access_token is probably valid (but we'll
    // still check it anyways).

    let token_opts = {
        type: 'web',
        exp: Math.floor(exp_date / 1000 + (60 * 1)), // expire the access_token 1m after the cookie
        user: user
    };

    // Sign the access_token
    const access_token = jwt.sign(token_opts, process.env.JWT_KEY);

    // Provide the access_token to the user via a cookie
    ctx.cookies.set('access_token', access_token, {
        // Prevent the cookie from being read in XSS/injection attack
        httpOnly: true,

        // Don't allow the access_token to be sent if not going over
        // an encrypted connection
//            secure: process.env.APP_ENV !== 'local',

        // Expire the cookie after a short period, slightly before the
        // access_token is expired
        expires: new Date(exp_date),

//            domain: process.env.APP_DOMAIN
    });

}

module.exports = setAccessToken;
