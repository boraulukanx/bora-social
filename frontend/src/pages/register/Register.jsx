import axios from "axios";
import { useState, useEffect } from "react";
import "./register.css";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { auth } from "../../firebase";
import { storage } from "../../firebase";
import { db } from "../../firebase";

import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [locationLAT, setLocationLAT] = useState(0);
  const [locationLNG, setLocationLNG] = useState(0);

  /*   const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null); */

  /*   const passwordAgain = useState(); */

  /*   const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/users/register", user);
      } catch (err) {
        console.log(err);
      }
    }
  }; */

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      setLocationLAT(position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLocationLNG(position.coords.longitude);
    });
  }, []);

  /*   const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();
    /*     if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else { */
    const user = {
      username: username,
      email: email,
      password: password,
      locationLNG: locationLNG,
      locationLAT: locationLAT,
    };
    /*     const imageRef = ref(storage, `images/${Date.now() + username}`);
    uploadBytesResumable(imageRef, file).then(() => {
      getDownloadURL(imageRef)
        .then((url) => {
          setUrl(url);
        })
        .catch((error) => {
          console.log(error.message, "error getting the image url");
        });
      setFile(null);
    }); */
    try {
      await axios.post("http://localhost:3001/auth/register", user);
      console.log("successfully saved " + user.username + " " + user.email);
    } catch (err) {
      console.log(err);
      console.log("catched an error");
    }
    /* } */
    navigate("/login");
  };

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
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="loginInput"
              type="password"
              minLength="6"
            />
            {/*             <label className="fileLabel" htmlFor="file">
              <span>
                Upload your avatar
                <input type="file" accept=".png, .jpg, .jpeg" onChange={""} />
              </span>
            </label> */}
            {/*             <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            /> */}
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
