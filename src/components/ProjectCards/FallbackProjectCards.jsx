import { useEffect,useRef } from "react";

export default function FallbackProjects(){
    return(<>
          <TempProjectCards/>
          <TempProjectCards/>
          <TempProjectCards/>
          <TempProjectCards/>
          <TempProjectCards/>
          <TempProjectCards/>
          <TempProjectCards/>
          <TempProjectCards/>
          <TempProjectCards/>
          <TempProjectCards/>
          <TempProjectCards/>
          <TempProjectCards/>
                  </>
    )
    }
    
    function TempProjectCards()
    {

      let iframeref=useRef(null);
      let textDivRef=useRef(null);
    
      useEffect(()=>{
        window.addEventListener("resize",()=>{
          if(textDivRef.current && iframeref.current)textDivRef.current.style.width=iframeref.current.getBoundingClientRect().width+"px";
        });
        if(textDivRef.current && iframeref.current)textDivRef.current.style.width=iframeref.current.getBoundingClientRect().width+"px";
      },[]);
    
      return <> 
      <div style={{overflow:"hidden"}} className="grid-item">
        <iframe
            srcDoc={`<html>
            <head>
            <style>
              
            .lds-dual-ring,
            .lds-dual-ring:after {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-100%, 0%);
              box-sizing: border-box;
            }
            .lds-dual-ring {
              display: inline-block;
              width: 400px;
              height: 400px;
            }
            .lds-dual-ring:after {
              content: " ";
              display: block;
              width: 300px;
              height: 300px;
              margin: 8px;
              border-radius: 50%;
              border: 6.4px solid currentColor;
              border-color: currentColor transparent currentColor transparent;
              animation: lds-dual-ring 1.2s linear infinite;
            }
            @keyframes lds-dual-ring {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
            </style>
            </head>
            <body style="margin:0px;overflow-Y:hidden;overflow-x:hidden;position:relative;transform-origin:top left;">
            <div class="lds-dual-ring"></div>
            </body>
            <script >
            </script>
            </html>`}
            sandbox='allow-scripts'
            className='project-iframe'
            style={{transform:`scale(${(Math.min(window.innerWidth,285)/1080).toString()})`}}
            ref={iframeref}
          >
          </iframe>
  
      <a className="discover-text" ref={textDivRef} >Loading...</a>
      </div>
      </>
    }