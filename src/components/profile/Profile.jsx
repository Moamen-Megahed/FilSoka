// // import React, { useEffect, useState } from "react";
// // import "./Profile.css";
// // import { AuthContext } from "../../context/AuthContext";
// // import { useContext } from "react";
// // import { Navigate, useParams } from "react-router-dom";
// // import UserPosts from "./UserPosts";
// // import { collection, getDocs, query, where } from "firebase/firestore";
// // import { db } from "../../firebase";
// // import Modal from "../UI/Modal";
// // function formatDate(date) {
// //   const day = date.getDate();
// //   const month = date.getMonth() + 1; // Months are zero-indexed
// //   const year = date.getFullYear();
// //   return `${day}/${month}/${year}`;
// // }
// // export default function Profile() {
// //   const { currentUser } = useContext(AuthContext);
// //   const [user, setUser] = useState([]);
// //   const params = useParams();
// //   const meta = currentUser.metadata;
// //   let creationTime = new Date(Object(meta).creationTime);

// //   // changing image
// //   const [isChangeImg, setIsChangeImg] = useState(false);
// //   const addArticleHandler = (bool) => {
// //     setIsChangeImg(bool);
// //   };

// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       const q = query(
// //         collection(db, "users"),
// //         where("uid", "==", params.userId)
// //       );
// //       const querySnapshot = await getDocs(q);
// //       // console.log(querySnapshot.docs[0].data());
// //       // const fetchedUserId = querySnapshot.docs.map(doc => ({
// //       //   id: doc.id,
// //       //   data: doc.data()
// //       // }));

// //       setUser(querySnapshot.docs[0].data());
// //     };

// //     fetchUser();
// //   }, [params.userId]);

// //   creationTime = formatDate(creationTime);

// //   const uploadImageHandler = () =>{}
// //   return (
// //     <>
// //       <div className="profile-header">
// //         {isChangeImg && (
// //           <Modal addArticleHandler={addArticleHandler}>
// //             <div className="change-img-container">
// //               <h2>Change Profile Photo</h2>
// //               <button className="upload-btn" onClick={()=>{uploadImageHandler}}>Upload Photo</button>
// //               <button
// //                 className="cancel-btn"
// //                 onClick={() => {
// //                   addArticleHandler(false);
// //                 }}
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </Modal>
// //         )}
// //         {user && (
// //           <img
// //             src={
// //               user.photoURL ||
// //               "/src/assets/blank-profile-picture-973460_1280.webp"
// //             }
// //             alt=""
// //             title="Change profile photo"
// //             onClick={() => {
// //               addArticleHandler(true);
// //             }}
// //           />
// //         )}
// //         <h2>{user.uName}</h2>
// //         <p>Joined At {creationTime}</p>
// //         <div className="account-info">
// //           <div className="followers">
// //             <strong>10k</strong> followers
// //           </div>
// //           <div className="likes">
// //             <strong>30k</strong> likes
// //           </div>
// //         </div>
// //       </div>

// //       <UserPosts />
// //     </>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import "./Profile.css";
// import { AuthContext } from "../../context/AuthContext";
// import { useContext } from "react";
// import { useParams } from "react-router-dom";
// import UserPosts from "./UserPosts";
// import {
//   collection,
//   getDocs,
//   query,
//   where,
//   doc,
//   updateDoc,
// } from "firebase/firestore";
// import { db, storage } from "../../firebase";
// import Modal from "../UI/Modal";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// function formatDate(date) {
//   const day = date.getDate();
//   const month = date.getMonth() + 1; // Months are zero-indexed
//   const year = date.getFullYear();
//   return `${day}/${month}/${year}`;
// }

// export default function Profile() {
//   const { currentUser, setCurrentUser } = useContext(AuthContext);
//   const [user, setUser] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const params = useParams();
//   const meta = currentUser?.metadata;
//   let creationTime = new Date(Object(meta).creationTime);

//   // changing image
//   const [isChangeImg, setIsChangeImg] = useState(false);
//   const addArticleHandler = (bool) => {
//     setIsChangeImg(bool);
//   };

//   useEffect(() => {
//     const fetchUser = async () => {
//       const q = query(
//         collection(db, "users"),
//         where("uid", "==", params.userId)
//       );
//       const querySnapshot = await getDocs(q);
//       setUser(querySnapshot.docs[0].data());
//       // console.log(querySnapshot.docs[0].data());
//     };

