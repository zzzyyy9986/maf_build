"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationSerive = void 0;
var env_1 = require("../env");
var ApplicationSerive = /** @class */ (function () {
    function ApplicationSerive() {
    }
    /**
     *
     */
    ApplicationSerive.getCookieSecureSettings = function () {
        if (env_1.APP_MODE == "DEV") {
            return {};
        }
        else {
            return {
                // нет доступа с фронта
                HttpOnly: true,
                //будут передаваться только по https
                Secure: true,
                SameSite: "lax", // strict or 'Lax', it depends
            };
        }
    };
    return ApplicationSerive;
}());
exports.ApplicationSerive = ApplicationSerive;
//# sourceMappingURL=ApplicationService.js.map