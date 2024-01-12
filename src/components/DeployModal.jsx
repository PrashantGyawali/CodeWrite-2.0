import { useEffect, useState,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import checkIcon from "../assets/checkIcon.svg"
import copyButton from "../assets/copyButton.svg"
import deplyIcon from "../assets/deployIcon.svg"
import { ProjectContext } from '../pages/Web/Webeditor';

function DeployModal() {


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title,setTitle]=useState("");

  const [copied,setCopied]=useState(false);
  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(`https://codewrite.vercel.app/${code.deployment}`);
    setCopied(true);
  }



  const {code,setCode}=useContext(ProjectContext);


  useEffect(()=>{
    if(copied)
    {
      setTimeout(()=>{setCopied(false)},2000);
    }
  },[copied]);

  useEffect(async()=>{
    if(!show) return;
    console.log(code);  
    const url=await fetch("https://codewrite-server.onrender.com/deploy",
    {
      method:"POST",
      mode: "cors",
      headers:{
        "Content-Type":"application/json",
      },
      cache: "no-cache",
      credentials: "include", 
      body:JSON.stringify(code)
    });
    const data=await url.json();
    if(data.url)
    {
      setTitle("Deployed 🚀🚀 !!");
      setCode({...code,deployment:data.url});
    }
  },[show])


  return (
    <>
      <Button variant="primary" onClick={handleShow}  className='w-100 bg-transparent btn-outline-secondary text-white'>
        <img src={deplyIcon}></img> {" "}Deploy
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" contentClassName='overflow-hidden'>
      <div style={{backgroundColor:"black", color:"white"}}>

        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>{title?title:"Deploying..."}</Modal.Title>
        </Modal.Header>
        <Modal.Body>             
            <Button  className='text-white text-wrap text-break btn-outline-secondary w-100' onClick={copyToClipboard} style={{textAlign:"left", backgroundColor:"rgb(36,36,36)"}}>
              {(title && code.deployment)?`https://codewrite.vercel.app/${code.deployment}`:"..."}
            <div variant='dark' className='float-end' onClick={copyToClipboard}><img src={copied?checkIcon:copyButton} className="float-end" /></div>
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

export default DeployModal;