//     fetchUser();
//   }, [params.userId]);

//   creationTime = formatDate(creationTime);
//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setLoading(true);
//       const storageRef = ref(storage, `profileImages/${currentUser?.uid}`);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on(
//         "state_changed",
//         null,
//         (error) => {
//           console.error("Upload failed:", error);
//           setError(true);
//           setLoading(false);
//         },
//         async () => {
//           try {
//             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

//             // Update photoURL in users collection
//             const userRef = doc(db, "users", currentUser?.uid);
//             await updateDoc(userRef, { photoURL: downloadURL });

//             // Update photoURL in posts collection
//             const q = query(
//               collection(db, "posts"),
//               where("uid", "==", currentUser?.uid)
//             );
//             const querySnapshot = await getDocs(q);
//             const updatePromises = querySnapshot.docs.map((docSnapshot) => {
//               const postRef = doc(db, "posts", docSnapshot.id);
//               return updateDoc(postRef, { photoURL: downloadURL });
//             });
//             await Promise.all(updatePromises);

//             // Update the user in the context
//             setCurrentUser((prevUser) => ({
//               ...prevUser,
//               photoURL: downloadURL,
//             }));

//             setUser((prevUser) => ({ ...prevUser, photoURL: downloadURL }));
//             setLoading(false);
//             setIsChangeImg(false);
//           } catch (error) {
//             console.error("Error updating profile image:", error);
//             setError(true);
//             setLoading(false);
//           }
//         }
//       );
//     }
//   };

//   // console.log(user.photoURL);
//   return (
//     <div className="profile">
//       <div className="profile-header">
//         {isChangeImg && (
//           <Modal addArticleHandler={addArticleHandler}>
//             <div className="change-img-container">
//               <h2>Change Profile Photo</h2>
//               <input
//                 type="file"
//                 id="file-input"
//                 style={{ display: "none" }}
//                 onChange={handleImageChange}
//               />
//               <button
//                 className="upload-btn"
//                 onClick={() => document.getElementById("file-input").click()}
//               >
//                 {loading ? "Uploading..." : "Upload Photo"}
//               </button>
//               {error && <p>Error uploading image. Please try again.</p>}
//               <button
//                 className="cancel-btn"
//                 onClick={() => {
//                   addArticleHandler(false);
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </Modal>
//         )}
//         {user && (
//           <img
//             src={
//               user.photoURL ||
//               "/src/assets/blank-profile-picture-973460_1280.webp"
//             }
//             alt=""
//             style={
//               params.userId == currentUser?.uid
//                 ? { cursor: "pointer" }
//                 : undefined
//             }
//             title={
//               params.userId == currentUser?.uid
//                 ? "Change profile photo"
//                 : undefined
//             }
//             onClick={() => {
//               params.userId == currentUser?.uid
//                 ? addArticleHandler(true)
//                 : undefined;
//             }}
//           />
//         )}
//         <h2>{user.uName}</h2>

//         <div className="account-info">
//           <div className="followers">
//             <strong>10k</strong> followers
//           </div>
//           <div className="likes">
//             <strong>30k</strong> likes
//           </div>
//         </div>
//       </div>

//       <UserPosts />
//     </div>
//   );
// }
// import React, { useEffect, useState, useContext } from "react";
// import "./Profile.css";
// import { AuthContext } from "../../context/AuthContext";
// import { useParams } from "react-router-dom";
// import UserPosts from "./UserPosts";
// import {
//   collection,
//   getDocs,
//   query,
//   where,
//   doc,
//   updateDoc,
// } from "firebase/firestore";
// import { db, storage } from "../../firebase";
// import Modal from "../UI/Modal";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// export default function Profile() {
//   const { currentUser, setCurrentUser } = useContext(AuthContext);
//   const [user, setUser] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const params = useParams();
//   const meta = currentUser?.metadata;
//   const milliseconds =
//     user?.creationTime?.seconds * 1000 +
//     user?.creationTime?.nanoseconds / 1000000;
//   const date = new Date(milliseconds);

//   const creationTime = date.toLocaleDateString();

