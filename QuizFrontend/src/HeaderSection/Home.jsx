
import style from './Home.module.css'
import Quiz from '../assets/Quiz.jpeg'
const Home = () => {
  return (
    <div className={style.body}>
      <div className={style.left}>      
        <div className={style.h1}>
        <h1>Test Your Skills. Challenge Your Friends.
       </h1> </div>
         <div>
          <h2>
          create quiz and Quick quizzes, instant feedback, and endless learning fun.
          </h2>
         </div>
         <div>
          <h4>
          Welcome to the ultimate Quiz App—a place where curiosity meets excitement! Play solo or challenge your friends and family to beat your score. Discover new facts, improve your knowledge, and have fun every time you play!
          </h4>
         </div>
        </div>       
      <div  className={style.right}><img src={Quiz} alt="" width={470}  className={style.image}/></div>
    </div>
  )
}

export default Home
