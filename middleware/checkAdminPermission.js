"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdminPermissionWrapper = void 0;
var checkAdminPermission = function (req, res, next, adminStatus) {
    if (req.body.protectedUser.admin >= adminStatus) {
        next();
    }
    else {
        res.status(401).json({ msg: "У вас нет нужных привилегий" });
    }
};
var checkAdminPermissionWrapper = function (adminStatus) {
    return function (req, res, next) {
        checkAdminPermission(req, res, next, adminStatus);
    };
};
exports.checkAdminPermissionWrapper = checkAdminPermissionWrapper;
//# sourceMappingURL=checkAdminPermission.js.map