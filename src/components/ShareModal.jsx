import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import copyButton from "../assets/copyButton.svg"
import shareIcon from "../assets/shareIcon.svg"

function ShareModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <img src={shareIcon}></img> {" "}Share 
      </Button>

      <Modal show={show} onHide={handleClose} >
      <div style={{backgroundColor:"black", color:"white"}}>

        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>Share Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>https:// Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, quas?
            <Button ><img src={copyButton}></img></Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </div>
      </Modal>

    </>
  );
}

export default ShareModal;