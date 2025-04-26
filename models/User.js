"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userShema = void 0;
var mongoose_1 = require("mongoose");
exports.userShema = new mongoose_1.Schema({}, { strict: false });
exports.default = (0, mongoose_1.model)("User", exports.userShema);
//# sourceMappingURL=User.js.map