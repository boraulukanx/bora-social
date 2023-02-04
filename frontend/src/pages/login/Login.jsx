import "./login.css";
import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  /*   const [username, setUsername] = useState();
  const [password, setPassword] = useState(); */

  const username = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { username: username.current.value, password: password.current.value },
      dispatch
    );
  };

  /*   const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    try {
      await axios.post("http://localhost:3001/auth/login", user);
      console.log("successfully logged in");
      navigate("/");
    } catch (err) {
      console.log(err);
      console.log("catched an error");
    }
  }; */
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Bruh Social</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Bruh Social.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              className="loginInput"
              type="text"
              required
              ref={username}
            />
            <input
              placeholder="Password"
              className="loginInput"
              type="password"
              required
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              Log In
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
