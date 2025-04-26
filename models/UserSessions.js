"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSessions = void 0;
var mongoose_1 = require("mongoose");
exports.userSessions = new mongoose_1.Schema({}, {
    strict: false,
    methods: {},
});
exports.default = (0, mongoose_1.model)("userSessions", exports.userSessions);
//# sourceMappingURL=UserSessions.js.map