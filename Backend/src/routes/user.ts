import express from "express"

import { Getuser,Updatedata,Alldata } from "../controller/user"

import {isAuthentic} from '../middlewares/isAuth'
const routes=express.Router()



routes.get("/all",isAuthentic,Alldata)


// get data 
//user should be authenticated 
//user should be authorized 
routes.get("/:userId",isAuthentic,Getuser)




//user should be authenticated 
//user should be authorized 
// update Data 
routes.put("/",isAuthentic,Updatedata)

export default routes