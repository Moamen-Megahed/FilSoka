// import React, { useRef } from "react";
// import { CiSearch } from "react-icons/ci";
// import { IoMdLogIn } from "react-icons/io";
// import { AuthContext } from "../../context/AuthContext";
// import { useContext } from "react";
// import "./Nav.css";
// import { Link, useNavigate } from "react-router-dom";
// import { signOut } from "firebase/auth";
// import { auth } from "../../firebase";
// import { AiFillHome } from "react-icons/ai";

// export default function Nav() {
//   const dropdownRef = useRef();
//   const showContent = () => {
//     dropdownRef.current.classList.toggle("show-flex");
//   };
//   const { currentUser } = useContext(AuthContext);
//   console.log(currentUser);
//   const navigate = useNavigate();
//   // const handleSignOut = () =>{
//   //   signOut(auth)
//   //   <Navigate>
//   // }
//   return (
//     <>
//       <nav className="navbar">
//         <div className="nav-left">
//           <h1>
//             <Link to="/">FilSoka.</Link>
//           </h1>
//           {/* <IoIosFootball /> */}
//         </div>
//         <div className="nav-center">
//           <CiSearch className="search-icon" />
//           <input
//             autoComplete="off"
//             type="text"
//             name="search"
//             id="search"
//             placeholder="Search"
//             className="search-input"
//           />
//         </div>

//         <div className="nav-right">
//           <Link to={"/"}>
//             <AiFillHome />
//           </Link>
//           {currentUser ? (
//             <button className="profile-dropdown-btn" onClick={showContent}>
//               <img
//                 className="profile-avatar"
//                 src={
//                   currentUser.photoURL
//                     ? currentUser.photoURL
//                     : "/src/assets/blank-profile-picture-973460_1280.webp"
//                 }
//                 // alt="profile image"
//               />
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20"
//                 height="20"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <polyline points="6 9 12 15 18 9"></polyline>
//               </svg>
//               <div className="dropdown-content" ref={dropdownRef}>
//                 <Link to={`/profile/${currentUser.displayName}`}>Profile</Link>
//                 <span
//                   onClick={() => {
//                     signOut(auth);
//                     navigate("/", { replace: true });
//                   }}
//                 >
//                   Logout
//                 </span>
//               </div>
//             </button>
//           ) : (
//             <div className="signup-login">
//               <Link to="/signup">
//                 <button className="signup-btn">Sign Up</button>
//               </Link>
//               <Link to="/login">
//                 <button className="login-btn">Login</button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </nav>
//     </>
//   );
// }

import React, { useRef, useContext, useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdLogIn } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext";
import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AiFillHome } from "react-icons/ai";

export default function Nav() {
  const dropdownRef = useRef();
  const showContent = () => {
    dropdownRef.current.classList.toggle("show-flex");
  };
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <h1>
            <Link to="/">FilSoka.</Link>
          </h1>
        </div>
        <div className="nav-center">
          <CiSearch className="search-icon" />
          <input
            autoComplete="off"
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            className="search-input"
          />
        </div>
        <div className="nav-right">
          <Link to={"/"}>
            <AiFillHome />
          </Link>
          {currentUser ? (
            <button className="profile-dropdown-btn" onClick={showContent}>
              <img
                className="profile-avatar"
                src={
                  currentUser.photoURL
                    ? currentUser.photoURL
                    : "/src/assets/blank-profile-picture-973460_1280.webp"
                }
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
              <div className="dropdown-content" ref={dropdownRef}>
                <Link to={`/profile/${currentUser.uid}`}>Profile</Link>
                <span
                  onClick={() => {
                    signOut(auth);
                    localStorage.removeItem("isLoggedIn");
                    navigate("/", { replace: true });
                  }}
                >
                  Logout
                </span>
              </div>
            </button>
          ) : (
            <div className="signup-login">
              <Link to="/signup">
                <button className="signup-btn">Sign Up</button>
              </Link>
              <Link to="/login">
                <button className="login-btn">Login</button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
