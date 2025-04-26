"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = exports.gameShema = void 0;
var mongoose_1 = require("mongoose");
var mongoose = __importStar(require("mongoose"));
var ShowStatuses_1 = require("../common/enums/ShowStatuses");
exports.gameShema = new mongoose_1.Schema({}, {
    strict: false,
    statics: {
        moderatedAndShowed: function () {
            mongoose.model("Game").find({ id: "123" });
        },
        showed: function () {
            return exports.Game.find({
                showStatus: ShowStatuses_1.ShowStatuses.forAll,
            });
        },
    },
});
exports.Game = (0, mongoose_1.model)("Game", exports.gameShema);
//# sourceMappingURL=Game.js.map