import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import axios from 'axios';
import style from './UpdatePage.module.css'

const UpdatePage = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const { quizId } = location.state || {};

  const [data, setdata] = useState(null);
  const [name, setname] = useState("");
  const [questionlist,setquestion]=useState("")
  const [answer, setAnswer] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/quiz/${quizId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setdata(response.data.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setname(data.name);
      setquestion(data.question_list)
      setAnswer(data.answer)
    }
  }, [data]);

  const handleSave = async() => {
   try {
     const datatosend={
       _id:quizId,
       name:name,
       answer:answer,
       question_list:questionlist
     }
    const response = await axios.put(
        "http://localhost:3000/quiz",datatosend,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("quiz is updated")
   } catch (error) {
    console.log("error is ",error)
   }      
  }
  return (
    <div className={style.body}>
      <div className={style.container}>
         <div className={style.title}>Update Page</div>
        <div className={style.quizname}>
          <label htmlFor="name">Quiz Name:</label>
          <input
            type="text"
            value={name}
            id="name"
            onChange={(e) => setname(e.target.value)}
          />
          </div>
<ul className={style.questionlist}>
  {Array.isArray(questionlist) &&
    questionlist.map((q, index) => (
      <li key={q.question_number || index}>

        <div className={style.common}>
          <label htmlFor="questionnumber">Question Number:</label>
          <input type="number" 
         value={q?.question_number||"" }id="questionnumber"
        />  
        </div>

        <div className={style.common}>
          <label htmlFor="questionname">Question Name:</label>
           <input
          type="text"  id="questionname"
          value={q.question || ""}
          onChange={(e) => {
            const updated = [...questionlist];
            updated[index].question = e.target.value;
            setquestion(updated);
          }}
        />
        </div>

        {/* option A */}
         <div className={style.common}>
          <label htmlFor="optiona">Option A:</label>
                   <input
          type="text"  id="optiona"
          value={q.options?.a || ""}
          onChange={(e) => {
            const updated = [...questionlist];
            updated[index].options = { ...updated[index].options, a: e.target.value };
            setquestion(updated);
          }}
        />
         </div>
      
{/* option B */}
    <div className={style.common}>
      <label htmlFor="optionb">Option B:</label>
               <input
          type="text"  id="optionb"
          value={q.options?.b || ""}
          onChange={(e) => {
            const updated = [...questionlist];
            updated[index].options = { ...updated[index].options, b: e.target.value };
            setquestion(updated);
          }}
        />

         </div>

{/* option C */}
             <div className={style.common}>
              <label htmlFor="optionc">Option C:</label>
                  <input
          type="text"  id="optionc"
          value={q.options?.c || ""}
          onChange={(e) => {
            const updated = [...questionlist];
            updated[index].options = { ...updated[index].options, c: e.target.value };
            setquestion(updated);
          }}
        />
         </div>

{/* option D */}
    <div className={style.common}>
      <label htmlFor="optiond">Option D:</label>
              <input
          type="text" id="optiond"
          value={q.options?.d || ""}
          onChange={(e) => {
            const updated = [...questionlist];
            updated[index].options = { ...updated[index].options, d: e.target.value };
            setquestion(updated);
          }}
        />
         </div>

   
        <div className={style.common}>
          <label htmlFor="answer">Answer:</label>
            <input
      type="text" id="answer"
      value={answer?.[q.question_number] || ""}
      onChange={(e) => {
        setAnswer({
          ...answer,
          [q.question_number]: e.target.value
        });
      }}
    />
         </div>
      </li>
    ))}
</ul>
<div className={style.button}>
          <button onClick={handleSave} className={style.buttons}>Update Save</button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
