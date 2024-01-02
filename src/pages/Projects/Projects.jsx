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
    <section style={{backgroundColor:"rgba(0,0,0,0)"}} className='project-section'> 

    <div style={{fontSize:"30px",color:"white", backgroundColor:"rgb(36,36,36)"}}>Your projects</div>
    <div className="project-tab-row">
      <Link to="/projects/web" className={"tab "+webselected}>Web Projects</Link>
      <Link to="/projects/md" className={"tab "+markdownselected}>Markdowns</Link>
    </div>

    <br></br>

    <div>
    <Outlet/>
    </div>
    </section>
    
  )
}
