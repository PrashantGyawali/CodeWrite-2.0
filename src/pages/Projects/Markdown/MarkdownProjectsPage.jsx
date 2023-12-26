import { useState} from 'react';
import  { createNewProject } from '../../../hooks/ProjectFunctions';
import CreatingNewProjectElement from '../CreateNewProjectInput';


export default function MarkdownProjectsPage() {
    const [creatingNewProject,setCreatingNewProject]=useState();
    const handleCLick=()=>{
        const id=String(Number(createNewProject("md",null)));
        setCreatingNewProject(id);   
    }


  return (
    <div>
        <button onClick={handleCLick}>+New Project</button> <br></br>
            {creatingNewProject && <CreatingNewProjectElement id={creatingNewProject} type="md" setCreatingNewProject={setCreatingNewProject} />}
        <div>        ProjectName--CloudBackupSymbol--cloud cross symbol if not backed up--share icon--date modified-- EditIcon (to change name) deleteIcon    </div>

    </div>
  )
}