//   // changing image
//   const [isChangeImg, setIsChangeImg] = useState(false);
//   const addArticleHandler = (bool) => {
//     setIsChangeImg(bool);
//   };

//   useEffect(() => {
//     const fetchUser = async () => {
//       const q = query(
//         collection(db, "users"),
//         where("uid", "==", params.userId)
//       );
//       const querySnapshot = await getDocs(q);
//       setUser(querySnapshot.docs[0].data());
//     };

//     fetchUser();
//   }, [params.userId]);

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setLoading(true);
//       const storageRef = ref(storage, `profileImages/${currentUser?.uid}`);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on(
//         "state_changed",
//         null,
//         (error) => {
//           console.error("Upload failed:", error);
//           setError(true);
//           setLoading(false);
//         },
//         async () => {
//           try {
//             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

//             // Update photoURL in users collection
//             const userRef = doc(db, "users", currentUser?.uid);
//             await updateDoc(userRef, { photoURL: downloadURL });

//             // Update photoURL in posts collection
//             const q = query(
//               collection(db, "posts"),
//               where("uid", "==", currentUser?.uid)
//             );
//             const querySnapshot = await getDocs(q);
//             const updatePromises = querySnapshot.docs.map((docSnapshot) => {
//               const postRef = doc(db, "posts", docSnapshot.id);
//               return updateDoc(postRef, { photoURL: downloadURL });
//             });
//             await Promise.all(updatePromises);

//             // Update in the context
//             setCurrentUser((prevUser) => ({
//               ...prevUser,
//               photoURL: downloadURL,
//             }));

//             setUser((prevUser) => ({ ...prevUser, photoURL: downloadURL }));
//             setLoading(false);
//             setIsChangeImg(false);
//           } catch (error) {
//             console.error("Error updating profile image:", error);
//             setError(true);
//             setLoading(false);
//           }
//         }
//       );
//     }
//   };

//   // console.log(currentUser?.creationTime);
//   return (
//     <div className="profile">
//       <div className="profile-header">
//         {isChangeImg && (
//           <Modal addArticleHandler={addArticleHandler}>
//             <div className="change-img-container">
//               <h2>Change Profile Photo</h2>
//               <input
//                 type="file"
//                 id="file-input"
//                 style={{ display: "none" }}
//                 onChange={handleImageChange}
//               />
//               <button
//                 className="upload-btn"
//                 onClick={() => document.getElementById("file-input").click()}
//               >
//                 {loading ? "Uploading..." : "Upload Photo"}
//               </button>
//               {error && <p>Error uploading image. Please try again.</p>}
//               <button
//                 className="cancel-btn"
//                 onClick={() => {
//                   addArticleHandler(false);
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </Modal>
//         )}
//         {user && (
//           <img
//             src={
//               user.photoURL ||
//               "/src/assets/blank-profile-picture-973460_1280.webp"
//             }
//             alt=""
//             style={
//               params.userId == currentUser?.uid
//                 ? { cursor: "pointer" }
//                 : undefined
//             }
//             title={
//               params.userId == currentUser?.uid
//                 ? "Change profile photo"
//                 : undefined
//             }
//             onClick={() => {
//               params.userId == currentUser?.uid
//                 ? addArticleHandler(true)
//                 : undefined;
//             }}
//           />
//         )}
//         <h2>{user.uName}</h2>
//         <p>Joined At {creationTime}</p>

//         {/* <div className="account-info">
//           <div className="followers">
//             <strong>10k</strong> followers
//           </div>
//           <div className="likes">
//             <strong>30k</strong> likes
//           </div>
//         </div> */}
//       </div>

//       <UserPosts />
//     </div>
//   );
// }
import React, { useEffect, useState, useContext, useCallback } from "react";
import "./Profile.css";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import UserPosts from "./UserPosts";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import Modal from "../UI/Modal";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage"; // Ensure you have this utility

