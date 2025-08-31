import { NextFunction, Request,Response } from 'express';
import  Result from '../models/result.model' 
import  Error  from '../helper/error';

import { ReturnResponse } from "../utils/defination"

  const getResult=async(req:Request,res:Response,next:NextFunction)=>{
     let report;  
    try {
        if(!!req.params.reportId){
  const id=req.params.reportId;
            report =await Result.findById(id);
  if(report && report.userId.toString()!==req.userId){
     const err=new Error("you are not allowed")
        err.statusCode=404
        throw err
     }


        }
  else{
     report =await Result.find({userId:req.userId})

  }
        
      if(!report){
        const err=new Error("report not found")
        err.statusCode=404
        throw err
      }
   
         const resp:ReturnResponse={status:"success",message:"Report submit",data:{report}}
    res.status(201).send(resp)   
       } catch (error) {
          next(error)
       }

  }

  export { getResult}