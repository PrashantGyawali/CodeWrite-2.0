import React,{useEffect,useRef,useState} from "react";
import { useNavigate } from "react-router-dom";
import useProject from "../../hooks/ProjectFunctions";
import "./Projects.css";

export default function CreatingNewProjectElement({id,type,setCreatingNewProject}){
    const navigate=useNavigate();
    const inputRef=useRef();
    const [projectInfo,setProjectInfo]=useProject(type,id);
    
    const [projectName,setProjectName]=useState("New Project "+ id);

    useEffect(()=>{
        let newName=projectName.trim()!=""?projectName:("New Project "+ id);
        if(typeof setProjectInfo == "function")
        {
            setProjectInfo({
                ...projectInfo,     
                name:newName
                });
        }
    },[projectName]);

    useEffect(()=>{
        inputRef.current.focus();
        inputRef.current.select();
        inputRef.current.addEventListener("focusout",()=>{
            setCreatingNewProject(false);
            navigate(`/self/${type}/${id}`);
        });
        inputRef.current.addEventListener('keyup', function (e) {
            if (e.key === 'Enter')
            {
                setCreatingNewProject(false);
                navigate(`/self/${type}/${id}`);
            }
        });
    },[])

    return(
        <div>
            <input ref={inputRef} type="text" placeholder="Enter Project Name" 
            value={projectName} onChange={(e)=>{setProjectName(e.target.value)}} />
        </div>
    )
};