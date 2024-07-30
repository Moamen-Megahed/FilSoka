import React from "react";
import "./NotFoundPage.css";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-text">404 - Page Not Found</h1>
      <div className="redirect">
        <span>You Wanna Go Home Page?</span>
        <Link to={"./"}>HOME</Link>
      </div>
    </div>
  );
}
