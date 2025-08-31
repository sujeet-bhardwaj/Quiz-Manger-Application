"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
var user_1 = __importDefault(require("./routes/user"));
var mongodb_url = "mongodb+srv://workshop:Sujeet95@cluster0.uodkbg9.mongodb.net/Student";
app.use("/user", user_1.default);
mongoose_1.default.connect(mongodb_url).then(function () {
    app.listen(3000, function (error) {
        if (error) {
            console.log("error occured", error);
        }
        else {
            console.log("server is connected");
        }
    });
}).catch(function (error) {
    console.log("error occured", error);
});
