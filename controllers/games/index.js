"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeShowStatus = exports.exitFromAccount = exports.tgRegistration = exports.getApplicationToken = exports.getMyGames = exports.getListOfSolvedGames = exports.getAuth = exports.checkAnswer = exports.saveGame = exports.getListOfGames = exports.getGameByIdForUser = exports.getGameById = void 0;
var User_1 = __importDefault(require("../../models/User"));
var SolvedGame_1 = __importDefault(require("../../models/SolvedGame"));
var GameServices_1 = require("../../services/GameServices");
var utils_1 = require("../../utils");
var env_1 = require("../../env");
var mongodb_1 = require("mongodb");
var TelegramServices_1 = require("../../services/TelegramServices");
var UserSessions_1 = __importDefault(require("../../models/UserSessions"));
var Game_1 = require("../../models/Game");
var responseStatuses_1 = require("../../common/enums/responseStatuses");
var getGameById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var game;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Game_1.Game.findOne({ myID: req.body.id })];
            case 1:
                game = _a.sent();
                res.status(201).json({ game: game });
                return [2 /*return*/];
        }
    });
}); };
exports.getGameById = getGameById;
var getGameByIdForUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var game;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Game_1.Game.findOne({
                    myID: req.body.id,
                })];
            case 1:
                game = _a.sent();
                if (game === null || game === void 0 ? void 0 : game.questions) {
                    Object.keys(game["questions"]).map(function (el) {
                        if (game["questions"][el]["answer"]) {
                            delete game["questions"][el]["answer"];
                        }
                    });
                }
                // delete game;
                res.status(201).json({ game: game });
                return [2 /*return*/];
        }
    });
}); };
exports.getGameByIdForUser = getGameByIdForUser;
var getListOfGames = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pagination, dataRes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pagination = req.body.pagination;
                return [4 /*yield*/, GameServices_1.GameServices.dataWithPagination(function () {
                        return Game_1.Game.find().sort({ lastUpdate: "desc" });
                    }, req, res)];
            case 1:
                dataRes = _a.sent();
                res.status(201).json(__assign({}, dataRes));
                return [2 /*return*/];
        }
    });
}); };
exports.getListOfGames = getListOfGames;
/**
 * _id - для поиска по базе.
 * myID - для внутренних ссылок внутри игры.
 * @param req
 * @param res
 */
