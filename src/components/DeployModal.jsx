import { useEffect, useState,memo,useRef, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import checkIcon from "../assets/checkIcon.svg"
import copyButton from "../assets/copyButton.svg"
import deplyIcon from "../assets/deployIcon.svg"
import { useNavigate } from 'react-router-dom';
import { SettingsContext } from '../App';


import { ProjectCodeContext, SetProjectCodeContext } from "../App"
import TitleText from './TitleText';

function DeployModal() {

  const buttonref=useRef(null);

  const [show, setShow] = useState(false);
  const handleClose =() => setShow(false);
  const handleShow = () => setShow(true);

  const navigate=useNavigate();
  const {user}=useContext(SettingsContext);



  const code=useContext(ProjectCodeContext);
  const setCode=useContext(SetProjectCodeContext)

  const [title,setTitle]=useState("Deploying...");

  const [copied,setCopied]=useState(false);
  const copyToClipboard = () => {
    buttonref.current.focus();
    navigator.clipboard.writeText(buttonref.current.innerText);
    setCopied(true);
  }


  useEffect(()=>{
    if(copied)
    {
      setTimeout(()=>{setCopied(false)},2000);
    }
  },[copied]);


  const [errorMsg,setErrorMsg]=useState("");


  useEffect(async()=>{
    if(!show) return;

    if(!user?.isAuth)
    {
      navigate("/auth/login");
    }

    else{ 
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
      setTitle("Deploying...");
      const data=await url.json();
      if(data.url)
      {
        setTitle("Deployed 🚀🚀 !!");
        setCode({...code,deployment:data.url,dateDeployed:Date.now()});
      }
      else if(data.error!="")
      {
        setTitle("Error !!");
        setErrorMsg(data.error);
      }
  }
  },[show])


  return (
    <>
      <Button variant="primary" onClick={handleShow}  className='w-100 bg-transparent btn-outline-secondary text-white'>
        <img src={deplyIcon} className="icon-images"></img> {" "}Deploy
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" contentClassName='overflow-hidden'>
      <div style={{backgroundColor:"black", color:"white"}}>

        <Modal.Header closeButton closeVariant="white">
          <TitleText title={title}/>
        </Modal.Header>
        <Modal.Body>             
            <Button  className='text-white text-wrap text-break btn-outline-secondary w-100' onClick={copyToClipboard} style={{textAlign:"left", backgroundColor:"rgb(36,36,36)"}} ref={buttonref}>
              {(title && code.deployment && title!=="Error !!")?`https://codewrite-2.vercel.app/deployments/${code.deployment}`: title=="Error !!"?errorMsg:"..."}
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

export default memo(DeployModal);