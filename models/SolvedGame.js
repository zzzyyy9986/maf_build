"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solvedGameShema = void 0;
var mongoose_1 = require("mongoose");
exports.solvedGameShema = new mongoose_1.Schema({}, { strict: false });
exports.default = (0, mongoose_1.model)("SolvedGame", exports.solvedGameShema);
//# sourceMappingURL=SolvedGame.js.map