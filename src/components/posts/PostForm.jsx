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
// import React, { useContext, useState, useEffect } from "react";
// import Modal from "../UI/Modal";
// import { IoIosCloseCircleOutline } from "react-icons/io";
// import { FaRegImage } from "react-icons/fa6";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { db, storage } from "../../firebase";
// import { v4 as uuid } from "uuid";
// import { IoClose } from "react-icons/io5";
// import {
//   addDoc,
//   collection,
//   serverTimestamp,
//   updateDoc,
//   doc,
// } from "firebase/firestore";
// import { AuthContext } from "../../context/AuthContext";
// import "./NewPost.css";

// export default function PostForm({
//   addArticleHandler,
//   submitTitle,
//   title,
//   thePrevTitle,
//   thePrevArticle,
//   thePrevImg,
//   postId, // Add postId to identify if we are editing a post
// }) {
//   const { currentUser } = useContext(AuthContext);
//   const [titleInput, setTitleInput] = useState("");
//   const [articleInput, setArticleInput] = useState("");
//   const [img, setImg] = useState(null);
//   const [imgPreview, setImgPreview] = useState(thePrevImg || null);
//   const [error, setError] = useState(false);
//   useEffect(() => {
//     if (thePrevTitle) setTitleInput(thePrevTitle);
//     if (thePrevArticle) setArticleInput(thePrevArticle);
//   }, [thePrevTitle, thePrevArticle]);

//   const handlePost = async (e) => {
//     e.preventDefault();
//     try {
//       if (img && img !== thePrevImg) {
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
//               if (postId) {
//                 await updateDoc(doc(db, "posts", postId), {
//                   titleInput,
//                   articleInput,
//                   img: downloadURL,
//                 });
//               } else {
//                 await addDoc(collection(db, "posts"), {
//                   uid: currentUser.uid,
//                   photoURL: currentUser.photoURL,
//                   displayName: currentUser.uName,
//                   titleInput,
//                   articleInput,
//                   img: downloadURL,
//                   timestamp: serverTimestamp(),
//                 });
//               }
//             } catch (error) {
//               console.error("Error getting download URL:", error);
//               setError(true);
//             }
//           }
//         );
//       } else {
//         if (postId) {
//           await updateDoc(doc(db, "posts", postId), {
//             titleInput,
//             articleInput,
//             img: thePrevImg,
//           });
//         } else {
//           await addDoc(collection(db, "posts"), {
//             uid: currentUser.uid,
//             photoURL: currentUser.photoURL,
//             displayName: currentUser.uName,
//             titleInput,
//             articleInput,
//             timestamp: serverTimestamp(),
//           });
//         }
//       }
//       addArticleHandler(false);
//       setTitleInput("");
//       setArticleInput("");
//       setImg(null);
//       setImgPreview(null);
//     } catch (error) {
//       setError(true);
//     }
//   };

//   const removeImage = () => {
//     setImg(null);
//     setImgPreview(null);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImg(file);
//       setImgPreview(URL.createObjectURL(file));
//     }
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
//             value={titleInput}
//             onChange={(e) => setTitleInput(e.target.value)}
//             autoFocus
//             minLength={3}
//             maxLength={100}
//           />
//           <textarea
//             value={articleInput}
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
//               onChange={handleImageChange}
//             />
//             {imgPreview && (
//               <div className="formImg">
//                 <img src={imgPreview} alt="" />
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

const defaultPhotoURL = "/blank-profile-picture-973460_1280.webp"; // فقط الاسم مع المسار من دون /public

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
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(false);
  const [isPosting, setIsPosting] = useState(false); // New state for posting

  useEffect(() => {
    if (thePrevTitle) setTitleInput(thePrevTitle);
    if (thePrevArticle) setArticleInput(thePrevArticle);
  }, [thePrevTitle, thePrevArticle]);

  const handlePost = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate inputs
    if (!titleInput.trim()) {
      newErrors.title = "Title is required.";
    }
    if (!articleInput.trim()) {
      newErrors.article = "Article body is required.";
    }
    if (!img && !thePrevImg) {
      newErrors.image = "Image is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsPosting(true); // Start posting

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
            setErrors((prevErrors) => ({
              ...prevErrors,
              image: "Failed to upload image. Please try again.",
            }));
            setIsPosting(false); // Stop posting on error
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
              addArticleHandler(false);
              setTitleInput("");
              setArticleInput("");
              setImg(null);
              setImgPreview(null);
              setIsPosting(false); // Stop posting after successful submission
            } catch (error) {
              console.error("Error getting download URL:", error);
              setError(true);
              setErrors((prevErrors) => ({
                ...prevErrors,
                image: "Failed to get image URL. Please try again.",
              }));
              setIsPosting(false); // Stop posting on error
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
            photoURL: currentUser.photoURL || defaultPhotoURL,
            displayName: currentUser.uName,
            titleInput,
            articleInput,
            timestamp: serverTimestamp(),
          });
        }
        addArticleHandler(false);
        setTitleInput("");
        setArticleInput("");
        setImg(null);
        setImgPreview(null);
        setIsPosting(false); // Stop posting after successful submission
      }
    } catch (error) {
      setError(true);
      setIsPosting(false); // Stop posting on error
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitleInput(value);
      if (value.trim()) {
        setErrors((prevErrors) => ({ ...prevErrors, title: "" }));
      }
    } else if (name === "article") {
      setArticleInput(value);
      if (value.trim()) {
        setErrors((prevErrors) => ({ ...prevErrors, article: "" }));
      }
    }
  };

  const removeImage = () => {
    setImg(null);
    setImgPreview(null);
    setErrors((prevErrors) => ({ ...prevErrors, image: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
      setImgPreview(URL.createObjectURL(file));
      setErrors((prevErrors) => ({ ...prevErrors, image: "" }));
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
            name="title"
            placeholder="Title"
            value={titleInput}
            onChange={handleInputChange}
            autoFocus
            maxLength={100}
          />
          {errors.title && <span className="error">{errors.title}</span>}
          <textarea
            name="article"
            value={articleInput}
            onChange={handleInputChange}
            placeholder="Article body"
          ></textarea>
          {errors.article && <span className="error">{errors.article}</span>}
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
            {errors.image && <span className="error">{errors.image}</span>}
          </div>
          <button
            className="add-article-btn"
            type="submit"
            disabled={isPosting}
            style={isPosting ? { cursor: "default" } : undefined}
          >
            {isPosting ? "Posting..." : submitTitle}
          </button>
        </div>
        {error && (
          <span className="error">Something went wrong. Please try again.</span>
        )}
      </form>
    </Modal>
  );
}
