import { Button } from 'react-bootstrap'
import {useContext} from 'react'
import forkIcon from "../../assets/forkIcon.svg"
import { createNewProject } from '../../hooks/ProjectFunctions';
import { ProjectCodeContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import useUrl from '../../hooks/UrlClassify';

export default function ForkSettings() {
    const type=useUrl();
    const navigate=useNavigate();

    const projectData=useContext(ProjectCodeContext);

    const forkProject=()=>{
        projectData.name=projectData.name+"-fork";
        if(projectData && projectData?.name )
        {
            let id= createNewProject(type,projectData);
            navigate(`/self/${type}/${id}`);
        }
    }       

return (
    <>
    <Button variant="dark" onClick={forkProject}>
        <img src={forkIcon}/>{" "}Fork
    </Button>
    </>
)
}
