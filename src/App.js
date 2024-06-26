import { Route, Routes, Outlet, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useEffect, useState, createContext } from "react";
// import { changeUser } from "../../db/dbConfig";
import axios from "./axiosConfig";
import AskQuestion from "./pages/AskQuestion/Askquestion";
import QuestionDetailAndAnswers from "./pages/QuestionDetailAndAnswers/QuestionDetailAndAnswers";
import Header from "./pages/header/Header";
import Footer from "./pages/footer/Footer";

export const AppState = createContext();

function App() {
  const [user, setuser] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setuser(data);
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppState.Provider value={{ user, setuser }}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header /> <Outlet />
              <Footer />
            </>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/askQuestion" element={<AskQuestion />} />
          <Route path="/:questionid" element={<QuestionDetailAndAnswers />} />
        </Route>
      </Routes>
    </AppState.Provider>
  );
}

export default App;
