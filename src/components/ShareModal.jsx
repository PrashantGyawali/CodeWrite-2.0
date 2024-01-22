import { memo, useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import  Modal from 'react-bootstrap/Modal';
import checkIcon from "../assets/checkIcon.svg"
import copyButton from "../assets/copyButton.svg"
import shareIcon from "../assets/shareIcon.svg"
import { useNavigate } from 'react-router-dom';
import { SettingsContext } from '../App';

import { ProjectCodeContext, SetProjectCodeContext } from '../App';
import TitleText from './TitleText';


function ShareModal() {
  const [show, setShow] = useState(false);
  const {user,editor}=useContext(SettingsContext);

  const navigate=useNavigate();


  const handleClose =() => setShow(false);
  const handleShow = () => setShow(true);

  const [copied,setCopied]=useState(false);

  const [title,setTitle]=useState("Sharing...");

  const code =useContext(ProjectCodeContext);
  const setCode=useContext(SetProjectCodeContext)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://codewrite-2.vercel.app/shared/${code.type}/${code.sharedURL}`);
    setCopied(true);
  }


  const [errorMsg,setErrorMsg]=useState("");

  useEffect(async()=>{
    if(!show) return;
    if(!user?.isAuth)
    {
      navigate("/auth/login");
    }
    else{
      const dateShared=Date.now();
      const url=await fetch("https://codewrite-server.onrender.com/share",
      {
        method:"POST",
        mode: "cors",
        headers:{
          "Content-Type":"application/json",
        },
        cache: "no-cache",
        credentials: "include", 
        body:JSON.stringify({...code,type:editor,dateShared:dateShared})
      })
      setTitle("Sharing...");
      const data=await url.json();
      if(data.url)
      {
        setTitle("Shared 🚀🚀 !!");
        setCode({...code,sharedURL:data.url,dateShared:dateShared});
      }
      else if(data.error!="")
      {
        setTitle("Error !!");
        setErrorMsg(data.error);
      }
    }   
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
        <img src={shareIcon} className="icon-images"></img> {" "}Share 
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" contentClassName='overflow-hidden'>
      <div style={{backgroundColor:"black", color:"white"}}>

        <Modal.Header closeButton closeVariant="white">
          <TitleText title={title}/>
        </Modal.Header>
        <Modal.Body>             
            <Button  className='text-white text-wrap text-break btn-outline-secondary w-100' onClick={copyToClipboard} style={{textAlign:"left", backgroundColor:"rgb(36,36,36)"}}>
            {(title && code.sharedURL && title!=="Error !!")?`https://codewrite-2.vercel.app/shared/${code.type}/${code.sharedURL}`: title=="Error !!"?errorMsg:"..."}
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

export default memo(ShareModal);