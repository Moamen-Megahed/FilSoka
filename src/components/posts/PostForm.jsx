// import React, { useContext, useState } from "react";
// import Modal from "../UI/Modal";
// import { IoIosCloseCircleOutline } from "react-icons/io";
// import { FaRegImage } from "react-icons/fa6";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { db, storage } from "../../firebase";
// import { v4 as uuid } from "uuid";
// import { IoClose } from "react-icons/io5";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { AuthContext } from "../../context/AuthContext";
// import "./NewPost.css";

// export default function PostForm({
//   addArticleHandler,
//   submitTitle,
//   title,
//   thePrevTitle,
//   thePrevArticle,
//   thePrevImg,
// }) {
//   console.log(thePrevImg);
//   const { currentUser } = useContext(AuthContext);
//   const [titleInput, setTitleInput] = useState("");
//   const [articleInput, setArticleInput] = useState("");
//   const [img, setImg] = useState(null);
//   const [error, setError] = useState(false);

//   const handlePost = async (e) => {
//     e.preventDefault();
//     try {
//       if (img) {
//         const storageRef = ref(storage, "Posts/" + uuid());
//         const uploadTask = uploadBytesResumable(storageRef, img);

//         uploadTask.on(
//           "state_changed",
//           null,
//           (error) => {
//             console.error("Upload failed:", error);
//             setError(true);
//           },
//           async () => {
//             try {
//               const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//               await addDoc(collection(db, "posts"), {
//                 uid: currentUser.uid,
//                 photoURL: currentUser.photoURL,
//                 displayName: currentUser.displayName,
//                 titleInput,
//                 articleInput,
//                 img: downloadURL,
//                 timestamp: serverTimestamp(),
//               });
//             } catch (error) {
//               console.error("Error getting download URL:", error);
//               setError(true);
//             }
//           }
//         );
//       } else {
//         await addDoc(collection(db, "posts"), {
//           uid: currentUser.uid,
//           photoURL: currentUser.photoURL,
//           displayName: currentUser.displayName,
//           titleInput,
//           articleInput,
//           timestamp: serverTimestamp(),
//         });
//       }
//       addArticleHandler(false);
//       setTitleInput("");
//       setArticleInput("");
//       setImg(null);
//     } catch (error) {
//       console.error("Error creating post:", error);
//       setError(true);
//     }
//   };
//   const removeImage = () => {
//     setImg(null);
//   };

//   return (
//     <Modal addArticleHandler={addArticleHandler}>
//       <form action="" className="article-form" onSubmit={handlePost}>
//         <div className="form-top">
//           <h2>{title}</h2>
//           <IoIosCloseCircleOutline
//             className="close-icon"
//             onClick={() => {
//               addArticleHandler(false);
//             }}
//           />
//         </div>
//         <div className="form-mid">
//           <input
//             type="text"
//             placeholder="Title"
//             value={thePrevTitle ? thePrevTitle : titleInput}
//             onChange={(e) => setTitleInput(e.target.value)}
//           />
//           <textarea
//             value={thePrevArticle ? thePrevArticle : articleInput}
//             onChange={(e) => setArticleInput(e.target.value)}
//             placeholder="Article body"
//           ></textarea>
//         </div>
//         <div className="form-bottom">
//           <div className="upload-image">
//             <label htmlFor="file" className="file-label">
//               Add an image
//               <FaRegImage />
//             </label>
//             <input
//               id="file"
//               type="file"
//               hidden
//               accept=".png,.jpeg,.jpg"
//               onChange={(e) => setImg(e.target.files[0])}
//             />
//             {img && (
//               <div className="formImg">
//                 <img src={URL.createObjectURL(img)} alt="" />
//                 <IoClose className="formImgIcon" onClick={removeImage} />
//               </div>
//             )}
//           </div>
//           <button className="add-article-btn">{submitTitle}</button>
//         </div>
//       </form>
//     </Modal>
//   );
// }
import React, { useContext, useState, useEffect } from "react";
import Modal from "../UI/Modal";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaRegImage } from "react-icons/fa6";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import { IoClose } from "react-icons/io5";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import "./NewPost.css";

export default function PostForm({
  addArticleHandler,
  submitTitle,
  title,
  thePrevTitle,
  thePrevArticle,
  thePrevImg,
  postId, // Add postId to identify if we are editing a post
}) {
  const { currentUser } = useContext(AuthContext);
  const [titleInput, setTitleInput] = useState("");
  const [articleInput, setArticleInput] = useState("");
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(thePrevImg || null);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (thePrevTitle) setTitleInput(thePrevTitle);
    if (thePrevArticle) setArticleInput(thePrevArticle);
  }, [thePrevTitle, thePrevArticle]);

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      if (img && img !== thePrevImg) {
        const storageRef = ref(storage, "Posts/" + uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            console.error("Upload failed:", error);
            setError(true);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              if (postId) {
                await updateDoc(doc(db, "posts", postId), {
                  titleInput,
                  articleInput,
                  img: downloadURL,
                });
              } else {
                await addDoc(collection(db, "posts"), {
                  uid: currentUser.uid,
                  photoURL: currentUser.photoURL,
                  displayName: currentUser.uName,
                  titleInput,
                  articleInput,
                  img: downloadURL,
                  timestamp: serverTimestamp(),
                });
              }
            } catch (error) {
              console.error("Error getting download URL:", error);
              setError(true);
            }
          }
        );
      } else {
        if (postId) {
          await updateDoc(doc(db, "posts", postId), {
            titleInput,
            articleInput,
            img: thePrevImg,
          });
        } else {
          await addDoc(collection(db, "posts"), {
            uid: currentUser.uid,
            photoURL: currentUser.photoURL,
            displayName: currentUser.uName,
            titleInput,
            articleInput,
            timestamp: serverTimestamp(),
          });
        }
      }
      addArticleHandler(false);
      setTitleInput("");
      setArticleInput("");
      setImg(null);
      setImgPreview(null);
    } catch (error) {
      setError(true);
    }
  };

  const removeImage = () => {
    setImg(null);
    setImgPreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
      setImgPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Modal addArticleHandler={addArticleHandler}>
      <form action="" className="article-form" onSubmit={handlePost}>
        <div className="form-top">
          <h2>{title}</h2>
          <IoIosCloseCircleOutline
            className="close-icon"
            onClick={() => {
              addArticleHandler(false);
            }}
          />
        </div>
        <div className="form-mid">
          <input
            type="text"
            placeholder="Title"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            autoFocus
          />
          <textarea
            value={articleInput}
            onChange={(e) => setArticleInput(e.target.value)}
            placeholder="Article body"
          ></textarea>
        </div>
        <div className="form-bottom">
          <div className="upload-image">
            <label htmlFor="file" className="file-label">
              Add an image
              <FaRegImage />
            </label>
            <input
              id="file"
              type="file"
              hidden
              accept=".png,.jpeg,.jpg"
              onChange={handleImageChange}
            />
            {imgPreview && (
              <div className="formImg">
                <img src={imgPreview} alt="" />
                <IoClose className="formImgIcon" onClick={removeImage} />
              </div>
            )}
          </div>
          <button className="add-article-btn">{submitTitle}</button>
        </div>
      </form>
    </Modal>
  );
}
