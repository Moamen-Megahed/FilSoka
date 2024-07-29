import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import Post from "../posts/Post";

export default function UserPosts() {
  const params = useParams();

  const { currentUser, loadingUser, loadingPosts } = useContext(AuthContext);
  const { posts } = useContext(AuthContext);

  // console.log(currentUser.id == params.userId);

  //   filterdPosts
  //     .sort((a, b) => b.timestamp - a.timestamp)
  //     .map((p) => p.data.img)
  // );
  // console.log(); //posts[0]?.data.uid
  // // useEffect(() => {
  // //   const getUsersPost = () => {
  // //     const unSub = onSnapshot(
  // //       doc(db, "usersPosts", currentUser.uid),
  // //       (doc) => {
  // //         doc.exists() && setUsersPosts(doc.data().messages);
  // //         //   console.log(doc.data().messages);
  // //       }
  // //     );
  // //     //   console.log(usersPosts);
  // //     return () => {
  // //       unSub();
  // //     };
  //   };
  //   currentUser.uid && getUsersPost();
  // }, [currentUser.uid]);

  if (loadingUser || loadingPosts) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }

  return (
    <div className="posts">
      {posts
        .filter((p) => p.data?.uid == params.userId)
        .sort((a, b) => b.data.timestamp - a.data.timestamp)
        .map((post) => (
          <Post key={post.id} post={post} />
        ))}
    </div>
  );
}
