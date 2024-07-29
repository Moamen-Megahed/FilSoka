import React from "react";
import "./Pagination.css";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";

export default function Pagination({
  postsPerPage,
  totalPosts,
  currentPage,
  setCurrentPage,
}) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="pagination-container">
      <div
        className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        onClick={handlePrev}
      >
        <GrFormPrevious />
        <span>Previous</span>
      </div>
      <div
        className={`next ${currentPage === totalPages ? "disabled" : ""}`}
        onClick={handleNext}
      >
        <span>Next</span>
        <MdNavigateNext />
      </div>
    </div>
  );
}
