"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMafId = void 0;
var checkMafId = function (req, res, next) {
    var md5 = require("md5");
    // @ts-ignore
    if (md5(req.user.userId + process.env.SAULT) === req.body.mafId) {
        next();
    }
    else {
        res.status(401).json({ msg: "У вас неверный ID" });
    }
};
exports.checkMafId = checkMafId;
//# sourceMappingURL=checkMafId.js.map