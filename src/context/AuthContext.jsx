// import { onAuthStateChanged } from "firebase/auth";
// import { createContext, useEffect, useState } from "react";
// import { auth } from "../firebase";
// import { collection, onSnapshot } from "firebase/firestore";
// import { db } from "../firebase";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState({});
//   // get user
//   useEffect(() => {
//     const unSub = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//     });

//     return () => {
//       unSub();
//     };
//   }, []);
//   //get posts
//   const [posts, setPosts] = useState([]);
//   useEffect(() => {
//     const unSub = onSnapshot(collection(db, "posts"), (snapshot) => {
//       setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
//     });
//     return () => {
//       unSub();
//     };
//   }, []);

//   // //get users
//   // const [users, setusers] = useState([]);
//   // useEffect(() => {
//   //   const unSub = onSnapshot(collection(db, "users"), (snapshot) => {
//   //     setusers(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
//   //   });
//   //   return () => {
//   //     unSub();
//   //   };
//   // }, []);
//   // const usersId = users.map((user) => ({ id: user.id }));
//   // // console.log(usersId);
//   return (
//     <AuthContext.Provider value={{ currentUser, posts }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// import { onAuthStateChanged } from "firebase/auth";
// import { createContext, useEffect, useState } from "react";
// import { auth } from "../firebase";
// import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
// import { db } from "../firebase";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState({});
//   const [loadingUser, setLoadingUser] = useState(true);
//   const [posts, setPosts] = useState([]);
//   const [loadingPosts, setLoadingPosts] = useState(true);

//   // get user
//   useEffect(() => {
//     const unSub = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       setLoadingUser(false); // Finished loading user
//     });

//     return () => {
//       unSub();
//     };
//   }, []);

//   // get posts
//   useEffect(() => {
//     const unSub = onSnapshot(collection(db, "posts"), (snapshot) => {
//       setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
//       setLoadingPosts(false); // Finished loading posts
//     });
//     return () => {
//       unSub();
//     };
//   }, []);

//   // delete posts

//   const deletePostHandler = async (postId) => {
//     const postRef = doc(db, "posts", postId);
//     await deleteDoc(postRef);
//   };
//   console.log(currentUser.photoURL);

//   return (
//     <AuthContext.Provider
//       value={{
//         currentUser,
//         posts,
//         loadingUser,
//         loadingPosts,
//         deletePostHandler,
//         setCurrentUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setCurrentUser(userDoc.data());
        } else {
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
      setLoadingUser(false);
    });

    return () => {
      unSub();
    };
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
      setLoadingPosts(false);
    });
    return () => {
      unSub();
    };
  }, []);

  const deletePostHandler = async (postId) => {
    const postRef = doc(db, "posts", postId);
    await deleteDoc(postRef);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        posts,
        loadingUser,
        loadingPosts,
        deletePostHandler,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
