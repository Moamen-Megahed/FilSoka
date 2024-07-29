import Nav from "./components/navbar/Nav";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PostDetailsPage from "./pages/PostDetailsPage.jsx";
import Footer from "./components/footer/Footer.jsx";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/profile/:userId" element={<ProfilePage />}></Route>
        <Route path="/posts/:postId" element={<PostDetailsPage />}></Route>
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
