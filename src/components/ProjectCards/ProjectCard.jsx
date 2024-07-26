
import {useRef, useEffect} from 'react';
import PropTypes from 'prop-types'; 


export default function ProjectCards({projectInfo})
{
  let iframeref=useRef(null);
  let textDivRef=useRef(null);

  function scaling(){
    let scale=Math.min(window.innerWidth,285)/1080;
    if(window.innerWidth<685 && window.innerWidth>300)scale=scale*(1+(window.innerWidth-285)/680);

    if(iframeref.current)
    {
      iframeref.current.style.transform=`scale(${scale})`;
    }
  }

  useEffect(()=>{
    window.addEventListener("resize",()=>{
      scaling();
      if(iframeref.current && textDivRef.current)textDivRef.current.style.width=iframeref.current.getBoundingClientRect().width+"px";
    });
    if(iframeref.current&& textDivRef.current)textDivRef.current.style.width=iframeref.current.getBoundingClientRect().width+"px";
    scaling();
  },[]);



  return <> 
    <div style={{overflow:"hidden"}} className="grid-item">
      <iframe
          srcDoc={`<html>
          <head>
          <style> 
            ${projectInfo.css.trim()}
          </style>
          </head>
          <body style="margin:0px;overflow-Y:hidden;overflow-x:hidden; transform-origin:top left;">
          ${projectInfo.html.trim()}
          </body>
          <script >
          ${projectInfo.js.trim()}
          </script>
          </html>`}
          sandbox='allow-scripts'
          className='project-iframe'
          ref={iframeref}
        >
        </iframe>

    <a className="discover-text" ref={textDivRef} href={`/shared/web/${projectInfo.sharedURL}`}>{projectInfo.name}</a>
    </div>
  </>
}

ProjectCards.propTypes = {
  projectInfo: PropTypes.object.isRequired, // Add prop type validation for projectInfo
};
