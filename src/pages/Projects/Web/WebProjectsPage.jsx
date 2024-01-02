import { useState} from 'react';
import  { createNewProject } from '../../../hooks/ProjectFunctions';
import CreatingNewProjectElement from '../CreateNewProjectInput';
import ProjectList from '../ProjectsList';

export default function WebProjectsPage() {
    const [creatingNewProject,setCreatingNewProject]=useState();
    const handleCLick=()=>{
        const id=String(Number(createNewProject("web",{})));
        setCreatingNewProject(id);   
    }


  return (
    <div>
        <button onClick={handleCLick}>+New Project</button> <br></br>
            {creatingNewProject && <CreatingNewProjectElement id={creatingNewProject} type="web" setCreatingNewProject={setCreatingNewProject} />}
            <ProjectList type="web"/>
    </div>
  )
}
