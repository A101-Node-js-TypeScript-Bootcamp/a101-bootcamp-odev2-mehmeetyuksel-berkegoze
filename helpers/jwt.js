const expressJwt = require("express-jwt");
const secret = "mySecretKey";

function jwt() {
    return expressJwt({secret, algorithms: ['HS256']}).unless({
        path: [
            '/api/login'                    // Auth gerektirmeyen path
        ]
    })
};

module.exports = jwt;