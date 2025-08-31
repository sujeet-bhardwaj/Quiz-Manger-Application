import { NextFunction, Request,Response } from "express";
import Quiz from "../models/quiz.model";
import Error from '../helper/error'
import {validationResult} from "express-validator"
import { ReturnResponse } from "../utils/defination"
 const createQuiz=async(req:Request,res:Response,next:NextFunction)=>{
try { 
       const validatonError=validationResult(req)
      if(!validatonError.isEmpty()){
          const err=new Error("validation now  failed");
          err.statusCode=422;
          err.data=validatonError.array()
          throw err
        }
        
const  created_by=req.userId;
  const name=req.body.name;
  const question_list=req.body.question_list;
  const answer=req.body.answer
  const answerlength=Object.keys(answer).length
  const checkArr:any=[];
question_list.forEach((obj: { question: any; })=> {
  checkArr.push(obj.question)
});
const unique = new Set(checkArr);

if (unique.size !== checkArr.length) {
    const err=new Error("Duplicate questions found");
          err.statusCode=422;   
   throw err
}
if(unique.size!==answerlength){
   const err=new Error("number of question and answer should be equal");
          err.statusCode=422;   
   throw err
}

const quiz = new Quiz({ name, question_list, answer, created_by });
const result = await quiz.save();

const resp:ReturnResponse={status:"success",message:"quiz created succesfully",data:{quizId:result._id,quizname:name}}
    res.status(201).send(resp)
} catch (error) {
     next(error)
}
 }
//  get quiz here 
 const getQuiz=async(req:Request,res:Response,next:NextFunction)=>{
 try {
 const quizId=req.params.quizId
   const quiz= await Quiz.findById(quizId,{name:1,question_list:1,answer:1,created_by:1})
   if(!quiz){
      const err=new Error("quiz is not find ")
      err.statusCode=404
      throw err
   }
   if(!quiz.created_by || req.userId !== quiz.created_by.toString()){
        const err=new Error("not authorized person")
      err.statusCode=403
      throw err
   }
const resp:ReturnResponse={status:"success",message:"get data succesfully",data:quiz}
    res.status(201).send(resp)

 } catch (error) {
     next(error)
 }
}
// update start here 
 const updateQuiz=async(req:Request,res:Response,next:NextFunction)=>{
  try {
         const validatonError=validationResult(req)
      if(!validatonError.isEmpty()){
          const err=new Error("validation now  failed");
          err.statusCode=422;
          err.data=validatonError.array()
          throw err
        }
    const quizId=req.body._id
   const quiz=await Quiz.findById(quizId)

      if(!quiz){
      const err=new Error("quiz is not find ")
      err.statusCode=404
      throw err
   }
      if(!quiz.created_by || req.userId !== quiz.created_by.toString()){
        const err=new Error("not authorized person")
      err.statusCode=403
      throw err
   }
    if(quiz.ispublished){     
       const err=new Error("You cannot published ,public quiz")
      err.statusCode=405
      throw err
    }
   quiz.name=req.body.name;
   quiz.question_list=req.body.question_list
   quiz.answer=req.body.answer
  await quiz.save()
const resp:ReturnResponse={status:"success",message:"quiz updated  succesfully",data:{}}
    res.status(201).send(resp)
  } catch (error) {
    next (error)
  } 
}
// delte quiz start here 
 const deleteQuiz=async(req:Request,res:Response,next:NextFunction)=>{
try {
    const quizid=req.params.quizId
    const quiz=await Quiz.findById(quizid)
    if(!quiz){
        const err=new Error("quiz is not find ")
        err.statusCode=404
        throw err
    }
    if(!quiz.created_by || req.userId !== quiz.created_by.toString()){
        const err=new Error("not authorized person")
      err.statusCode=403
      throw err
    }
 if(quiz.ispublished){   
       const err=new Error("You cannot delete ,public quiz")
      err.statusCode=405
      throw err
    }
     await Quiz.deleteOne({_id:quizid})
   const resp:ReturnResponse={status:"success",message:"quiz deleted  succesfully",data:{}}
    res.status(201).send(resp)
} catch (error) {
     next(error)
}  
}
// publish quiz start here 
 const publishQuiz=async(req:Request,res:Response,next:NextFunction)=>{
  try {    
const quizId=req.body.quizId
 const quiz=await Quiz.findById(quizId)
  console.log(quiz)
   if(!quiz){
      const err=new Error("quiz is not find ")
      err.statusCode=404
      throw err
   }
     if(quiz?.ispublished){
       const err=new Error("quiz is already pulished")
      err.statusCode=404
      throw err
  }
    if(!quiz.created_by || req.userId !== quiz.created_by.toString()){
          const err=new Error("not authorized person")
        err.statusCode=403
        throw err
    }
    //  const numberofQuestion=quiz?quiz.question_list.length:null 
    //    if(numberofQuestion==null ||numberofQuestion<5){
    //            const err=new Error(" number of question  should be at least 5 ")
    //             err.statusCode=404
    //         throw err
    //    }
 
quiz.ispublished = true;
  await quiz.save()
   const resp:ReturnResponse={status:"success",message:"quiz published",data:{}}
    res.status(201).send(resp)
  } catch (error) {
     next(error)
  }
}
 const UnpublishQuiz=async(req:Request,res:Response,next:NextFunction)=>{

  try {
const quizId=req.body.quizId
 const quiz=await Quiz.findById(quizId)
  console.log(quiz)
   if(!quiz){
      const err=new Error("quiz is not find ")
      err.statusCode=404
      throw err
   }
     if(quiz.ispublished===false){
       const err=new Error("quiz is not pulished,if not publish then not work")
      err.statusCode=404
      throw err
  }
    if(!quiz.created_by || req.userId !== quiz.created_by.toString()){
          const err=new Error("not authorized person")
        err.statusCode=403
        throw err
    }
quiz.ispublished = false;
  await quiz.save()
   const resp:ReturnResponse={status:"success",message:"quiz Unpublished",data:{}}
    res.status(201).send(resp)
  } catch (error) {
     next(error)
  }
}
 const getAllQuiz=async(req:Request,res:Response,next:NextFunction)=>{
 try {
      const quizzes = await Quiz.find();  
    if(!quizzes){
        const err=new Error("quiz not found")
      err.statusCode=404
      throw err
  }
const Allquiz: Array<any> = [];
quizzes.forEach(quiz => {
if (quiz.created_by && req.userId === quiz.created_by.toString()) {
       console.log("quiz",quiz)
     Allquiz.push({name:quiz.name,question:quiz.question_list,answer:quiz.answer,quizId:quiz._id,ispublished:quiz.ispublished})
}
});
 console.log(Allquiz)
const resp:ReturnResponse={status:"success",message:"get data succesfully",data:Allquiz}
    res.status(201).send(resp)

 } catch (error) {
     next(error)
 }
 
}









export {createQuiz,getQuiz,updateQuiz,deleteQuiz,publishQuiz,UnpublishQuiz,getAllQuiz}