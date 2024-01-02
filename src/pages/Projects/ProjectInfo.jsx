import React,{useState, useEffect, useRef} from 'react'
import useProject from '../../hooks/ProjectFunctions';
import { useNavigate } from 'react-router-dom';
import { deleteProject } from '../../hooks/deleteLocalStorage';
import editIcon from '../../assets/editIcon.svg';
import deleteIcon from '../../assets/deleteIcon.svg';
import cloudUpload from '../../assets/cloudUpload.svg';
import shareIcon from '../../assets/shareIcon.svg';
import deployIcon from '../../assets/deployIcon.svg';
import './Projects.css'

export default function ProjectInfo(props) {
  const [projectInfo,setProjectInfo]=useProject(props.projectType,props.projectId);
  const projectNameRef=useRef();

  const navigate=useNavigate();

  const [projectName,setProjectName]=useState(projectInfo.name);
  const [projectNameEditing,setProjectNameEditing]=useState(false);


  const [minimizeable,setMinimizable]=useState(false);


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
    if(window.innerWidth<545){
      setMinimizable(true);
    }},[])

  return (
    <div className='project'>
    {!projectNameEditing?
                        <div className='project-name-wrapper'>
                        <div className="project-name-div" >
                          <div  onClick={()=>navigate(`/self/${props.projectType}/${props.projectId}`)} className='project-link'> </div>
                            <input value={projectInfo.name} onChange={()=>{}} className='editing-input' disabled/>
                        </div>
                        {minimizeable&& <button className='minimize-btn'>V</button>}
                        </div>
                      :
                      <div className='project-name-wrapper'>
                      <div className='project-name-div'>
                        <input value={projectName} ref={projectNameRef} className='editing-input'  onChange={(e) => {setProjectName(e.target.value);}} />
                      </div>
                      {minimizeable&& <button className='minimize-btn'>V</button>}
                      </div>

    }

      {/* date modified but shorter like 2 days ago and sth like that, no need to put seconds  */}
      <div className='project-info'>
      { (new Date(projectInfo.dateModified)).toLocaleString()}

        <div style={{display:"flex", gap:"10px", padding:"5px", flexWrap:"nowrap", alignItems:"center", justifyContent:"center"}}>
            {/* save to database */}
            <div onClick={() => {}} className='project-info-icon'><img src={cloudUpload}/></div>

            {/* create a /shared/web/id project on db */}
            <div onClick={() => {}} className='project-info-icon'><img src={shareIcon}/></div>

          <div onClick={() => {}} className='project-info-icon'><img src={deployIcon}/></div>
          <div onClick={() => { setProjectNameEditing(true);}} className='project-info-icon'><img src={editIcon}/></div>

          <div onClick={() => { deleteProject(props.projectId,props.projectType, props.updateProjects);}} className='project-info-icon'><img src={deleteIcon}/></div>
        </div>
      </div>
    </div>
  );
}
