import { useContext, useEffect, useState } from "react";
import { AppState } from "../../App";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { FaRegUser } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

function Home() {
  const { user } = useContext(AppState);
  const [question, setQuestion] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getQuestion = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`/questions/get-questions`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        // console.log(response.data)
        setQuestion(response.data);
      } catch (error) {
        console.log(error);
        alert(error?.response?.data?.message);
      }
    };
    getQuestion();
  }, []);

  const handleQuestion = () => {
    navigate("/askQuestion");
  };

  const handleDetailQuestion = (questionid) => {
    navigate(`${questionid}`);
  };

  return (
    <div className="container">
      <div className="message">
        <div>
          <h2>Welcome : {user?.username}</h2>
        </div>
        <div>
          <button onClick={handleQuestion}>Ask Question</button>
        </div>
      </div>
      <div>
        <h3>Questions</h3>
        {question.map((questions) => (
          <div
            className="question-item"
            onClick={() => handleDetailQuestion(questions.questionid)}
            key={questions.id}
          >
            <div className="user-area">
              <FaRegUser className="user_icon" />
              <p>{questions?.username}</p>
            </div>
            <div className="title">
              <h4>{questions?.title}</h4>
            </div>
            <div>
              <FaChevronRight />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
