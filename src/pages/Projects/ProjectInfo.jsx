import React,{useState, useEffect, useRef} from 'react'
import useProject from '../../hooks/ProjectFunctions';
import { useNavigate } from 'react-router-dom';
import { deleteProject } from '../../hooks/deleteLocalStorage';
import editIcon from '../../assets/editIcon.svg';
import deleteIcon from '../../assets/deleteIcon.svg';
import cloudUpload from '../../assets/cloudUpload.svg';
import shareIcon from '../../assets/shareIcon.svg';
import deployIcon from '../../assets/deployIcon.svg';
import expandIcon from '../../assets/expandIcon.svg';
import './Projects.css'
import { Button } from 'react-bootstrap';

const iconsData={
  "edit":"Edit Project Name",
  "delete":"Delete Project",
  "upload":"Save to Cloud",
  "share":"Share Project",
  "deploy":"Deploy Project"
}


export default function ProjectInfo(props) {

  const projectNameRef=useRef();
  const [projectInfo,setProjectInfo]=useProject(props.projectType,props.projectId);

  const navigate=useNavigate();

  const [projectName,setProjectName]=useState(projectInfo.name);
  const [projectNameEditing,setProjectNameEditing]=useState(false);


  const [minimized,setMinimized]=useState(window.innerWidth<573?true:false);


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
    const mediaQuery = window.matchMedia('(min-width: 572px)');

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

  return (
    <div className='project'>
    
      <div className='project-name-wrapper'>
      <div className="project-name-div" >
        {!projectNameEditing?<>
          <div  onClick={()=>navigate(`/self/${props.projectType}/${props.projectId}`)} className='project-link'> </div>
            <input value={projectInfo.name} onChange={()=>{}} className='editing-input' disabled/>
            </>
            :
            <input value={projectName} ref={projectNameRef} className='editing-input'  onChange={(e) => {setProjectName(e.target.value);}} />
          }
      </div>
        <div className={`minimize-btn  ${minimized?"":"opened"}`} onClick={()=>setMinimized(!minimized)}><img src={expandIcon}></img></div>
      </div>

      {/* date modified but shorter like 2 days ago and sth like that, no need to put seconds  */}
      {
        !minimized &&       
        <div className='project-info'>
        { (new Date(projectInfo.dateModified)).toLocaleString()}
  
          <div style={{display:"flex", gap:"10px", padding:"5px", flexWrap:"nowrap", alignItems:"center", justifyContent:"center"}}>
              {/* save to database */}
              <div onClick={() => {}} className='project-info-icon' title={iconsData["upload"]}><img src={cloudUpload}/></div>
  
              {/* create a /shared/web/id project on db */}
              <div onClick={() => {}} className='project-info-icon' title={iconsData["share"]}><img src={shareIcon}/></div>
  
            {props.projectType=="web" && <div onClick={() => {}} className='project-info-icon' title={iconsData["deploy"]}><img src={deployIcon}/></div> }
            <div onClick={() => { setProjectNameEditing(true);}} className='project-info-icon' title={iconsData["edit"]}><img src={editIcon}/></div>
  
            <div onClick={() => { deleteProject(props.projectId,props.projectType, props.updateProjects);}} className='project-info-icon' title={iconsData["delete"]}><img src={deleteIcon}/></div>
          </div>
        </div>
      }

    </div>
  );
}
