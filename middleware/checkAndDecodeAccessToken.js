"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAndDecodeAccessToken = void 0;
var env_1 = require("../env");
var jwt = require("jsonwebtoken");
var checkAndDecodeAccessToken = function (req, res, next) {
    var authHeader = req.headers["authorization"];
    var token = authHeader && authHeader.split(" ")[1];
    if (token == null)
        return res.sendStatus(401);
    jwt.verify(token, env_1.TOKEN_SECRET, function (err, user) {
        if (err) {
            return res.sendStatus(403);
        }
        else {
            req.user = user;
            next();
        }
    });
};
exports.checkAndDecodeAccessToken = checkAndDecodeAccessToken;
//# sourceMappingURL=checkAndDecodeAccessToken.js.map