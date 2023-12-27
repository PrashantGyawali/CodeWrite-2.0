import React from 'react'
import { Link, Outlet,useLocation } from 'react-router-dom'
import LoginNavComponent from '../../components/LoginNavBar';
import "./Projects.css"

export default function Projects() {
  const location=useLocation();
  let webselected="";
  let markdownselected="";
  if(location.pathname.search("web")!= -1)
  {
    webselected="selected"
  }
  else if(location.pathname.search("md")!= -1)
  {
    markdownselected="selected"
  };
  return (
    <>
     <LoginNavComponent/>

    <div>Your projects</div>
    <div className="project-tab-row">
      <Link to="/projects/web" className={"tab "+webselected}>Web Projects</Link>
      <Link to="/projects/md" className={"tab "+markdownselected}>Markdowns</Link>
    </div>
    <br></br>

    <Outlet/>
    
    </>
    
  )
}
