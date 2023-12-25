import React from 'react'
import { Link, Outlet,useLocation } from 'react-router-dom'

export default function Projects() {
  const location=useLocation();
  let webselected="";
  let markdownselected="";
  if(location.pathname.search("web")!= -1)
  {
    webselected="selected"
  }
  else if(location.pathname.search("markdown")!= -1)
  {
    markdownselected="selected"
  };
  return (
    <>
    <div>Your projects</div>
    <Link to="/projects/web" className={webselected}>Web Projects</Link> < Link to="/projects/markdown" className={markdownselected}>Markdowns</Link><br></br>
    {/* there will be tab to these */}
    <Outlet/>
    {/* this will be a separate component that will be shown when you visit /self/web */}


    <br></br>
    {/* this will be a separate component that will be shown when you visit /self/web */}
    
    </>
    
  )
}
