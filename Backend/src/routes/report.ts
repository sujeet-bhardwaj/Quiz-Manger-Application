import  Express   from "express";
import {getResult} from "../controller/report.controller";
const router=Express.Router()
import { isAuthentic } from "../middlewares/isAuth";
 
router.get("/:reportId", isAuthentic, getResult);
router.get("/", isAuthentic, getResult);


export default router 