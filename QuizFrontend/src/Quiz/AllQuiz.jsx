import React from 'react'
import axios from 'axios'
import style from "./AllQuiz.module.css"
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { MyContext } from '../App';
import { useContext } from 'react';
const Allquiz = () => {
        const navigate = useNavigate();
       const {quizzes,setQuizzes}=useContext(MyContext)
      const token = localStorage.getItem("token");
const deleteQuiz = async (quizId) => {
    try {
      await axios.delete(`http://localhost:3000/quiz/${quizId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuizzes(quizzes.filter((quiz) => quiz.quizId !== quizId));
    } catch (err) {
      console.error("Error deleting quiz:", err);
    }
  };
const updatedicon = (quizId) => {
   navigate("/update", { state: { quizId} });
}
useEffect(() => {
  const fetchQuizzes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/quiz", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuizzes(res.data.data);
    } catch (err) {
      console.error("Error fetching quizzes:", err);
    }
  };
  fetchQuizzes();
}, [token]);
  return (
    <div className={style.body}>
      <div className={style.container}>
       <div className={style.heading}>   
        <h2>My Quiz</h2> </div> 
       <div>     
  <ul className={style.data}>
  {quizzes
    .filter((quiz) => quiz.ispublished === false)
    .map((quiz, index) => (
      <div key={quiz._id || index} className={style.firstquiz}>
        {console.log(quiz.quizId)}
        <li>
          <span className={style.span}>{quiz.name}</span>
          <div className={style.icons}>
            <RiDeleteBin6Line onClick={() => deleteQuiz(quiz.quizId)} />
            <MdOutlineSystemUpdateAlt
              onClick={() =>
                updatedicon(quiz.quizId) 
       
              }
            />
          </div>
        </li>
      </div>
    ))}
</ul>

      </div>
      </div>
    </div>
  )
}


export default Allquiz
