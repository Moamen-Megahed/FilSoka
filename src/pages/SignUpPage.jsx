import React from "react";
import SignUp from "../components/login/SignUp";
import ReactDOM from "react-dom";

export default function SignUpPage() {
  return (
    <>
      <SignUp />
      {ReactDOM.createPortal(
        <div className="not-responsive">{`Sorry It's Not Responsive Yet :(`}</div>,
        document.getElementById("overlays")
      )}
    </>
  );
}
