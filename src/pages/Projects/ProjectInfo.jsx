import React,{useState, useEffect, useRef} from 'react'
import useProject from '../../hooks/ProjectFunctions';
import { Link } from 'react-router-dom';
import { deleteProject } from '../../hooks/deleteLocalStorage';
import editIcon from '../../assets/editIcon.svg';
import deleteIcon from '../../assets/deleteIcon.svg';
import cloudUpload from '../../assets/cloudUpload.svg';
import shareIcon from '../../assets/shareIcon.svg';

export default function ProjectInfo(props) {
  const [projectInfo,setProjectInfo]=useProject(props.projectType,props.projectId);

  const projectNameRef=useRef();
  
  const [projectName,setProjectName]=useState(projectInfo.name);
  const [projectNameEditing,setProjectNameEditing]=useState(false);

  useEffect(()=>{
      setProjectInfo({
      ...projectInfo,     
      name:projectName,
      dateModified:Date.now()
      });
  },[projectName]);

  useEffect(()=>{

    if(projectNameEditing)
    {
      projectNameRef.current.focus(); 
        projectNameRef.current.addEventListener("focusout",()=>{
          console.log("projectNameEditing");

          setProjectNameEditing(false);
        });
         projectNameRef.current.addEventListener('keyup', function (e) {
            if (e.key === 'Enter')
            {
              setProjectNameEditing(false);
            }
         });
    }
  },[projectNameEditing]);


  return (
    <div style={{display:"flex", gap:"10px"}}>
{
  !projectNameEditing?<Link to={`/self/${props.projectType}/${props.projectId}`}>{projectInfo.name}</Link>
:      <input value={projectName} ref={projectNameRef}   onChange={(e) => {setProjectName(e.target.value);}} />
}

        <div onClick={() => {}}><img src={cloudUpload}/></div>

        <div onClick={() => {}}><img src={shareIcon}/></div>


      { (new Date(projectInfo.dateModified)).toLocaleString()}
     --deployment 
      <div onClick={() => { setProjectNameEditing(true);}}><img src={editIcon}/></div>

        <div onClick={() => { deleteProject(props.projectId,props.projectType, props.updateProjects);}} ><img src={deleteIcon}/></div>
    </div>
  );
}
