import React, { useContext } from "react";
import Profile from "../components/profile/Profile";
import { AuthContext } from "../context/AuthContext";
import ReactDOM from "react-dom";

export default function ProfilePage() {
  const { loadingUser, loadingPosts } = useContext(AuthContext);

  if (loadingUser || loadingPosts) {
    return (
      <div className="dots">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
  return (
    <>
      <Profile />
      {ReactDOM.createPortal(
        <div className="not-responsive">{`Sorry It's Not Responsive Yet :(`}</div>,
        document.getElementById("overlays")
      )}
    </>
  );
}
