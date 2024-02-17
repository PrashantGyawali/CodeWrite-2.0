import React,{memo, useEffect} from 'react'
//buttoms

import squareIcon from "../../assets/squareIcon.svg";
import dashIcon from "../../assets/dashIcon.svg";
import { useAtom } from 'jotai';
import { scTitleBarAtom,scTitleBarTypeAtom } from '../../Store/ScreenshotStore';

const contentTypes = {
    xml: {value:"html", type: "text/xml", name: "index.html"},
    css: {value:"css", type: "text/css", name: "style.css"},
    javascript: {value:"js", type: "text/javascript", name: "script.js"},
    markdown: {value:"md", type: "text/markdown", name: "markdown.md", },
};

function TitleBar({titleBarRef,type}) {

const [titleBarPresence,setTitleBarPresence]=useAtom(scTitleBarAtom);
const [titleBarType,setTitleBarType]=useAtom(scTitleBarTypeAtom);

useEffect(()=>{setTitleBarType("macwindows")},[]); 

return (
<div className="titlebar" style={titleBarPresence?{}:{display:"none"}} ref={titleBarRef} onClick={(e)=>e.stopPropagation()} >
    <div className={`w-100`}>
        <div className={`mac-iconbar ${titleBarType?.includes("mac")?"":"d-none"}`}>
            <div className="mac-icon bg-danger cursor-pointer" onClick={()=>{let newTitlebarType=String(titleBarType);setTitleBarType(newTitlebarType.replace("mac",""))}} title="Remove Mac titlebar"></div>
            <div className="mac-icon bg-warning"></div>
            <div className="mac-icon bg-success"></div>
        </div>  
    </div>
        <input className={`titlebar-middle w-100 text-center overflow-hidden bg-transparent ${type}`} style={{outline:"none",border:"none",minWidth:0,width:"100%",flexShrink:1}} defaultValue={contentTypes[type].name}> 
        </input>    
    <div className={`titlebar-right  w-100 text-end `}>
        <div className={`${titleBarType?.includes("windows")?"":"d-none"}`}>
        <img className="btn px-1" src={dashIcon} width="25px" onClick={()=>{let newTitlebarType=String(titleBarType);setTitleBarType(newTitlebarType.replace("windows",""))}} title="Remove Windows titlebar"></img>
        <img className="btn px-1" src={squareIcon} width="25px"></img>
        <i className="btn btn-close w-16px" onClick={()=>{setTitleBarPresence(false)}}  title="Remove titlebar"></i>
        </div>
    </div>
</div>
);
}

export default memo(TitleBar)