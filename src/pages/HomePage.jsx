import React from "react";
import { useState } from "react";
import Posts from "../components/posts/Posts";
import NewPost from "../components/posts/NewPost";
import "./HomePage.css";

export default function HomePage() {
  const [isAdding, setIsAdding] = useState(false);
  const addArticleHandler = (bool) => {
    setIsAdding(bool);
  };
  return (
    <div className="home">
      <NewPost isAdding={isAdding} addArticleHandler={addArticleHandler} />
      <Posts />
    </div>
  );
}
