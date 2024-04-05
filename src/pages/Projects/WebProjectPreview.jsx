import { useState } from "react";

function WebProjectPreview({projectInfo,projectType,projectId,navigate})
{
  const [hoverState,setHoverState]=useState(false);
    return (
    <div className=' project-iframe-container' onClick={()=>navigate(`/self/${projectType}/${projectId}`)} onMouseEnter={()=>{setHoverState(true)}} onMouseLeave={()=>{setHoverState(false)}} >
    <iframe
      srcDoc={`<html>
      <head>
      <style> 
        ${projectInfo.css.trim()}
      </style>
      </head>
      <body style="margin:0px;overflow-Y:hidden;overflow-x:hidden; transform-origin:top left; ${hoverState?'transform:scale(2.5)':''} ">
      ${projectInfo.html.trim()}
      </body>
      <script >
      ${projectInfo.js.trim()}
      </script>
      </html>`}
      title={projectInfo.name}
      sandbox='allow-scripts'
      className='project-iframe'
      style={{transform:`scale(${(Math.min(window.innerWidth,285)/1380).toString()})`}}
    >
    </iframe>
  </div>
  );
}

export default WebProjectPreview;
