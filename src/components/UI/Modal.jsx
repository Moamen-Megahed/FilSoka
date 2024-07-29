import { Fragment } from "react";
import ReactDOM from "react-dom";

import "./Modal.css";

const Backdrop = ({ addArticleHandler }) => {
  return <div className="backdrop" onClick={() => addArticleHandler(false)} />;
};

const ModalOverlay = (props) => {
  return <div className="modal">{props.children}</div>;
};

const portalElement = document.getElementById("overlays");

const Modal = ({ children, addArticleHandler }) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop addArticleHandler={addArticleHandler} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
