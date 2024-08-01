import Nav from "./components/navbar/Nav";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PostDetailsPage from "./pages/PostDetailsPage.jsx";
import Footer from "./components/footer/Footer.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <Nav setSearchTerm={setSearchTerm} />
      <Routes>
        <Route path="/" element={<HomePage searchTerm={searchTerm} />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route
          path="/profile/:userId"
          element={<ProfilePage searchTerm={searchTerm} />}
        ></Route>
        <Route path="/posts/:postId" element={<PostDetailsPage />}></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
