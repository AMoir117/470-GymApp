const cors = require('kcors');

module.exports = function (app) {

    // Send standard CORS headers with all origins allowed                                                                                                
    app.use(cors({
            credentials: true,
            exposeHeaders: ['Access-Token', 'Cookie']
            }));
};
