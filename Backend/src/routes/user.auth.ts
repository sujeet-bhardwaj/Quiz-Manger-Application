import express from "express"
import {body} from 'express-validator'
import { userRegister,loginUser,isuserExist} from "../controller/user.auth"

//import {isAuthentic} from '../middlewares/isAuth'
const routes=express.Router()
import Error  from "../helper/error"
//post user 
routes.post("/",[
body('fullname').trim().not().isEmpty().isLength({min:4}).withMessage("please enter a valid name,minimum 4 character long"),
body("email").trim().isEmail().custom(async(email) => {
    return isuserExist(email).then((status:Boolean) => {
        if (status) {
         const err=new Error("user already exist")
         err.statusCode=422
         throw err
        }
        else{
              return true;
        }
        // Return true if user does not exist
    }).catch((err) => {
        return Promise.reject(err)
    })
}).normalizeEmail(),
body('password').trim().isLength({min:4}).withMessage("Enter at least 4 character long password"),
body("confirmPassword").trim().custom((value, { req }) => {
    if ( value !="" && value != req.body.password) {
        return Promise.reject("Password Mismatch");
    }
    return true;
})
],userRegister)
//post user login 
routes.post("/login",loginUser)
export default routes

