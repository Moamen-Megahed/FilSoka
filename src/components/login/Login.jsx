import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export default function Login() {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/", { replace: true });
    } catch (error) {
      setErr(true);
    }
  };
  return (
    <div className="login">
      <div className="login-left">
        <p className="login-title">
          Explore in-depth articles and expert analysis on football with
          <span> FilSoka </span>, covering everything from match reviews to
          player profiles and tactical breakdowns.
        </p>
      </div>
      <div className="login-right">
        {/* <Link to="/">
          <AiFillHome className="home-icon"></AiFillHome>
        </Link> */}
        <h2>Login</h2>
        <form action="" onSubmit={submitHandler}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            autoComplete="off"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            minLength={6}
          />
          <input type="submit" value="Login" />
        </form>
        <Link to="/signup">Not a user? Create account</Link>
        {err && <span>Something Went Wrong</span>}
      </div>
    </div>
  );
}
