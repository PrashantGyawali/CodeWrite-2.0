import React, { useEffect, useState } from 'react'
import useUrl from '../../hooks/UrlClassify'
import useLocalStorage from '../../hooks/localstorage';
import ProjectInfo from './ProjectInfo';
export default function ProjectList() {

  const projectType=useUrl()||"web";
  const [projects,setProjects]=useLocalStorage(`${projectType}-projects`,{});

  let validProjects=Object.entries(projects).filter((project)=>{return project[1]==true});

  useEffect(() => {  
    validProjects=Object.entries(projects).filter((project)=>{return project[1]==true});

    }, [projects]);


  return (
    <>
        {projects && validProjects.map((project)=>{return <ProjectInfo key={project[0]} projectType={projectType} projectId={project[0]} updateProjects={setProjects}/>})}
    </>
  )
}
