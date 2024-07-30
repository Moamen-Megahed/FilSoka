import React from "react";
import Login from "../components/login/Login";
import ReactDOM from "react-dom";

export default function LoginPage() {
  return (
    <>
      <Login />
      {ReactDOM.createPortal(
        <div className="not-responsive">{`Sorry It's Not Responsive Yet :(`}</div>,
        document.getElementById("overlays")
      )}
    </>
  );
}
