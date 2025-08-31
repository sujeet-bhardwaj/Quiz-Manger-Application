import React from 'react'
import axios from 'axios'
import style from "./Practice.module.css"
import { useEffect,useState } from 'react'
import { VscDebugStart } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
const Practice= () => {
  const navigate = useNavigate();
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
  const StartQuiz = (quizId) => {
  navigate("/start", { state: { quizId } });
};
useEffect(() => {
  fetchQuizzes();
}, [token]);
  return (
    <div className={style.body}>
      <div className={style.container}>
       <div className={style.heading}>  
         <h2> Practice Quiz</h2></div> 
       <div>     
 <ul className={style.data}>
  {quizzes
    .filter((quiz) => quiz.ispublished) // only published quizzes
    .map((quiz) => (
      <li key={quiz.quizId} className={style.firstquiz}>
        <span className={style.span}>{quiz.name}</span>
        <div className={style.icons}>
          <VscDebugStart onClick={() => StartQuiz(quiz.quizId)} /> 
            {console.log(quiz)}
         </div>     
      </li>
    ))}
</ul>
      </div>
      </div>
    </div>
  )
}
export default Practice
