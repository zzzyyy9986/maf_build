"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramServices = void 0;
var env_1 = require("../env");
var responseStatuses_1 = require("../common/enums/responseStatuses");
var TelegramServices = /** @class */ (function () {
    function TelegramServices() {
    }
    TelegramServices.createRefreshToken = function (mafId) {
        var md5 = require("md5");
        return md5(mafId + Date.now() + env_1.SAULT);
    };
    /**
     * Заменить старый токен на новый
     * @param oldRefreshToken
     * @param req
     */
    TelegramServices.replaceRefreshToken = function (oldRefreshToken, req) {
        return {
            status: responseStatuses_1.ResponseStatuses.ok,
            msg: "Успешно",
        };
    };
    TelegramServices.saveRefreshTokenToCookie = function (token, res) {
        // res.cookie("refreshToken", token, {
        //   //нет доступа с фронта
        //   // httpOnly: true,
        //   // будут передаваться только по https
        //   // secure: true,
        //   //
        //   // sameSite: "lax", // strict or 'Lax', it depends
        //   maxAge: 60 * 60 * 24 * REFRESH_TOKEN_EXP_TIME_DAYS * 1000,
        // });
    };
    return TelegramServices;
}());
exports.TelegramServices = TelegramServices;
//# sourceMappingURL=TelegramServices.js.map