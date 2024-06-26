import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../axiosConfig";
import classes from "./Register.module.css";

function Register() {
  const navigate = useNavigate();
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    const usernameValue = usernameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !passValue
    ) {
      alert("please provide all required information");
      return;
    }
    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });
      alert("register successful. please login");
      navigate("/login");
    } catch (error) {
      alert(error?.response?.data?.message);
      // console.log(error.response);
    }
  }

  return (
    <section className={classes.container}>
      <div className={classes.register_container}>
        <form onSubmit={handleSubmit} className={classes.register_form}>
          <br />
          <h4>Join the network</h4>
          <p>
            Already have an account?
            <Link className={classes.link_color}>Sign in</Link>
          </p>
          <div>
            {/* <span className="form_group"></span> */}
            <input
              ref={emailDom}
              type="text"
              placeholder=" email"
              className={classes.form_group}
            />
          </div>
          <br />
          <div className={classes.form_name}>
            <input
              ref={firstnameDom}
              type="text"
              placeholder="first name"
              className={classes.form_namearea}
            />
            <input
              ref={lastnameDom}
              type="text"
              placeholder=" last name"
              className={classes.form_namearea}
            />
          </div>
          <br />
          <div>
            <input
              ref={usernameDom}
              type="userName"
              placeholder=" user name"
              className={classes.form_group}
            />
          </div>
          <br />
          <div>
            <input
              ref={passwordDom}
              type=" *password "
              placeholder=" password"
              className={classes.form_group}
            />
            {/* <input
              ref={passwordDom}
              type="password"
              placeholder=" password"
              className={classes.form_group1}
            /> */}
          </div>
          <br />

          <button type="Agree and Join" className={classes.btn_register}>
            Agree and Join
          </button>
          <div className={classes.Register_link}>
            <p>
              I agree to the
              <span>terms of service</span>
              and
              <span>Privacy Policy</span>
            </p>
            <p className={classes.Register_link1}>Already have an account ?</p>
          </div>
        </form>

        {/* <Link to="/login" className={classes.Register_link}>
          login
        </Link> */}
      </div>

      <div className={classes.right_container}>
        <Link
          to={"/about"}
          style={{ color: "#f2602be8" }}
          className={classes.about_link}
        >
          About
        </Link>
        <h2>Evangadi Networks Q&A </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
        <div className={classes.link}>
          <Link to={"/aboutus"} className={classes.link_bottom}>
            HOW IT WORKS
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
