import React, { useRef } from "react";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Ask.module.css";

function AskQuestion() {
  const titleDom = useRef();
  const descriptionDom = useRef();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  async function handlePost(e) {
    e.preventDefault();

    const titlevalue = titleDom.current.value;
    const descriptionvalue = descriptionDom.current.value;

    if (!titlevalue || !descriptionvalue) {
      alert("please provide all required information");
      return;
    }
    try {
      await axios.post(
        "/questions/all-questions",
        {
          title: titlevalue,
          description: descriptionvalue,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      navigate("/");
      alert("question is posted");
    } catch (error) {
      alert("something went wrong");
      console.log(error);
    }
  }

  return (
    <div className={classes.main_container}>
      <div>
        <div className={classes.description}>
          <div className={classes.list_title}>
            <h3>Steps to write a good question</h3>
          </div>
          <div>
            {" "}
            <ul>
              <li>Summerize your problem in a one-line title</li>
             
              <li>Describe your problem in more detail</li>
              <li>Describe what you tried and what you expected to happen</li>
              <li>Review your question and post it to the site</li>
            </ul>
          </div>
        </div>{" "}
                  
      </div>
      <div className={classes.container}>
        <form onSubmit={handlePost} className={classes.form}>
          <h2>Ask Public Question</h2>

          <input
            ref={titleDom}
            type="text"
            placeholder="title"
            size="180"
            className={classes.title_area}
          ></input>

          <textarea
            ref={descriptionDom}
            type="text"
            placeholder="description"
            rows="9"
            cols="90"
            className={classes.description_area}
          ></textarea>
          <button type="submit">Post Question</button>
        </form>
      </div>
    </div>
  );
}

export default AskQuestion;
