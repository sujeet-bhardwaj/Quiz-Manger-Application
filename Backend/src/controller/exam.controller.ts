import { NextFunction, Request,Response } from "express"
import Quiz from '../models/quiz.model'
import Error  from "../helper/error"
import Result from "../models/result.model"
import { ReturnResponse } from "../utils/defination"
   const startExam=async (req:Request,res:Response,next:NextFunction)=>{
 try {   
const quizId=req.params.quizId
 const quiz=await Quiz.findById(quizId,{name:1,question_list:1,ispublished:1})
   if(!quiz){
    const err=new Error("no quiz found");
     err.statusCode=404;
     throw err;
   }
   if(!quiz.ispublished){
     const err=new Error("quiz is not published")
    err.statusCode=405;
    throw err 
   }
   const resp:ReturnResponse={status:"success",message:"quiz ",data:{quiz}}
    res.status(200).send(resp)
 } catch (error) {    
  next(error)
 }
   } 
// submit exam start here 
  const submitExam=async (req:Request,res:Response,next:NextFunction)=>{
  try {
     const quizId=req.body.quizId
    const attemped_question= req.body.attemped_question;
       console.log("attemped_question",attemped_question)
  const quiz=await Quiz
  .findById(quizId,{answer:1})
  if(!quiz){
    const err=new Error("quiz not found ")
    throw err
  }
  const answer = quiz.answer;
  console.log("answer",answer)
  const allquestions = Object.keys(answer);
  console.log(allquestions)
  const total = allquestions.length;
  let score = 0;
  for(let i = 0; i < total; i++){
    let question_number = allquestions[i];
    if(!!attemped_question &&answer[question_number] === attemped_question[question_number]) {
      score++;
    }
   else{
    score--;
   }
  }
    const userId=req.userId;
   const result=new Result({userId,quizId,score,total})
    const data=await result.save(); 
   const resp:ReturnResponse={status:"success",message:"quiz submitted",data:{total,score,result:data._id}}
   console.log(data)
    res.status(201).send(resp)
  } catch (error) {
     next(error)
  }
  }
   export {startExam,submitExam}