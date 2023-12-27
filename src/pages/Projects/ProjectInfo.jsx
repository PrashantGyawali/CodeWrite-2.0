import React,{useState, useEffect, useRef} from 'react'
import useProject from '../../hooks/ProjectFunctions';
import { Link } from 'react-router-dom';

export default function ProjectInfo(props) {
  const [projectInfo,setProjectInfo]=useProject(props.projectType,props.projectId);
  console.log(projectInfo);


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
          setProjectNameEditing(false);
        });
         projectNameRef.current.addEventListener('keyup', function (e) {
            if (e.key === 'Enter')
            {
              setProjectNameEditing(false);
            }
         });
    }
  },[projectName,projectNameEditing])
  return (
    <div>
{
  !projectNameEditing?<Link to={`/self/${props.projectType}/${props.projectId}`}>{projectInfo.name}</Link>
:      <input
value={projectInfo.name}
ref={projectNameRef}        

onChange={(e) => {
  setProjectName(e.target.value);
}}
/>
}

      --CloudBackupSymbol--cloud cross symbol if not backed up--share icon--
      { (new Date(projectInfo.dateModified)).toLocaleString()}
     --deployment 
      <button onClick={() => {
          setProjectNameEditing(true);
        }}>Edit</button>
        <button>Delete</button>
    </div>
  );
}
