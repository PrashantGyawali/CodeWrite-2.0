import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import checkIcon from "../assets/checkIcon.svg"
import copyButton from "../assets/copyButton.svg"
import shareIcon from "../assets/shareIcon.svg"

function ShareModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [copied,setCopied]=useState(false);

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText("https://LoremipsumdolorsimetconsecteturadipisicingelitFugaquas?");
    setCopied(true);
  }

  useEffect(async()=>{
    const url=await fetch("https://codewrite-server.onrender.com/deployments",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      
    })
  },[])


  useEffect(()=>{
    if(copied)
    {
      setTimeout(()=>{setCopied(false)},2000);
    }
  },[copied]);


  return (
    <>
      <Button variant="primary" onClick={handleShow} className='w-100 '>
        <img src={shareIcon}></img> {" "}Share 
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" contentClassName='overflow-hidden'>
      <div style={{backgroundColor:"black", color:"white"}}>

        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>Share Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>             
            <Button  className='text-white text-wrap text-break btn-outline-secondary w-100' onClick={copyToClipboard} style={{textAlign:"left", backgroundColor:"rgb(36,36,36)"}}>https://LoremipsumdolorsimetconsecteturadipisicingelitFugaquas?
            <Button variant='dark' className='float-end' onClick={copyToClipboard}><img src={copied?checkIcon:copyButton} className="float-end" /></Button>
            </Button>
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