// import React, { useState, useEffect } from "react";
// import "./Login.css";
// import { Link, useNavigate } from "react-router-dom";
// import { AiFillHome } from "react-icons/ai";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth, db, storage } from "../../firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";

// export default function SignUp() {
//   const [img, setImg] = useState(null);
//   const [err, setErr] = useState(false);
//   const navigate = useNavigate();

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const uName = e.target[1].value;
//     const email = e.target[2].value;
//     const password = e.target[3].value;
//     const confirmPassword = e.target[4].value;

//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     try {
//       const res = await createUserWithEmailAndPassword(auth, email, password);

//       const storageRef = ref(storage, "usersImages/" + uName);

//       const uploadTask = uploadBytesResumable(storageRef, img);

//       uploadTask.on(
//         "state_changed",
//         null,
//         (error) => {
//           console.error("Upload failed:", error);
//           setErr(true);
//         },
//         async () => {
//           try {
//             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//             await updateProfile(res.user, {
//               displayName: uName,
//               photoURL: downloadURL,
//             });
//             await setDoc(doc(db, "users", res.user.uid), {
//               uid: res.user.uid,
//               uName,
//               email,
//               photoURL: downloadURL,
//             });
//             await setDoc(doc(db, "usersPosts", res.user.uid), { messages: [] });
//             navigate("/");
//           } catch (error) {
//             console.error("Error updating profile:", error);
//             setErr(true);
//           }
//         }
//       );
//     } catch (err) {
//       console.error("Error creating user:", err);
//       setErr(true);
//     }
//   };

//   return (
//     <div className="login">
//       <div className="login-left">
//         <p className="login-title">
//           Explore in-depth articles and expert analysis on football with
//           <span> FilSoka </span>, covering everything from match reviews to
//           player profiles and tactical breakdowns.
//         </p>
//       </div>
//       <div className="login-right">
//         <h2>Sign Up</h2>
//         <form onSubmit={submitHandler}>
//           <div className="top-form">
//             <p>Upload Your Picture :</p>
//             <label htmlFor="blankImage">
//               <img
//                 className="blank-image"
//                 src={
//                   img
//                     ? URL.createObjectURL(img)
//                     : "/blank-profile-picture-973460_1280.webp"
//                 }
//                 alt="blank-image"
//               />
//             </label>
//             <input
//               id="blankImage"
//               type="file"
//               onChange={(e) => setImg(e.target.files[0])}
//               accept=".png,.jpeg,.jpg"
//             />
//           </div>
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             required
//             autoComplete="off"
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             required
//             autoComplete="off"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             required
//             minLength={6}
//           />
//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             required
//           />
//           <input type="submit" value="Sign Up" />
//         </form>
//         <Link to="/login">Already a user? Login</Link>
//         {err && <span>Something went wrong</span>}
//       </div>
//     </div>
//   );
// }
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { doc, setDoc, Timestamp } from "firebase/firestore";
// import { auth, storage, db } from "../../firebase";

// export default function SignUp() {
//   const [img, setImg] = useState(null);
//   const [err, setErr] = useState(false);
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const uName = e.target[1].value;
//     const email = e.target[2].value;
//     const password = e.target[3].value;
//     const confirmPassword = e.target[4].value;

//     const newErrors = {};
//     if (!img) newErrors.img = "Please upload a picture.";
//     if (uName.length < 3)
//       newErrors.uName = "Username must be at least 3 characters long.";
//     if (!email.includes("@"))
//       newErrors.email = "Please enter a valid email address.";
//     if (password.length < 6)
//       newErrors.password = "Password must be at least 6 characters long.";
//     if (password !== confirmPassword)
//       newErrors.confirmPassword = "Passwords do not match.";

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length > 0) return;

//     try {
//       const res = await createUserWithEmailAndPassword(auth, email, password);

//       const storageRef = ref(storage, "usersImages/" + uName);

//       const uploadTask = uploadBytesResumable(storageRef, img);

//       uploadTask.on(
//         "state_changed",
//         null,
//         (error) => {
//           console.error("Upload failed:", error);
//           setErr(true);
//         },
//         async () => {
//           try {
//             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//             await updateProfile(res.user, {
//               displayName: uName,
//               photoURL: downloadURL,
//             });
//             await setDoc(doc(db, "users", res.user.uid), {
//               uid: res.user.uid,
//               uName,
//               email,
//               photoURL: downloadURL,
//               creationTime: Timestamp.now(),
//             });
//             navigate("/");
//           } catch (error) {
//             console.error("Error updating profile:", error);
//             setErr(true);
//           }
//         }
//       );
//     } catch (err) {
//       console.error("Error creating user:", err);
//       setErr(true);
//     }
//   };

//   return (
//     <div className="login">
//       <div className="login-left">
//         <p className="login-title">
//           Explore in-depth articles and expert analysis on football with
//           <span> FilSoka </span>, covering everything from match reviews to
//           player profiles and tactical breakdowns.
//         </p>
//       </div>
//       <div className="login-right">
//         <h2>Sign Up</h2>
//         <form onSubmit={submitHandler}>
//           <div className="top-form">
//             <p>Upload Your Picture :</p>
//             <label htmlFor="blankImage">
//               <img
//                 className="blank-image"
//                 src={
//                   img
//                     ? URL.createObjectURL(img)
//                     : "/blank-profile-picture-973460_1280.webp"
//                 }
//                 alt="blank-image"
//               />
//             </label>
//             <input
//               id="blankImage"
//               type="file"
//               onChange={(e) => setImg(e.target.files[0])}
//               accept=".png,.jpeg,.jpg"
//             />
//           </div>
//           {errors.img && <span className="error">{errors.img}</span>}
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             required
//             autoComplete="off"
//           />
//           {errors.uName && <span className="error">{errors.uName}</span>}
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             required
//             autoComplete="off"
//           />
//           {errors.email && <span className="error">{errors.email}</span>}
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             required
//             minLength={6}
//           />
//           {errors.password && <span className="error">{errors.password}</span>}
//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             required
//           />
//           {errors.confirmPassword && (
//             <span className="error">{errors.confirmPassword}</span>
//           )}
//           <input type="submit" value="Sign Up" />
//         </form>
//         <Link to="/login">Already a user? Login</Link>
//         {err && <span>Something went wrong</span>}
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";

export default function SignUp() {
  const defaultPhotoURL = "https://i.imgur.com/kydoiFm.png"; // فقط الاسم مع المسار من دون /public

  const [err, setErr] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const uName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPassword = e.target[3].value;

    const newErrors = {};

    if (uName.length < 3) {
      newErrors.uName = "Username must be at least 3 characters long.";
    }
    if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: uName,
        // Remove photoURL as it's not used
      });

      await setDoc(doc(db, "users", auth.currentUser.uid), {
        uid: auth.currentUser.uid,
        uName,
        email,
        creationTime: Timestamp.now(),
        photoURL: defaultPhotoURL,
      });

      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrors({ email: "This email is already in use." });
      } else {
        console.error("Error creating user:", error);
        setErr("Something went wrong.");
      }
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
          <input type="text" name="username" placeholder="Username" />
          {errors.uName && <span className="error">{errors.uName}</span>}
          <input type="email" name="email" placeholder="Email" />
          {errors.email && <span className="error">{errors.email}</span>}
          <input type="password" name="password" placeholder="Password" />
          {errors.password && <span className="error">{errors.password}</span>}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
          <input type="submit" value="Sign Up" />
        </form>
        <Link to="/login">Already a user? Login</Link>
        {err && <span>{err}</span>}
      </div>
    </div>
  );
}
