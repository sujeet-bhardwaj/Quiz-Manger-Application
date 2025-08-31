import { Request,Response,NextFunction } from 'express'
  import jwt from "jsonwebtoken";
  import Error  from "../helper/error"


const isAuthentic=async(req:Request,res:Response,next:NextFunction)=>{

try {
      const authheader=req.get("Authorization")
 if(!authheader){
  const err=new Error("not authenticated ")
  throw err  
 }
  const token=authheader.split(" ")[1];
  console.log(token)
try {
  //verify   from backend and  frontend 
  const decodetoken = <any>jwt.verify(token, process.env.JWT_TOKEN || "");
  console.log(decodetoken);
  if (!decodetoken) {
    const err = new Error("not authenticated ");
    throw err;
  }
  (req as any).userId = decodetoken.userId;
  console.log(req.userId)
   console.log("completed middleware")
  next()
} catch (error) {
next(error)
}
} catch (error) {
  next(error)
}
  }






// extra middle ware 

  const jwtAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
       const err = new Error("authenticated error");
      err.statusCode=401;
      throw err;
    }
    try {
      const token = authHeader.split(' ')[1];


      if (!token) {
          const err = new Error("authenticated error");
      err.statusCode=401;

      throw err;
      }
      //verfiy token generate 
   
      const decode = jwt.verify(token, process.env.JWT_TOKEN || "");
      (req as any).jwtpayload = decode;
      console.log(req)
      return next();
    } catch (error) {
   next(error)
    }
  }

  //function to generate token 
const generateToken=(userData:any)=>{
    return jwt.sign(userData,process.env.JWT_TOKEN||"");
}
//login routes 
  export { isAuthentic,jwtAuthMiddleware,generateToken}