var saveGame = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var game;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                game = Object.values(req.body.game)[0];
                delete game["gameInfo"];
                delete game["id"];
                if (!!Object.keys(game.questions).length) return [3 /*break*/, 1];
                return [2 /*return*/, res.status(201).json({
                        status: responseStatuses_1.ResponseStatuses.error,
                        msg: "Нельзя сохранить игру без ответа!",
                    })];
            case 1: 
            /**
             * Если новая игра
             */
            /**
             * Обновляем, id уже есть
             */
            return [4 /*yield*/, Game_1.Game.findOneAndUpdate({ myID: game.myID, author: new mongodb_1.ObjectId(req.user.mafId) }, __assign(__assign({}, game), {
                    author: new mongodb_1.ObjectId(req.user.mafId),
                    lastUpdate: Date.now(),
                }), {
                    new: true,
                    upsert: true,
                })];
            case 2:
                /**
                 * Если новая игра
                 */
                /**
                 * Обновляем, id уже есть
                 */
                _a.sent();
                _a.label = 3;
            case 3:
                res.status(201).json({ status: responseStatuses_1.ResponseStatuses.ok });
                return [2 /*return*/];
        }
    });
}); };
exports.saveGame = saveGame;
var checkAnswer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var answerReq, resObj, game, dbAnswers, userAnswers, isCorrectAnswer, listOfWrongAnswers, md5, mafId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                answerReq = req.body;
                resObj = {};
                return [4 /*yield*/, Game_1.Game.findOne({
                        myID: answerReq.gameId,
                    })];
            case 1:
                game = _a.sent();
                dbAnswers = {};
                userAnswers = {};
                Object.values(game.questions).forEach(function (el) {
                    dbAnswers[el.id] = el.answer
                        .map(function (el) { return el.value; })
                        .sort()
                        .join(",");
                });
                answerReq.data.forEach(function (el) {
                    userAnswers[el.questionId] = el.data.sort().join(",");
                });
                isCorrectAnswer = true;
                listOfWrongAnswers = [];
                Object.keys(dbAnswers).forEach(function (questionKey) {
                    if (dbAnswers[questionKey] !== userAnswers[questionKey]) {
                        isCorrectAnswer = false;
                        listOfWrongAnswers.push(questionKey);
                    }
                });
                if (!isCorrectAnswer) return [3 /*break*/, 4];
                md5 = require("md5");
                mafId = req.user.mafId;
                return [4 /*yield*/, SolvedGame_1.default.findOneAndUpdate({
                        mafId: new mongodb_1.ObjectId(mafId),
                        gameId: game.id,
                    }, {
                        mafId: new mongodb_1.ObjectId(mafId),
                        gameId: game.id,
                    }, {
                        new: true,
                        upsert: true,
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, res
                        .status(200)
                        .json({ status: responseStatuses_1.ResponseStatuses.ok, listOfWrongAnswers: listOfWrongAnswers })];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                res
                    .status(200)
                    .json({ status: responseStatuses_1.ResponseStatuses.error, listOfWrongAnswers: listOfWrongAnswers });
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.checkAnswer = checkAnswer;
var getAuth = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var md5, user, userAr;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                md5 = require("md5");
                return [4 /*yield*/, User_1.default.findOne({ googleId: req.user.userId })];
            case 1:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 3];
                return [4 /*yield*/, User_1.default.insertMany({
                        mafId: md5(req.user.userId + process.env.SAULT),
                        userId: req.user.userId,
                        email: req.user.email,
                        userName: req.user.username,
                        type: "google",
                        admin: 0,
                    })];
            case 2:
                userAr = _a.sent();
                user = userAr[0];
                _a.label = 3;
            case 3:
                res.status(201).json({ user: user });
                return [2 /*return*/];
        }
    });
}); };
exports.getAuth = getAuth;
var getListOfSolvedGames = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pagination, listOfGames, g, dataRes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pagination = req.body.pagination;
                return [4 /*yield*/, SolvedGame_1.default.find({
                        mafId: new mongodb_1.ObjectId(req.user.mafId),
                    })];
            case 1:
                listOfGames = _a.sent();
                console.log(listOfGames);
                g = new Game_1.Game();
                return [4 /*yield*/, GameServices_1.GameServices.dataWithPagination(function () {
                        return Game_1.Game.find({
                            _id: {
                                $in: listOfGames.map(function (el) { return el.gameId; }),
                            },
                        }).sort({ lastUpdate: "desc" });
                    }, req, res)];
            case 2:
                dataRes = _a.sent();
                res.status(201).json(__assign({}, dataRes));
                return [2 /*return*/];
        }
    });
}); };
exports.getListOfSolvedGames = getListOfSolvedGames;
var getMyGames = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var currentRequest, pagination, userId, dataRes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                currentRequest = req;
                ;
                pagination = currentRequest.body.pagination;
                userId = currentRequest.user.mafId;
                return [4 /*yield*/, GameServices_1.GameServices.dataWithPagination(function () {
                        return Game_1.Game.find({ author: new mongodb_1.ObjectId(userId) }).sort({
                            lastUpdate: "desc",
                        });
                        // .select(["gameInfo"]);
                    }, req, res)];
            case 1:
                dataRes = _a.sent();
                res.status(201).json(__assign({}, dataRes));
                return [2 /*return*/];
        }
    });
}); };
exports.getMyGames = getMyGames;
var getApplicationToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, browseInfo, userSession, user, newRefreshToken, browserInfo, tokenData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                refreshToken = req.cookies["refreshToken"];
                browseInfo = (0, utils_1.getBrowserInfo)(req.headers["user-agent"]);
                console.log("browser");
                console.log(browseInfo);
                return [4 /*yield*/, UserSessions_1.default.findOne({
                        refreshToken: refreshToken,
                        device: browseInfo,
                        $where: function () {
                            return this.expireDate > Date.now() / 1000;
                        },
                    })];
            case 1:
                userSession = _a.sent();
                console.log('сессия');
                console.log(userSession);
                if (!userSession) return [3 /*break*/, 4];
                return [4 /*yield*/, User_1.default.findOne({
                        _id: new mongodb_1.ObjectId(userSession.mafId),
                    }).select(["_id", "admin", "userName", "photoUrl"])];
            case 2:
                user = _a.sent();
                newRefreshToken = TelegramServices_1.TelegramServices.createRefreshToken(userSession["mafId"]);
                browserInfo = (0, utils_1.getBrowserInfo)(req.headers["user-agent"]);
                /**
                 * Удлаяем стырый токен
                 */
                return [4 /*yield*/, UserSessions_1.default.findOneAndUpdate({
                        refreshToken: refreshToken,
                        device: browseInfo,
                        $where: function () {
                            return this.expireDate > Date.now() / 1000;
                        },
                    }, {
                        mafId: user._id,
                        refreshToken: newRefreshToken,
                        /**
                         * Время в секундах
                         */
                        expireDate: Math.floor(Date.now() / 1000) +
                            60 * 60 * 24 * env_1.REFRESH_TOKEN_EXP_TIME_DAYS,
                        device: browserInfo,
                    })];
            case 3:
                /**
                 * Удлаяем стырый токен
                 */
                _a.sent();
                /**
                 * Сохраняем новый токен в куки
                 */
                res.cookie("refreshToken", newRefreshToken, {
                    //нет доступа с фронта
                    // httpOnly: true,
                    // будут передаваться только по https
                    // secure: true,
                    //
                    // sameSite: "lax", // strict or 'Lax', it depends
                    maxAge: 60 * 60 * 24 * env_1.REFRESH_TOKEN_EXP_TIME_DAYS * 1000,
                });
                /**
                 * Добавляем новый токен
                 */
                // const refreshToken = TelegramServices.createRefreshToken(req.body.refreshToken)
                // delete user["password"];
                if (user) {
                    tokenData = (0, utils_1.generateAccessToken)(user._id);
                    res.json({
                        status: responseStatuses_1.ResponseStatuses.ok,
                        token: tokenData.token,
                        expTime: tokenData.expTime,
                        user: user,
                    });
                }
                return [3 /*break*/, 5];
            case 4:
                //удаляем все сессии
                res.json({
                    status: responseStatuses_1.ResponseStatuses.error,
                    msg: "Сессия не найдена",
                });
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getApplicationToken = getApplicationToken;
var tgRegistration = function (req, res, frontPath) { return __awaiter(void 0, void 0, void 0, function () {
    var jwt, authData, tgId, user, refreshToken, browserInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jwt = require("jsonwebtoken");
                authData = req.query;
                if (!(0, utils_1.checkTelegramAuthData)(authData)) return [3 /*break*/, 4];
                tgId = authData["id"];
                delete authData["id"];
                delete authData["hash"];
                return [4 /*yield*/, User_1.default.findOneAndUpdate({
                        tgId: tgId,
                    }, __assign(__assign({}, authData), { lastAuthTime: Date.now() }), {
                        new: true,
                        upsert: true,
                    })];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                refreshToken = TelegramServices_1.TelegramServices.createRefreshToken(user._id);
                browserInfo = (0, utils_1.getBrowserInfo)(req.headers["user-agent"]);
                return [4 /*yield*/, UserSessions_1.default.findOneAndUpdate({
                        mafId: user._id,
                        device: browserInfo,
                    }, {
                        mafId: user._id,
                        refreshToken: refreshToken,
                        /**
                         * Время в секундах
                         */
                        expireDate: Math.floor(Date.now() / 1000) +
                            60 * 60 * 24 * env_1.REFRESH_TOKEN_EXP_TIME_DAYS,
                        device: browserInfo,
                    }, {
                        new: true,
                        upsert: true,
                    })];
            case 2:
                _a.sent();
                res.cookie("refreshToken", refreshToken, {
                    //нет доступа с фронта
                    // httpOnly: true,
                    // будут передаваться только по https
                    // secure: true,
                    //
                    // sameSite: "lax", // strict or 'Lax', it depends
                    maxAge: 60 * 60 * 24 * env_1.REFRESH_TOKEN_EXP_TIME_DAYS * 1000,
                });
                res.redirect("/");
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                res.json({
                    status: responseStatuses_1.ResponseStatuses.error,
                    msg: "Проблемы с проверкой данных от телеграмма",
                });
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.tgRegistration = tgRegistration;
var exitFromAccount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, mafId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                refreshToken = req.cookies["refreshToken"];
                mafId = req.user.mafId;
                return [4 /*yield*/, UserSessions_1.default.deleteOne({
                        mafId: new mongodb_1.ObjectId(mafId),
                        refreshToken: refreshToken,
                    })];
            case 1:
                _a.sent();
                res.clearCookie("refreshToken");
                return [4 /*yield*/, res.json({
                        status: responseStatuses_1.ResponseStatuses.ok,
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.exitFromAccount = exitFromAccount;
var changeShowStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, gameId, showStatus;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.mafId;
                gameId = req.body.gameId;
                showStatus = req.body.showStatus;
                return [4 /*yield*/, Game_1.Game.findOneAndUpdate({ _id: new mongodb_1.ObjectId(gameId), author: userId }, {
                        lastUpdate: Date.now(),
                        showStatus: showStatus,
                    }, {
                        new: true,
                        upsert: true,
                    })];
            case 1:
                _a.sent();
                res.status(201).json({ status: responseStatuses_1.ResponseStatuses.ok });
                return [2 /*return*/];
        }
    });
}); };
exports.changeShowStatus = changeShowStatus;
//# sourceMappingURL=index.js.map