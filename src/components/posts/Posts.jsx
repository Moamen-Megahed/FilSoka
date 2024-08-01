import Post from "./Post";
import "./Posts.css";
import { db } from "../../firebase";
import React, { useState, useEffect, useContext } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import Pagination from "../pagination/Pagination";

export default function Posts({ searchTerm }) {
  const { posts } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // if (loadingPosts) {
  //   return <div style={{ color: "white" }}>Loading...</div>;
  // }

  const filteredPosts = searchTerm
    ? posts.filter((post) =>
        post.data.articleInput.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : posts;

  const sortedPosts = filteredPosts.sort(
    (a, b) => b.data.timestamp - a.data.timestamp
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  // console.log(currentPosts);
  // console.log(posts);

  return (
    <>
      <div className="posts">
        {currentPosts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filteredPosts.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
