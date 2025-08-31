import express from 'express'
const router =express.Router()

import {startExam,submitExam} from '../controller/exam.controller'

import {isAuthentic} from '../middlewares/isAuth'
// get //exam /quizid

router.get("/:quizId",isAuthentic,startExam)

router.post("/",isAuthentic,submitExam)


export default router;