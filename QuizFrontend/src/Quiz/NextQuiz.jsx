import React from "react";
import style from "./NextQuiz.module.css";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../App";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios";
const NextQuiz = () => {
    const [questionName, setquestionName] = useState("");
  const [questionNumber, setQuestionNumber] = useState("");
  const [optionA, setoptionA] = useState("");
  const [optionB, setoptionB] = useState("");
  const [optionC, setoptionC] = useState("");
  const [optionD, setoptionD] = useState("");
  const [answer, setAnswer] = useState("");
  const { quizData,setQuizData } = useContext(MyContext);
  const navigate = useNavigate();
 const quizCreated = () => {
   const dataobject = {
    name:quizData.name,
  question_list: [
    ...quizData.question_list, 
    {
      question_number: questionNumber,
      question: questionName,
      options: {
        a: optionA,
        b: optionB,
        c: optionC,
        d: optionD,
      },
    },
  ],
  answer: {
    ...quizData.answer,
    [questionNumber]: answer,
  },
};
setQuizData(dataobject)
 const token = localStorage.getItem("token");
     axios.post("http://localhost:3000/quiz", dataobject, {
    headers: {
      Authorization: `Bearer ${token}`,   // send token to backend
    },
  })
.then((res) => {
setquestionName("")
setQuestionNumber("")
setoptionA("")
setoptionB("")
setoptionC("")
setoptionD("")
setAnswer("")
alert("quiz created succesfully") 
}).catch((err)=>console.log(err))
  };
  // next page
  const goNext = () => {
   const dataobject = {
  question_list: [
    ...quizData.question_list, 
    {
      question_number: questionNumber,
      question: questionName,
      options: {
        a: optionA,
        b: optionB,
        c: optionC,
        d: optionD,
      },
    },
  ],
  answer: {
    ...quizData.answer,
    [questionNumber]: answer,
  },
};
console.log(dataobject)

setQuizData(dataobject)  
setquestionName("")
setQuestionNumber("")
setoptionA("")
setoptionB("")
setoptionC("")
setoptionD("")
setAnswer("")
navigate("/nextquiz")
  }

    const changeHandler = (e) => {
      if (e.target.id === "questionName") {
        setquestionName(e.target.value);
      }
      if (e.target.id === "questionNumber") {
        setQuestionNumber(e.target.value);
      }
      if (e.target.id === "optionA") {
        setoptionA(e.target.value);
      }
      if (e.target.id === "optionB") {
        setoptionB(e.target.value);
      }
      if (e.target.id === "optionC") {
        setoptionC(e.target.value);
      }
      if (e.target.id === "optionD") {
        setoptionD(e.target.value);
      }
      if (e.target.id === "answer") {
        setAnswer(e.target.value);
      }
    };

  return (
    <>
      <div className={style.body}>
        <div className={style.container}>
          <div className={style.input}>
            <div className={style.questionnumber}>
              <input
                type="number"
                placeholder="Question number"
                id="questionNumber"
                value={questionNumber}
                onChange={changeHandler}
              />
            </div>
            <div className={style.questionname}>
              <input
                type="text"
                placeholder="enter your Question Name"
                id="questionName"
                onChange={changeHandler}
                value={questionName}
              />
            </div>
            <div className={style.option}>
              <div className={style.optiona}>
                <label htmlFor="optionA">A:</label>
                <input type="text" id="optionA" value={optionA} onChange={changeHandler} />
                <label htmlFor="optionB">B:</label>
                <input type="text" id="optionB" value={optionB}  onChange={changeHandler} />
              </div>
              <div className={style.optionb}>
                <label htmlFor="optionC">C:</label>
                <input type="text" id="optionC" value={optionC} onChange={changeHandler} />
                <label htmlFor="optionD">D:</label>
                <input type="text" id="optionD" value={optionD} onChange={changeHandler} />
              </div>
            </div>
          </div>
          <div className={style.answer}>
            <span>answer:</span>
            <input type="text" id="answer" value={answer} onChange={changeHandler} />
          </div>

          <div className={style.button}>
            <button onClick={goNext}>Next</button>
            <button onClick={quizCreated}>Create Quiz</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default NextQuiz;
