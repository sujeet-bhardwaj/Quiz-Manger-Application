import express from "express"
import mongoose  from "mongoose"
const app=express()
app.use(express.json())
import cors from "cors";
app.use(cors());
import path from 'path'
import { Response,Request,NextFunction } from "express"
import userroutes from './routes/user'
import authrouter from './routes/user.auth'
import examRoute from './routes/exam'
import quizRoute from './routes/quiz'
const mongodb_url=process.env.LOCAL_STRING || "";
import ProjectError from "./helper/error"
import reportRoute from './routes/report'

import { isAuthentic } from "./middlewares/isAuth"
import Usermodel from './models/user.model'

app.use(express.static(path.join(__dirname, "public")));
declare global{
     namespace Express{
       interface Request{
        userId: String
        email?: String
       }
     }
}
interface ReturnResponse{
   status:"success"|"error",
   message:String,
   data:{}|[]
}
// redirect user route
app.use("/user", userroutes)
// redirect auth route 
app.use("/auth",authrouter)
app.use("/exam",examRoute)
//redirect quiz route
app.use("/quiz",quizRoute)
// redirect report route
app.use("/report",reportRoute)

//profile pic 
import multer from 'multer'
const storage=multer.memoryStorage();
const upload =multer({storage})

app.get("/updateprofile/profile",isAuthentic,async(req,res)=>{
  try {
       const userId = req.userId;
    const user=await Usermodel.findById(userId)
 
    if(!user){
      res.status(404).json({ message: "User not found" });
    }
    if(user){
     res.json({ message: "profile data is here", data: {name:user.fullname,email:user.email} });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" });
  }
})
app.post("/upload",isAuthentic,upload.single("image"),async(req:Request,res:Response)=>{
  try {
     const userId = req.userId;
     console.log(req.file)
       const image=req.file?req.file.buffer.toString('base64'):"default.png"

        const updatedUser = await Usermodel.findByIdAndUpdate(
            userId,
              {profilepic:image},
             { new: true } 
        );
        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "Profile picture updated", user: updatedUser });
  } catch (error) {
     console.error(error);
        res.status(500).json({ message: "Server error" });
  }  
})
app.use((err: ProjectError, req: Request, res: Response, next: NextFunction) => {
  // Default values
  const statusCode = typeof err.statusCode === "number" && err.statusCode < 500 ? err.statusCode : 500;
  const message =
    statusCode < 500
      ? err.message || "Something went wrong"
      : "Something went wrong. Please try again later.";

  const resp: ReturnResponse = {
    status: "error",
    message,
    data: err.data || {}, // use empty object if no error data
  };

  console.log("Error caught:");
  console.log("Status:", statusCode);
  console.log("Message:", message);

  res.status(statusCode).send(resp);
});

mongoose.connect(mongodb_url).then((
)=>{
app.listen(process.env.PORT||8080,(error:any)=>{
    if(error){
        console.log("error occured",error)
    }
  else{
    console.log("server is connected")
  }
})

}).catch((error)=>{
   console.log("error occured",error)
})





