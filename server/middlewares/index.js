const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const {User} = require("../db/models");
var cookie = require('cookie');

//httpUserContext injects user context in http request
const httpUserContext = function (req, res, next) {
    const token = req.cookies["access-token"];

    validateTokenAndGetUser(token).then((user) => {
        req.user = user;
        return next();
    }).catch((err) => {
        return next();
    })
}

//socketUserContext injects user context in socket
const socketUserContext = function (socket, next) {
    const token = socket.cookies?.["access-token"];

    validateTokenAndGetUser(token).then((user) => {
        socket.user = user;
        return next();
    }).catch((err) => {
        return next();
    })
}

const socketCookieParser = (socket, next) => {
    socket.cookies = cookie.parse(socket?.request?.headers?.cookie);
    next();
}


const errorHandler = function (err, req, res, next) {
    // set locals, only providing error in development
    console.log(err);
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({error: err});
}

const notFound = function (req, res, next) {
    next(createError(404));
}


const validateTokenAndGetUser = (token) => {
    return new Promise((resolve, reject) => {
        if (!token) {
            return reject()
        }

        jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            User.findOne({
                where: {id: decoded.id},
            }).then((user) => {
                return resolve(user);
            });
        });
    })

}

module.exports = {
    errorHandler,
    notFound,
    httpUserContext,
    socketUserContext,
    socketCookieParser,
}
