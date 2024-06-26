import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import classes from "./DetailQuesAndAns.module.css";

function QuestionDetailAndAnswers() {
  const answerDom = useRef("");
  const { questionid } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const questionAndAnswer = async () => {
      try {
        const questionResponse = await axios.get(
          `/questions/get-questions/${questionid}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const answerResponse = await axios.get(
          `/answer/getanswer/${questionid}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        // console.log(questionResponse.data);
        setQuestions(questionResponse.data);

        // console.log(answerResponse.data);
        setAnswers(answerResponse.data);
      } catch (error) {
        console.log(error);
        alert(error?.response?.data?.message);
      }
    };
    questionAndAnswer();
  }, [isLoading]);

  const handleAnswer = async (e) => {
    e.preventDefault();
    const answervalue = answerDom.current.value;
    setIsLoading(true);

    try {
      await axios.post(
        `/answer/post-answers/${questionid}`,
        {
          answer: answervalue,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      alert("answer is posted");
      setIsLoading(false);
      answerDom.current.value = "";
    } catch (error) {
      alert("something went wrong");
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h4>Questions</h4>
      <div>
        {questions.map((question) => (
          <div key={question.id}>
            <h4>{question.title}</h4>
            <p>{question.description}</p>
          </div>
        ))}
      </div>
      <div>
        <hr />
        <h3>Answer from the community</h3>
        <hr />
        <div>
          {answers.map((answer) => (
            <div key={answer.answerid}>
              <h4>{answer.answer}</h4>
              <p>{answer.username}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div>
          <form className={classes.form} onSubmit={handleAnswer}>
            <h3>Answer The Top Question</h3>

            <textarea
              className={classes.Question_Des}
              ref={answerDom}
              type="text"
              placeholder="answer"
            ></textarea>
            <button className={classes.button} type="submit">
              Post Answer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default QuestionDetailAndAnswers;
