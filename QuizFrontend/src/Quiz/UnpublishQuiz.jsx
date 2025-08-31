import React from 'react'
import axios from 'axios'
import style from "./UnpublishQuiz.module.css"
import { useEffect,useState } from 'react'
import { MdOutlinePublish } from "react-icons/md";

const UnpublishQuiz = () => {
    const [quizzes, setQuizzes] = useState([]);
      const token = localStorage.getItem("token");
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
       const quizUnPublish = async (quizId) => {
      try {
        const dataToSend={
        quizId:quizId
      }       
      await axios.patch(`http://localhost:3000/quiz/unpublish`, dataToSend,{
        headers: { Authorization: `Bearer ${token}` }
      });
        fetchQuizzes();
    } catch (err) {
      console.error("Error deleting quiz:", err);
    }
  };
useEffect(() => {
  fetchQuizzes();
}, [token]);
  return (
    <div className={style.body}>
      <div className={style.container}>
       <div className={style.heading}>  
         <h2> UnPublish Quiz</h2> </div> 
       <div>     
 <ul className={style.data}>
  {quizzes
    .filter((quiz) => quiz.ispublished ) // only published quizzes
    .map((quiz) => (

      
      <li key={quiz.quizId} className={style.firstquiz}>
        <span className={style.span}>{quiz.name}</span>
        <div className={style.icons}>
          <MdOutlinePublish onClick={() => quizUnPublish(quiz.quizId)} /> 
      
         </div>     
      </li>
    ))}
</ul>

      </div>
      </div>
    </div>
  )
}


export default UnpublishQuiz
