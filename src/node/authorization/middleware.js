let jwt = require("jsonwebtoken");

const config = {
    secret: "banana"
};

let checkToken = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (token && token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }


    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: "Token is not valid"
                });
            } else {
                req.decoded = decoded;
                //res.locals.userRole = decoded.userRole;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: "Auth token is not supplied"
        });
    }
};

module.exports = {
    checkToken,
    config
};
