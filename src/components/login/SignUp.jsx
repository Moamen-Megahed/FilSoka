import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export default function SignUp() {
  const [img, setImg] = useState(null);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const uName = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;
    const confirmPassword = e.target[4].value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, "usersImages/" + uName);

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Upload failed:", error);
          setErr(true);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateProfile(res.user, {
              displayName: uName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              uName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "usersPosts", res.user.uid), { messages: [] });
            navigate("/");
          } catch (error) {
            console.error("Error updating profile:", error);
            setErr(true);
          }
        }
      );
    } catch (err) {
      console.error("Error creating user:", err);
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
        <h2>Sign Up</h2>
        <form onSubmit={submitHandler}>
          <div className="top-form">
            <label htmlFor="blankImage">
              <img
                className="blank-image"
                src={
                  img
                    ? URL.createObjectURL(img)
                    : "/blank-profile-picture-973460_1280.webp"
                }
                alt="blank-image"
              />
            </label>
            <input
              id="blankImage"
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
              accept=".png,.jpeg,.jpg"
            />
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            autoComplete="off"
          />
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
          />
          <input type="submit" value="Sign Up" />
        </form>
        <Link to="/login">Already a user? Login</Link>
        {err && <span>Something went wrong</span>}
      </div>
    </div>
  );
}
