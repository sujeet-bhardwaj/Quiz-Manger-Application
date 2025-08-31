"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_controller_1 = require("../controller/user.controller");
var routes = express_1.default.Router();
routes.get("/:userId", user_controller_1.Getuser);
routes.post("/", user_controller_1.Userregister);
routes.put("/", user_controller_1.Updatedata);
exports.default = routes;
