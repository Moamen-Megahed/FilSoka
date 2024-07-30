import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import "./PostDetails.css";

export default function PostDetails() {
  const { postId } = useParams();
  const { posts } = useContext(AuthContext);

  const filteredPost = posts.filter((p) => p.id == postId)[0]?.data;
  // console.log(filteredPost);
  // console.log(posts);
  // const [post, setPost] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     try {
  //       const docRef = doc(db, "posts", postId);
  //       const docSnap = await getDoc(docRef);

  //       if (docSnap.exists()) {
  //         setPost(docSnap.data());
  //       } else {
  //         console.log("No such document!");
  //       }
  //     } catch (error) {

  //       console.error("Error fetching post: ", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPost();
  // }, [postId]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!post) {
  //   return <div>No post found</div>;
  // }

  return (
    <div className="postDetails">
      <h2 className="postDetails-title">{filteredPost?.titleInput}</h2>
      <div className="postDetails-image">
        <img src={filteredPost?.img} alt="post-image" />
      </div>
      <div className="postDetails-body">
        <div className="postDetails-publisher">
          <img src={filteredPost?.photoURL} alt="profile-image" />
          <span>
            <Link to={"/profile/" + filteredPost?.uid}>
              <strong>{filteredPost?.displayName} </strong>
            </Link>
            - {new Date(filteredPost?.timestamp?.toDate()).toLocaleString()}
          </span>
        </div>
        {filteredPost?.articleInput
          .split(".")
          .filter((p) => p.trim() !== "")
          .map((p, index) => (
            <p key={index} className="postDetails-paragraph">
              {p}
            </p>
          ))}
      </div>
    </div>
  );
}
