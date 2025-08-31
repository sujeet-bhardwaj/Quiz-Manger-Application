
import style from './StartExam.module.css'
import { useLocation } from "react-router-dom";
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const StartExam = () => {
      const navigate = useNavigate();
    const [exam,setExam]=useState([])
    const [answer,setanswer]=useState(null)
  const location = useLocation();
  const { quizId } = location.state;
    const token = localStorage.getItem("token");
       const fetchQuizzes = async () => {
    try {
     const res = await axios.get(`http://localhost:3000/quiz/${quizId}`, {
  headers: { Authorization: `Bearer ${token}` }
});
      setExam(res.data.data);
    } catch (err) {
      console.error("Error fetching quizzes:", err);
    }
  };
useEffect(() => {
  fetchQuizzes();
}, [token]);
 const changeHandler=(question_number,e)=>{
    setanswer({...answer,
        [question_number]:e.target.value
    })
 } 
 const SubmitExam=async(quizId)=>{
   try{
      const datatosend={
        quizId:quizId,
        attemped_question:answer
      }
   const res = await axios.post("http://localhost:3000/exam",datatosend,{
  headers: { Authorization: `Bearer ${token}` }
});
console.log(res.data.data)
navigate("/report",{state:res.data.data})
   }
catch{
console.error("Error fetching quizzes:", err);
}
 }
  return( 
  <div className={style.body}>
     <div className={style.container}>
  <div> <span>Quiz Name:</span>{exam.name}</div>
<div>
  {exam && exam.question_list ? (
    exam.question_list.map((quiz, index) => (
        <>
          <div key={index}> <span className={style.span}>Question Number:</span>{quiz.question_number
}</div>
      <div ><span>Question Name</span> {quiz.question}</div>
       <div><span>Option A:</span> {quiz.options.a}</div>
    <div ><span>Option B:</span> {quiz.options.b}</div>
        <div><span>Option C:</span> {quiz.options.c}</div>
            <div> <span>Option D:</span>{quiz.options.d}</div>
           <div className={style.answer}>
<label htmlFor="answer">Answer:</label>
<input 
  type="text" 
  onChange={(e) => changeHandler(quiz.question_number, e)} 
  id="answer" 
/>
  </div>
        </>
    ))
  ) : (
    <p>Loading...</p>
  )}
</div>
   <div className={style.button}>
         <button onClick={()=>SubmitExam(quizId)} className={style.buttons}>Submit Quiz</button>
          </div>
          </div>
</div>
)};

export default StartExam
