import React,{memo} from 'react'
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

return (
<div className="titlebar" style={titleBarPresence?{}:{display:"none"}} ref={titleBarRef} onClick={(e)=>e.stopPropagation()} >
    <div className="mac-iconbar">
    <div className="mac-icon bg-danger"></div>
    <div className="mac-icon bg-warning"></div>
    <div className="mac-icon bg-success"></div>
    </div>
        <input className={`titlebar-middle w-100 text-center overflow-hidden bg-transparent ${type}`} style={{outline:"none",border:"none",minWidth:0,width:"100%",flexShrink:1}} defaultValue={contentTypes[type].name}> 
        </input>    
    <div className="titlebar-right  w-100 text-end ">
        <img className="btn px-1" src={dashIcon} width="25px"></img>
        <img className="btn px-1" src={squareIcon} width="25px"></img>
        <i className="btn btn-close w-16px" onClick={()=>{setTitleBarPresence(false)}}></i>
    </div>
</div>
);
}

export default memo(TitleBar)