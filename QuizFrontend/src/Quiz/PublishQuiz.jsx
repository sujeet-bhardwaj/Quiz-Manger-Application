import React from 'react'
import axios from 'axios'
import style from "./PublishQuiz.module.css"
import { useEffect,useState } from 'react'
import { MdOutlinePublish } from "react-icons/md";

const PublishQuiz = () => {
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
const quizPublish = async (quizId) => { 
  {console.log("are you here",quizId)}
    try {
        const dataToSend={
        quizId:quizId
      }       
      await axios.patch(`http://localhost:3000/quiz/publish`, dataToSend,{
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
       <div className={style.heading}>   <h2>Publish Quiz</h2> </div> 
       <div>     
  <ul className={style.data}>
  {quizzes
    .filter(quiz => !quiz.ispublished )
    .map(quiz => (
      <div className={style.firstquiz} key={quiz._id}>
        <li>
          {console.log(quiz.quizId)}
          <span className={style.span}>{quiz.name}</span>
          <div className={style.icons}>
            <MdOutlinePublish onClick={()=> quizPublish(quiz.quizId)} />
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


export default PublishQuiz
