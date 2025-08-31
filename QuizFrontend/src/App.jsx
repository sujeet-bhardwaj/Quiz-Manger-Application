
import Navbar from './Navbar/Navbar'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './HeaderSection/Home';
import { useState } from 'react';
import {createContext, useContext } from 'react';
import SignUp from './HeaderSection/SignUp';
import Signin from './HeaderSection/Signin';
import Practice from './Exam/Practice';
import QuizLayout from './Quiz/QuizLayout';
import Allquiz from './Quiz/AllQuiz';
import CreateQuiz from './Quiz/CreateQuiz';
import UpdatePage from './Quiz/UpdatePage';
import PublishQuiz from './Quiz/PublishQuiz';
import UnpublishQuiz from './Quiz/UnpublishQuiz';
import Profile from './Profile/Profile';
import NextQuiz from './Quiz/NextQuiz';
import StartExam from './Exam/StartExam';
import Report from './Report/Report';
import Logout from './HeaderSection/Logout';
import UpdateProfile from './Profile/UpdateProfile';
 export const MyContext = createContext();
const App = () => {
     const [login, setlogin] = useState(() => {
    const token = localStorage.getItem("token");
    return !!token;
  });
    const [userId,setuserId]=useState("")
    const [quizData, setQuizData] = useState(null);
     const [quizzes, setQuizzes] = useState([]);
   
  return (
    <BrowserRouter>
     <MyContext.Provider value={{ login, setlogin,quizData, setQuizData,quizzes,setQuizzes,userId,setuserId}}>
       <Navbar></Navbar>
       <Routes>
          <Route path="/" element={<Home></Home>} />
  <Route path="/quiz" element={<QuizLayout />}>
        {/* Child Routes */}
        <Route path="create" element={<CreateQuiz />} />
        <Route path="all" element={<Allquiz />} />
        <Route path="publish" element={<PublishQuiz />} />
        <Route path="unpublish" element={<UnpublishQuiz />} />
      </Route>
      <Route path="/practice" element={<Practice></Practice>} />
        <Route path="/login" element={<Signin></Signin>} />
          <Route path="/register" element={<SignUp></SignUp>} />
              <Route path="/profile" element={<Profile></Profile>} />
  <Route path="/nextquiz" element={<NextQuiz />} />
  <Route path="/update" element={<UpdatePage />} />
    <Route path="/start" element={<StartExam />} />
     <Route path="/report" element={<Report />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/updateprofile" element={<UpdateProfile />} />
       </Routes>
         </MyContext.Provider>
    </BrowserRouter>
  )
}
export default App
