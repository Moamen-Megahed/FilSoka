import React, { useContext } from "react";
import { useState } from "react";
import Posts from "../components/posts/Posts";
import NewPost from "../components/posts/NewPost";
import "./HomePage.css";
import { AuthContext } from "../context/AuthContext";
import ReactDOM from "react-dom";

export default function HomePage() {
  const [isAdding, setIsAdding] = useState(false);
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

  const addArticleHandler = (bool) => {
    setIsAdding(bool);
  };

  return (
    <div className="home">
      <NewPost isAdding={isAdding} addArticleHandler={addArticleHandler} />
      <Posts />
      {ReactDOM.createPortal(
        <div className="not-responsive">{`Sorry It's Not Responsive Yet :(`}</div>,
        document.getElementById("overlays")
      )}
    </div>
  );
}
