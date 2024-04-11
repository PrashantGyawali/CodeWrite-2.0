import React,{useState, useEffect, useRef, useContext} from 'react'
import useProject from '../../hooks/ProjectFunctions';
import { useNavigate } from 'react-router-dom';
import { deleteProject } from '../../hooks/deleteLocalStorage';
import editIcon from '../../assets/editIcon.svg';
import deleteIcon from '../../assets/deleteIcon.svg';
import cloudUpload from '../../assets/cloudUpload.svg';
import cloudErrorIcon from '../../assets/cloudErrorIcon.svg';
import cloudNotSaved from '../../assets/cloudNotFound.svg';
import cloudSavedIcon from '../../assets/cloudSavedIcon.svg';
import shareIcon from '../../assets/shareIcon.svg';
import deployIcon from '../../assets/deployIcon.svg';
import expandIcon from '../../assets/expandIcon.svg';
import './Projects.css'
import WebProjectPreview from './WebProjectPreview';
import MdProjectPreview from './MdProjectPreview';

import {useAtom} from 'jotai';
import cloudProjects from '../../Store/CloudProjects';
import { SettingsContext } from '../../App';

const iconsTitle={
  "edit":"Edit Project Name",
  "delete":"Delete Project",
  "share":"Share Project",
  "deploy":"Deploy Project"
}


export default function ProjectInfo(props) {

  const projectNameRef=useRef();
  const [projectInfo,setProjectInfo]=useProject(props.projectType,props.projectId);
  const navigate=useNavigate();
  let navigateFunction=()=>{navigate(`/self/${props.projectType}/${props.projectId}`)}

  const [projectName,setProjectName]=useState(projectInfo.name);
  const [projectNameEditing,setProjectNameEditing]=useState(false);


  const [minimized,setMinimized]=useState(window.innerWidth<573?true:false);

  const [projectsInfoFromCloud,setProjectInfoFromCloud]=useAtom(cloudProjects);
  let projectInfoFromCloud=projectsInfoFromCloud.filter((project)=>{return project.publicId==props.projectId && project.type==props.projectType})[0];

  const user=useContext(SettingsContext).user;


  const handleSaveToCloud=async()=>{
    if(user && user?.email)
    {
      if(cloudIcon[0]==cloudErrorIcon)
      {
        let choice=confirm("Error: Newer Version of Project Found in Cloud. Do you want to overwrite the cloud version with the local version?");
        if(choice)
        {
          setProjectInfo({...projectInfo,
            ...projectInfoFromCloud,dateModified:projectInfo.dateSaved}
          )
        }
      }
  
      else if(cloudIcon[0]==cloudUpload)
      {
            const dateSaved=Date.now();
            const url="https://codewrite-server.onrender.com";
            let res= await fetch(url+"/save",
            {
                method:"POST",
                mode: "cors",
                headers:{
                    "Content-Type":"application/json",
                    "Access-Control-Allow-Credentials":true,
                },
                cache: "no-cache",
                credentials: "include", 
                body:JSON.stringify({
                    ...projectInfo, dateSaved:dateSaved
                })
            })
            let resjson=await res.json();
            if(!resjson.error)
            {
                setProjectInfo({...projectInfo,dateSaved:dateSaved});
            }
        }
    }

      else
      {
        confirm("Please Login to Save Project to Cloud")?navigate("/auth/login"):null;
      }
    }



  useEffect(()=>{
    if(projectName!=projectInfo?.name && projectName!="" && !projectNameEditing)
    {
      setProjectInfo({
        ...projectInfo,     
        name:projectName,
        dateModified:Date.now()
        });
    }
    else{
      setProjectName(projectInfo.name); 
    }     
  },[projectNameEditing]);



  useEffect(() => {
    if (projectNameEditing) {
      projectNameRef.current.focus();
      projectNameRef.current.addEventListener("focusout", () => {
        setProjectNameEditing(false);
      });
      projectNameRef.current.addEventListener("keyup", function (e) {
        if (e.key === "Enter") {
          setProjectNameEditing(false);
        }
      });
    }
  }, [projectNameEditing]);


  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 300px)');

    const handleResize = (e) => {
      // e.matches will be true if the media query is satisfied
      setMinimized(!e.matches);
    };

    // Initial check
    handleResize(mediaQuery);

    // Listen for changes in media query matches
    mediaQuery.addEventListener("change",handleResize);
    // Clean up the event listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change",handleResize);
    };
  }, [setMinimized]);



  const cloudIcon=function()
  {
    if(new Date(projectInfoFromCloud?.dateSaved).getTime()>projectInfo.dateSaved){
      return [cloudErrorIcon,"Conflict: Newer Version of Project Found in Cloud"];
    }
    else if((new Date(projectInfo?.dateSaved)).getTime()>(new Date(projectInfo?.dateModified)).getTime()){
      return [cloudSavedIcon,"OK: Upto Date Project Saved to Cloud"];
    }
    else if((new Date(projectInfo?.dateSaved)).getTime()<(new Date(projectInfo?.dateModified)).getTime()){
      return [cloudUpload,"Unsaved Changes: Save to cloud"];
    }
    else if(projectInfo.dateSaved==""){
      return [cloudNotSaved,"Unsaved Changes: Not yet saved to cloud"];
    }
    else {
      return [cloudNotSaved,"Unsaved Changes: Save to cloud"];
    }
  }()

  return (
    <div className='project col'>
      { projectInfo.type=="web" && <WebProjectPreview projectInfo={projectInfo} projectType={props.projectType} projectId={props.projectId} navigate={navigateFunction}/> }
      { projectInfo.type=="md" && <MdProjectPreview projectInfo={projectInfo} navigate={navigateFunction}/> }


      <div className='w-100'>
      <div className='project-name-wrapper'>
      <div className="project-name-div" >
        {!projectNameEditing ?
        <>
          <div  onClick={()=>navigate(`/self/${props.projectType}/${props.projectId}`)} className='project-link'> </div>
            <input value={projectInfo.name} onChange={()=>{}} className='project-name-input' disabled/>
            </>
            :
            <input value={projectName} ref={projectNameRef} className='project-name-input'  onChange={(e) => {setProjectName(e.target.value);}} />
          }
      </div>
        <div className={`minimize-btn  ${minimized?"":"opened"}`} onClick={()=>setMinimized(!minimized)}><img src={expandIcon}></img></div>
      </div>

      {
        !minimized &&       
        <div className='project-info ps-2'>
        
          <span className="datespan" title="Last Modified">
            {(new Date(projectInfo.dateModified)).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
          </span>
  
          <div className="project-options-container">

              {/* save to database */}
              <div onClick={handleSaveToCloud} className='project-info-icon' title={cloudIcon[1]}><img src={cloudIcon[0]} className='icon-images'/></div>
  
              {/* create a /shared/web/id project on db */}
              <div onClick={() => {}} className='project-info-icon' title={iconsTitle["share"]}><img src={shareIcon}/></div>
  
            {props.projectType=="web" && <div onClick={() => {}} className='project-info-icon' title={iconsTitle["deploy"]}><img src={deployIcon}/></div> }

            <div onClick={() => { setProjectNameEditing(true);}} className='project-info-icon' title={iconsTitle["edit"]}><img src={editIcon}/></div>
  
            <div onClick={() => { deleteProject(props.projectId,props.projectType, props.updateProjects);}} className='project-info-icon' title={iconsTitle["delete"]}><img src={deleteIcon}/></div>
          </div>
        </div>
      }
      </div>
    </div>
  );
}
