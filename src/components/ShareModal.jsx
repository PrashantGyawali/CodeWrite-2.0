import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import checkIcon from "../assets/checkIcon.svg"
import copyButton from "../assets/copyButton.svg"
import shareIcon from "../assets/shareIcon.svg"
import { ProjectContext } from '../pages/Web/Webeditor';
import { Container } from 'react-bootstrap';

function ShareModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [copied,setCopied]=useState(false);

  const {code,setCode}=useContext(ProjectContext);


  const copyToClipboard = () => {
    window.navigator.clipboard.writeText("https://LoremipsumdolorsimetconsecteturadipisicingelitFugaquas?");
    setCopied(true);
  }

  useEffect(async()=>{
    if(!show) return;
    const url=await fetch("https://codewrite-server.onrender.com/share",
    {
      method:"POST",
      mode: "cors",
      headers:{
        "Content-Type":"application/json",
      },
      cache: "no-cache",
      credentials: "include", 
      body:JSON.stringify(code)
    })
    const data=await url.json();
    console.log(data);
},[show])


  useEffect(()=>{
    if(copied)
    {
      setTimeout(()=>{setCopied(false)},2000);
    }
  },[copied]);


  return (
    <>
      <Button  onClick={handleShow} className='w-100 bg-transparent btn-outline-secondary text-white '>
        <img src={shareIcon}></img> {" "}Share 
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" contentClassName='overflow-hidden'>
      <div style={{backgroundColor:"black", color:"white"}}>

        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>Share Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>             
            <Button  className='text-white text-wrap text-break btn-outline-secondary w-100' onClick={copyToClipboard} style={{textAlign:"left", backgroundColor:"rgb(36,36,36)"}}>https://LoremipsumdolorsimetconsecteturadipisicingelitFugaquas?
            <div  className='float-end bg-dark' onClick={copyToClipboard}><img src={copied?checkIcon:copyButton} className="float-end" /></div>
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