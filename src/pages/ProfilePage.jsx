import React, { useContext } from "react";
import Profile from "../components/profile/Profile";
import { AuthContext } from "../context/AuthContext";

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
    </>
  );
}
