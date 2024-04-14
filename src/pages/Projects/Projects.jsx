import React, { useEffect } from 'react'
import { Link, Outlet,useLocation} from 'react-router-dom'
import "./Projects.css"

import fetchCloudStorage from '../../hooks/cloudStorage';

import {useAtom} from 'jotai';
import cloudProjects from '../../Store/CloudProjects';
import { useContext } from 'react';
import { SettingsContext } from '../../App';


export default function Projects() {
  const location=useLocation();
  const user=useContext(SettingsContext).user;

  let webselected="";
  let markdownselected="";
  if(location.pathname.search("md")==-1)
  {
    webselected="selected"
  }
  else if(location.pathname.search("md")!= -1)
  {
    markdownselected="selected"
  };
  
  let [cloudProjectsList,setCloudProjectsList]=useAtom(cloudProjects);
  useEffect(async ()=>{
    if(!user || !user?.email)
    {
      setCloudProjectsList([]);
      return;
    }
    let cloudProjects=await fetchCloudStorage();

    // Simple error handling
    if(!cloudProjects)
    {
      setCloudProjectsList([]);
      console.log("No cloud projects found");
      return;
    }
    else if(cloudProjects.error)
    {
      setCloudProjectsList([]);
      console.log(cloudProjects.error);
      return;
    }

    
    setCloudProjectsList(cloudProjects);
  },[user])


  return (
    <section className='project-section'> 

    <h1 style={{fontSize:"30px",color:"white", backgroundColor:"rgb(36,36,36)",margin:"10px 0px 10px 10px"}}>Your projects</h1>
    <div className="project-tab-row">
      <Link to="/projects/web" className={"tab "+webselected}>Web Projects</Link>
      <Link to="/projects/md" className={"tab "+markdownselected}>Markdowns</Link>
    </div>
    <div className='projects-list'>
    <Outlet/>
    </div>
    </section>
    
  )
}
