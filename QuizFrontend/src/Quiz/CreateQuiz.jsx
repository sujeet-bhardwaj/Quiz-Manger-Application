import style from "./CreateQuiz.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MyContext } from "../App";
import { useContext } from 'react';
import axios from "axios";
const CreateQuiz = () => {
   const {setQuizData } = useContext(MyContext);
  const navigate = useNavigate();
  const [quizName, setquizName] = useState("");
  const [questionName, setquestionName] = useState("");
  const [questionNumber, setQuestionNumber] = useState("");
  const [optionA, setoptionA] = useState("");
  const [optionB, setoptionB] = useState("");
  const [optionC, setoptionC] = useState("");
  const [optionD, setoptionD] = useState("");
  const [answer, setAnswer] = useState("");

  const quizCreated = () => {
    const dataobject = {
      name: quizName,
      question_list: [
        {
          question_number: Number(questionNumber),
          question: questionName,
          options: {
            a: optionA,
            b: optionB,
            c: optionC,
            d: optionD,
          },
        },
      ],
     answer:{
     [Number(questionNumber)]:answer
     }
    };
setQuizData(dataobject)

 const token = localStorage.getItem("token"); // get saved token

  axios.post("http://localhost:3000/quiz", dataobject, {
    headers: {
      Authorization: `Bearer ${token}`,   // send token to backend
    },
  })
    .then((res) => {
      setquizName("");
      setquestionName("");
      setQuestionNumber("");
      setoptionA("");
      setoptionB("");
      setoptionC("");
      setoptionD("");
      setAnswer("");
      alert("Quiz created successfully");
    })
    .catch((err) => console.log(err));

  };
  const goNext = () => {
   const dataobject = {
      name: quizName,
      question_list: [
        {
        question_number: Number(questionNumber),
          question: questionName,
          options: {
            a: optionA,
            b: optionB,
            c: optionC,
            d: optionD,
          },
        },
      ],
    answer: { [Number(questionNumber)]: answer }
    };
  setQuizData(dataobject)
  setquizName("")
setquestionName("")
setQuestionNumber("")
setoptionA("")
setoptionB("")
setoptionC("")
setoptionD("")
setAnswer("")
     navigate("/nextquiz");
  };

  const changeHandler = (e) => {
    if (e.target.id === "quizName") {
      setquizName(e.target.value);
    }
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
          <div className={style.heading}>
            <input
              type="text"
              placeholder="enter your quiz name"
              id="quizName"
              value={quizName}
              onChange={changeHandler}
            />
          </div>
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
                value={questionName}
                onChange={changeHandler}
              />
            </div>
        
            <div className={style.option}>
              <div className={style.optiona}>
                <label htmlFor="optionA">A:</label>
                <input
                  type="text"
                  id="optionA"
                  value={optionA}
                  onChange={changeHandler}
                />
                <label htmlFor="optionB">B:</label>
                <input
                  type="text"
                  id="optionB"
                  value={optionB}
                  onChange={changeHandler}
                />
              </div>
              <div className={style.optionb}>
                <label htmlFor="optionC">C:</label>
                <input
                  type="text"
                  id="optionC"
                  value={optionC}
                  onChange={changeHandler}
                />
                <label htmlFor="optionD">D:</label>
                <input
                  type="text"
                  id="optionD"
                  value={optionD}
                  onChange={changeHandler}
                />
              </div>
            </div>
          </div>
          <div className={style.answer}>
            <span>Answer:</span>
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
export default CreateQuiz;
