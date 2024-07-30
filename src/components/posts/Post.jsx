// import { AiOutlineLike, AiFillLike } from "react-icons/ai";

// import "./Post.css";
// import { useEffect, useState, useContext } from "react";
// import {
//   collection,
//   deleteDoc,
//   doc,
//   onSnapshot,
//   setDoc,
// } from "firebase/firestore";
// import { AuthContext } from "../../context/AuthContext";
// import { db } from "../../firebase";
// import { Link } from "react-router-dom";
// // import { posts, users } from "../../data";

// export default function Post({ post }) {
//   const { currentUser } = useContext(AuthContext);
//   const [likes, setLikes] = useState([]);
//   const [liked, setLiked] = useState(false);
//   useEffect(() => {
//     const unSub = onSnapshot(
//       collection(db, "posts", post.id, "likes"),
//       (snapshot) => setLikes(snapshot.docs)
//     );
//     return () => {
//       unSub();
//     };
//   }, [post.id]);

//   useEffect(() => {
//     setLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1);
//   }, [likes, currentUser.uid]);

//   const likePost = async () => {
//     if (liked) {
//       await deleteDoc(doc(db, "posts", post.id, "likes", currentUser.uid));
//     } else {
//       await setDoc(doc(db, "posts", post.id, "likes", currentUser.uid), {
//         userId: currentUser.uid,
//       });
//     }
//   };
//   // console.log(post.data);
//   return (
//     <div className="post container">
//       <div className="post-image">
//         {post.data.img && <img src={post.data.img} alt="post image" />}
//       </div>
//       <div className="post-info">
//         <Link to={`/posts/${post.data.titleInput}`}>
//           <h2 className="post-title">{post.data.titleInput}</h2>
//         </Link>

//         <div className="post-source">
//           <img src={post.data.photoURL} alt="" />
//           <span className="profile-name">{post.data.displayName}</span>
//           <span className="post-date">
//             {new Date(post.data.timestamp?.toDate()).toLocaleString()}
//           </span>
//         </div>
//         <div className="post-likes" onClick={likePost}>
//           {liked ? <AiFillLike /> : <AiOutlineLike />}{" "}
//           {likes.length > 0 && <span>{likes.length}</span>}
//         </div>
//       </div>
//     </div>
//   );
// }
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import "./Post.css";
import { useEffect, useState, useContext } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import Modal from "../UI/Modal";
import PostForm from "./PostForm";

export default function Post({ post }) {
  const { deletePostHandler, currentUser } = useContext(AuthContext);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [warningMsg, setWarningMsg] = useState(false);

  useEffect(() => {
    const unSub = onSnapshot(
      collection(db, "posts", post.id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
    return () => {
      unSub();
    };
  }, [post.id]);

  useEffect(() => {
    setLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1);
  }, [likes, currentUser?.uid]);

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "posts", post.id, "likes", currentUser.uid));
    } else {
      await setDoc(doc(db, "posts", post.id, "likes", currentUser.uid), {
        userId: currentUser.uid,
      });
    }
  };

  const addArticleHandler = (bool) => {
    setEditMode(bool);
    setWarningMsg(bool);
  };
  return (
    <div className="post">
      <div className="post-image">
        {post.data.img && <img src={post.data.img} alt="post image" />}
      </div>
      <div className="post-info">
        <Link to={`/posts/${post.id}`}>
          <h2 className="post-title">{post.data.titleInput}</h2>
        </Link>

        <div className="post-source">
          <Link to={"/profile/" + post.data.uid}>
            <img src={post.data.photoURL} alt="" />
          </Link>
          <Link to={"/profile/" + post.data.uid}>
            <span className="profile-name">{post.data.displayName}</span>
          </Link>
          <span className="post-date">
            {new Date(post.data.timestamp?.toDate()).toLocaleString()}
          </span>
        </div>
        <div className="post-likes" onClick={likePost}>
          {liked ? <AiFillLike /> : <AiOutlineLike />}{" "}
          {likes.length > 0 && <span>{likes.length}</span>}
        </div>
      </div>
      {currentUser?.uid == post.data.uid && (
        <div className="options">
          <button
            className="edit-btn"
            onClick={() => {
              setEditMode(true);
            }}
          >
            Edit
          </button>
          <button
            className="delete-btn"
            onClick={() => {
              setWarningMsg(true);
            }}
          >
            Delete
          </button>
        </div>
      )}
      {editMode && (
        <PostForm
          title="Edit Article"
          submitTitle="Save"
          addArticleHandler={addArticleHandler}
          thePrevImg={post.data.img}
          thePrevTitle={post.data.titleInput}
          thePrevArticle={post.data.articleInput}
          postId={post.id}
        ></PostForm>
      )}
      {warningMsg && (
        <Modal addArticleHandler={addArticleHandler}>
          <div className="warning-msg">
            <h2>Delete Article?</h2>
            <p>Are you sure you want to delete this article?</p>
            <button
              className="cancel-btn"
              onClick={() => {
                setWarningMsg(false);
              }}
            >
              Cancel
            </button>
            <button
              className="delete-btn"
              onClick={() => {
                deletePostHandler(post.id);
                setWarningMsg(false);
              }}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
