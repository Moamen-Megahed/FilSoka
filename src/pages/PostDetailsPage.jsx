import React from "react";
import PostDetails from "../components/post_details/PostDetails";
import ReactDOM from "react-dom";

export default function PostDetailsPage() {
  return (
    <>
      <PostDetails />;
      {ReactDOM.createPortal(
        <div className="not-responsive">{`Sorry It's Not Responsive Yet :(`}</div>,
        document.getElementById("overlays")
      )}
    </>
  );
}
