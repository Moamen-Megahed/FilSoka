import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./NewPost.css";
import PostForm from "./PostForm";

export default function NewPost({ addArticleHandler, isAdding }) {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      {isAdding && (
        <PostForm
          title="Create Article"
          submitTitle="Post"
          addArticleHandler={addArticleHandler}
        />
      )}
      {currentUser && (
        <div
          className="new-article"
          onClick={() => {
            addArticleHandler(true);
          }}
        >
          Wanna create new articel ?
        </div>
      )}
    </>
  );
}
