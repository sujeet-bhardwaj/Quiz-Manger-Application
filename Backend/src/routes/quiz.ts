import express from 'express'
import {isAuthentic} from '../middlewares/isAuth'
import { getQuiz,updateQuiz,deleteQuiz,createQuiz,publishQuiz,UnpublishQuiz,getAllQuiz } from '../controller/quiz.controller'
const router =express.Router()
import {body} from 'express-validator'
// create 
// post/quiz
router.post("/",isAuthentic,[body('name').trim().not().isEmpty().isLength({min:10}).withMessage("please enter a valid name,minimum 10 character long"),body("question_list").custom((question_list)=>{
    if(question_list.length===0){
        return Promise.reject("enter at least 1 question ")
    }
    return true 
}),body("answer").custom((answer)=>{
  if(Object.keys(answer).length===0){
        return Promise.reject("enter at least 1 answer ")
    }
    return true
})],createQuiz)

// get quiz
// all get quiz
router.get("/:quizId",isAuthentic,getQuiz)

// update Quiz
// PUT/quiz
router.put("/",isAuthentic,[body('name').trim().not().isEmpty().isLength({min:10}).withMessage("please enter a valid name,minimum 10 character long"),body("question_list").custom((question_list)=>{
    if(question_list.length===0){
        return Promise.reject("enter at least 1 question ")
    }
    return true 
}),body("answer").custom((answer)=>{
  if(Object.keys(answer).length===0){
        return Promise.reject("enter at least 1 answer ")
    }
    return true
})],updateQuiz)
// delete 
// delete quiz 
router.delete("/:quizId",isAuthentic,deleteQuiz) 
// publish 
// 
router.patch("/publish",isAuthentic,publishQuiz)
// unpublish quiz 
router.patch("/unpublish",isAuthentic,UnpublishQuiz)
// get all quiz created by individual user 
router.get("/",isAuthentic,getAllQuiz)



export default router 