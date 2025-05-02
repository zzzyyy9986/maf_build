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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose = __importStar(require("mongoose"));
var games_1 = require("./controllers/games");
var checkAdminPermission_1 = require("./middleware/checkAdminPermission");
var UserAdminStatuses_1 = require("./enums/UserAdminStatuses");
var env_1 = require("./env");
var checkAndDecodeAccessToken_1 = require("./middleware/checkAndDecodeAccessToken");
var https = require("https");
require("dotenv").config();
var app = (0, express_1.default)();
var cookieParser = require("cookie-parser");
app.use(cookieParser(env_1.COOKIE_SECRET_KEY));
var pathToFront = __dirname + "/build/";
console.log("путь к фронту");
console.log(pathToFront);
var router = express_1.default.Router();
var cors = require("cors");
var corsOptions = {};
corsOptions = {
    origin: env_1.FRONT_URL,
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
// app.use('/img',express.static(path.join(__dirname, 'public/images')));
// app.use('/js',express.static(path.join(__dirname, 'public/javascripts')));
// app.use('/css',express.static(path.join(__dirname, 'public/stylesheets')));
app.use(express_1.default.static(pathToFront));
app.use(require("express-domain-middleware"));
app.use(express_1.default.json());
app.use(cors(corsOptions));
// THIS STRING IS THE LINK TO OUR MONGODB
var url = "mongodb://localhost:".concat(env_1.DB_PORT, "/").concat(env_1.DB_NAME);
if (env_1.APP_MODE !== "DEV") {
    url = "mongodb://".concat(env_1.DB_USER, ":").concat(encodeURIComponent(env_1.DB_PASSWORD), "@").concat(env_1.DB_HOST, ":").concat(env_1.DB_PORT, "/").concat(env_1.DB_NAME);
}
console.log(url);
mongoose
    .connect(url)
    .then(function () {
    app.listen(env_1.NODE_MONGO_PORT, function () { });
    console.log("Connected");
})
    .catch(function (err) { return console.log(err); });
app.get("/", function (req, res) {
    console.log(req.url);
    // app.use(express().sta('public'))
    // res.setHeader("X-Content-Type-Options", "noSniff");
    // res.sendFile(PATH_TO_FRONT);
    res.sendFile(pathToFront + "index.html");
});
app.post("/save", [checkAndDecodeAccessToken_1.checkAndDecodeAccessToken], function (req, res) {
    return (0, games_1.saveGame)(req, res);
});
app.post("/list", [checkAndDecodeAccessToken_1.checkAndDecodeAccessToken], function (req, res) {
    return (0, games_1.getListOfGames)(req, res);
});
app.post("/getGameById", [], function (req, res) {
    return (0, games_1.getGameById)(req, res);
});
app.post("/getGameByIdForUser", [], function (req, res) {
    try {
        return (0, games_1.getGameByIdForUser)(req, res);
    }
    catch (e) {
        console.log("Ошибка!!!");
    }
});
app.post("/checkAnswer", [checkAndDecodeAccessToken_1.checkAndDecodeAccessToken], function (req, res) {
    return (0, games_1.checkAnswer)(req, res);
});
app.post("/getAuth", [checkAndDecodeAccessToken_1.checkAndDecodeAccessToken], function (req, res) {
    return (0, games_1.getAuth)(req, res);
});
app.post("/getListOfSolvedGames", [checkAndDecodeAccessToken_1.checkAndDecodeAccessToken], function (req, res) {
    return (0, games_1.getListOfSolvedGames)(req, res);
});
app.post("/getMyGames", [checkAndDecodeAccessToken_1.checkAndDecodeAccessToken], function (req, res) {
    return (0, games_1.getMyGames)(req, res);
});
app.post("/getMyGames", [checkAndDecodeAccessToken_1.checkAndDecodeAccessToken], function (req, res) {
    return (0, games_1.getMyGames)(req, res);
});
app.post("/getMailToken", [], function (req, res) {
    return (0, games_1.getApplicationToken)(req, res);
});
app.get("/getMailToken", [], function (req, res) {
    res.json({
        t: "hello",
    });
});
app.get("/telegramRegistration", [], function (req, res) {
    return (0, games_1.tgRegistration)(req, res, pathToFront + "index.html");
});
app.post("/exitFromAccount", [checkAndDecodeAccessToken_1.checkAndDecodeAccessToken], function (req, res) {
    return (0, games_1.exitFromAccount)(req, res);
});
app.post("/changeShowStatus", [checkAndDecodeAccessToken_1.checkAndDecodeAccessToken], function (req, res) {
    return (0, games_1.changeShowStatus)(req, res);
});
app.post("/game/changeShowStatus", [
    checkAndDecodeAccessToken_1.checkAndDecodeAccessToken,
    (0, checkAdminPermission_1.checkAdminPermissionWrapper)(UserAdminStatuses_1.userAdminStatuses.admin),
], function (req, res) {
    return (0, games_1.changeShowStatus)(req, res);
});
// if (APP_MODE === "DEV") {
app.listen(env_1.APP_PORT, function () { return console.log("app running on port ".concat(env_1.APP_PORT)); });
// }
// if (APP_MODE == "PROD") {
//   const privKey = fs.readFileSync(ENCR_PATH_TO_PRIV_KEY, { encoding: "utf8" });
//   const fullKey = fs.readFileSync(ENCR_PATH_TO_FULL_CHAIN, {
//     encoding: "utf8",
//   });
//   console.log(fullKey);
//   const httpsServer = https.createServer(
//     {
//       key: privKey,
//       cert: fullKey,
//     },
//     app,
//   );
//   httpsServer.listen(443, () => {
//     console.log("HTTPS Server running on port 443");
//   });
// }
exports.default = app;
//# sourceMappingURL=app.js.map