export default function Profile({ searchTerm }) {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isChangeImg, setIsChangeImg] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false); // New state
  const [uploading, setUploading] = useState(false); // New state

  const params = useParams();
  const meta = currentUser?.metadata;
  const milliseconds =
    user?.creationTime?.seconds * 1000 +
    user?.creationTime?.nanoseconds / 1000000;
  const date = new Date(milliseconds);

  const creationTime = date.toLocaleDateString();

  const addArticleHandler = (bool) => {
    setIsChangeImg(bool);
    if (!bool) {
      setImageSrc(null); // Reset imageSrc when closing modal
      setImageUploaded(false); // Reset imageUploaded state
      setUploading(false); // Reset uploading state
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result);
        setImageUploaded(true); // Set imageUploaded to true when a new image is selected
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setUploading(true); // Set uploading to true when upload starts
      handleImageUpload(croppedImage);
    } catch (e) {
      console.error(e);
      setError(true);
    }
  }, [imageSrc, croppedAreaPixels]);

  const handleImageUpload = async (croppedImage) => {
    setLoading(true);
    const storageRef = ref(storage, `profileImages/${currentUser?.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, croppedImage);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.error("Upload failed:", error);
        setError(true);
        setLoading(false);
        setUploading(false); // Reset uploading state on error
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Update photoURL in users collection
          const userRef = doc(db, "users", currentUser?.uid);
          await updateDoc(userRef, { photoURL: downloadURL });

          // Update photoURL in posts collection
          const q = query(
            collection(db, "posts"),
            where("uid", "==", currentUser?.uid)
          );
          const querySnapshot = await getDocs(q);
          const updatePromises = querySnapshot.docs.map((docSnapshot) => {
            const postRef = doc(db, "posts", docSnapshot.id);
            return updateDoc(postRef, { photoURL: downloadURL });
          });
          await Promise.all(updatePromises);

          // Update in the context
          setCurrentUser((prevUser) => ({
            ...prevUser,
            photoURL: downloadURL,
          }));

          setUser((prevUser) => ({ ...prevUser, photoURL: downloadURL }));
          setLoading(false);
          setIsChangeImg(false);
          setImageSrc(null); // Reset imageSrc
          setImageUploaded(false); // Reset imageUploaded state
          setUploading(false); // Reset uploading state
        } catch (error) {
          console.error("Error updating profile image:", error);
          setError(true);
          setLoading(false);
          setUploading(false); // Reset uploading state on error
        }
      }
    );
  };

  useEffect(() => {
    const fetchUser = async () => {
      const q = query(
        collection(db, "users"),
        where("uid", "==", params.userId)
      );
      const querySnapshot = await getDocs(q);
      setUser(querySnapshot.docs[0].data());
    };

    fetchUser();
  }, [params.userId]);

  return (
    <div className="profile">
      <div className="profile-header">
        {isChangeImg && (
          <Modal addArticleHandler={addArticleHandler}>
            <div className="change-img-container">
              <h2>Change Profile Photo</h2>
              {imageSrc ? (
                <>
                  <div
                    style={{ position: "relative", width: "100%", height: 400 }}
                  >
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  </div>
                  {!uploading ? (
                    <button className="upload-btn" onClick={showCroppedImage}>
                      Upload
                    </button>
                  ) : (
                    <p className="uploading-message">Uploading...</p>
                  )}
                </>
              ) : (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onSelectFile}
                    id="file-input"
                    style={{ display: "none" }}
                  />
                  <button
                    className="upload-btn"
                    onClick={() =>
                      document.getElementById("file-input").click()
                    }
                  >
                    {loading ? "Uploading..." : "Upload Photo"}
                  </button>
                </>
              )}
              {error && <p>Error uploading image. Please try again.</p>}
              <button
                className="cancel-btn"
                onClick={() => {
                  addArticleHandler(false);
                }}
              >
                Cancel
              </button>
            </div>
          </Modal>
        )}
        {user && (
          <img
            className="profile-img"
            src={
              user.photoURL ||
              "/src/assets/blank-profile-picture-973460_1280.webp"
            }
            alt=""
            style={
              params.userId === currentUser?.uid
                ? { cursor: "pointer" }
                : undefined
            }
            title={
              params.userId === currentUser?.uid
                ? "Change profile photo"
                : undefined
            }
            onClick={() => {
              params.userId === currentUser?.uid
                ? addArticleHandler(true)
                : undefined;
            }}
          />
        )}
        <h2>{user.uName}</h2>
        <p>Joined At {creationTime}</p>

        <UserPosts searchTerm={searchTerm} />
      </div>
    </div>
  );
}
