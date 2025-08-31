import React from 'react'
import style from './Report.module.css'
import { useLocation } from "react-router-dom";
const Report = () => {
   const location = useLocation(); 
  const reportData = location.state; 
      console.log(reportData)
  return (
         < div className={style.body}><div className={style.container}>
          <div className={style.title}>Report is here</div>
        <div>Total Score:{reportData.total}</div>
          <div>your  Score:{reportData.score}</div>  
    </div>
    </div>
  )
}
export default Report
   