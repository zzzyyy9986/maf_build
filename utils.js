"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBrowserInfo = exports.getHash = exports.checkTelegramAuthData = exports.generateAccessToken = exports.checkEmail = void 0;
var env_1 = require("./env");
var checkEmail = function (email) {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
exports.checkEmail = checkEmail;
var generateAccessToken = function (mafId) {
    var jwt = require("jsonwebtoken");
    return {
        token: jwt.sign({ mafId: mafId }, env_1.TOKEN_SECRET, {
            expiresIn: env_1.ACCESS_TOKEN_EXPIRE_TIME_SEC,
        }),
        expTime: Math.floor(Date.now() / 1000) + env_1.ACCESS_TOKEN_EXPIRE_TIME_SEC,
    };
};
exports.generateAccessToken = generateAccessToken;
var checkTelegramAuthData = function (_a) {
    var hash = _a.hash, data = __rest(_a, ["hash"]);
    var _b = require("crypto"), createHash = _b.createHash, createHmac = _b.createHmac;
    var secret = createHash("sha256").update(env_1.TG_TOKEN).digest();
    var stringToCheck = Object.keys(data)
        .sort()
        .map(function (key) { return "".concat(key, "=").concat(data[key]); })
        .join("\n");
    console.log("decode");
    console.log(stringToCheck);
    var hmac = createHmac("sha256", secret).update(stringToCheck).digest("hex");
    return hmac === hash;
};
exports.checkTelegramAuthData = checkTelegramAuthData;
var getHash = function (_a) {
    var hash = _a.hash, data = __rest(_a, ["hash"]);
    var _b = require("crypto"), createHash = _b.createHash, createHmac = _b.createHmac;
    var secret = createHash("sha256").update(env_1.TG_TOKEN).digest();
    var stringToCheck = Object.keys(data)
        .sort()
        .map(function (key) { return "".concat(key, "=").concat(data[key]); })
        .join("\n");
    console.log("decode");
    console.log(stringToCheck);
    var hmac = createHmac("sha256", secret).update(stringToCheck).digest("hex");
    return {
        hmac: hmac,
        hash: hash,
    };
};
exports.getHash = getHash;
var getBrowserInfo = function (userAgent) {
    var browser = require("browser-detect");
    var browserInfo = browser(userAgent);
    return ("" +
        (browserInfo.mobile ? "mobile" : "desktop") +
        "_" +
        browserInfo.name +
        "_" +
        browserInfo.os);
};
exports.getBrowserInfo = getBrowserInfo;
//# sourceMappingURL=utils.js.map