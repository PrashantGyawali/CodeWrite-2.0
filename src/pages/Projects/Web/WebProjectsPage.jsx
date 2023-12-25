import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useState,useRef } from 'react';
import useProject, { createNewProject } from '../ProjectFunctions';
import CreatingNewProjectElement from '../CreateNewProjectInput';


export default function WebProjectsPage() {
    const [creatingNewProject,setCreatingNewProject]=useState();
    const handleCLick=()=>{
        const id=String(Number(createNewProject("web",null)));
        setCreatingNewProject(id);   
    }


  return (
    <div>
        <button onClick={handleCLick}>+New Project</button> <br></br>
            {creatingNewProject && <CreatingNewProjectElement id={creatingNewProject} type="web" setCreatingNewProject={setCreatingNewProject} />}
        <div>        ProjectName--CloudBackupSymbol--cloud cross symbol if not backed up--share icon--date modified--deployment EditIcon (to change name) deleteIcon    </div>

    </div>
  )
}
