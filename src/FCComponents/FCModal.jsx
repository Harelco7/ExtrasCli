// AuthModal.js
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import FCLoginModal from "./FCLoginModal";
import FCRegisterModal from "./FCRegisterModal";

const FCModal = ({ show, onHide, onSuccessfulLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>{isLogin ? "Sign In" : "Register"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* {isLogin ? (
          <FCLoginModal
          show={showLoginModal}
          onHide={() => setShowLoginModal(false)}
        //   onSuccessfulLogin={handleSuccessfulLogin}
        />
        ) : (
          <FCRegisterModal
            show={show}
            onHide={() => setShowRegisterModal(false)}
          />
        )} */}

        <div style={{ width: 200, height: 200 }}>{isLogin ? "sign in" : "register"}</div>
        <Button variant="secondary" onClick={handleToggle} block>
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Sign In"}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default FCModal;
