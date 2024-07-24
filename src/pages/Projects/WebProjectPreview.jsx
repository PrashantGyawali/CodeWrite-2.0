/* eslint-disable react/prop-types */
import { useState,useRef, useEffect } from "react";

function WebProjectPreview({projectInfo,navigate})
{
  const [hoverState,setHoverState]=useState(false);
  let timer=useRef(0);
  let mouseEnterHandler=()=>{timer.current=setTimeout(()=>{if(timer!==null&&hoverState!=undefined&&hoverState!=null){setHoverState(true)}},1000)};
  let mouseExitHandler=()=>{clearTimeout(timer.current);if(hoverState){setHoverState(false)}}

  useEffect(()=>{
    return ()=>{clearTimeout(timer.current);}
  },[])


    return (
    <div className=' project-iframe-container' onClick={navigate} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseExitHandler} >
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
