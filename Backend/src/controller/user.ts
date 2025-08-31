import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import Error  from "../helper/error"

import { ReturnResponse } from "../utils/defination"

// get userdata
const Getuser = async (req: Request, res: Response,next:NextFunction) => {
  console.log(req.userId);
  let resp: ReturnResponse;
  try {
    if (req.userId != req.params.userId) {
      const err = new Error("function not allowed");
      err.statusCode=401;
      err.data={hi:"its error"};
      throw err;
    }
    const user = await User.findById(req.params.userId, {
      fullname: 1,
      email: 1,
    }); 

    if (!user) {
     const err = new Error("No user Exist");
      err.statusCode=401;
      throw err;
    }
    resp = { status: "success", message: "Data Found", data: {user} };
    res.status(200).send(resp);
    console.log("completed this ")
  } catch (error) {
   next(error)
  }
};
// update user 
const Updatedata = async (req: Request, res: Response,next:NextFunction) => {
  let resp: ReturnResponse;
  try {
   if (req.userId != req.body._id) {
      const err = new Error("function not allowed");
            err.statusCode=401;
      throw err;
    }
    const getuser = await User.findById(req.body._id);
    if (getuser) {
      getuser.fullname = req.body.fullname;
      // You may want to save the updated user and send a response
      await getuser.save();
      resp = {
        status: "success",
        message: "User updated",
        data: { userId: getuser._id },
      };
    res.status(200).send(resp);
    } else {
     const err = new Error("no iser exist");
      err.statusCode=401;
      err.data={hi:"its error"};
      throw err;
    }
  } catch (error) {
        next(error)
  }
};
// get all the data 
const Alldata = async (req: Request, res: Response,next:NextFunction) => {
  
  try {
    const users = await User.find();
    if(!users){
         const err = new Error("User not found");
      err.statusCode=401;
      err.data={hi:"user  error"};
      throw err;
    }
     res.status(200).json({ status: "success", data: users });
  } catch (error) {
  next(error)
  }
};

export { Getuser, Updatedata, Alldata };
