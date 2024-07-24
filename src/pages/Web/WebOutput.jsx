import {memo, useContext, useEffect} from "react";
import "../../App.css";

import htmlWithConsole from "./htmlConsole";

import runbtn from "../../assets/run.svg";

import {autorunAtom,showConsoleAtom,showConsoleOnErrorAtom}  from "../../Store/OutputSettings";
import { useAtom,useAtomValue } from "jotai";
import {srcDocAtom} from "../../Store/ProjectContextStore";
import { ProjectCodeContext } from "../../App";


const OutputFrame=memo(({srcDoc})=>{
    return <iframe
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts allow-modals allow-forms"
        style={{flexGrow:1}}
    ></iframe>
});


function WebOutput() {
const [srcDoc,setSrcDoc]=useAtom(srcDocAtom);
const projectCode=useContext(ProjectCodeContext);

const showConsole=useAtomValue(showConsoleAtom);
const showConsoleOnError=useAtomValue(showConsoleOnErrorAtom);
const autorun=useAtomValue(autorunAtom);


useEffect(()=>{
    if (autorun) {
        const timeout = setTimeout(() => {
            setSrcDoc(htmlWithConsole(projectCode.html,projectCode.css,projectCode.js,showConsole,showConsoleOnError ))
        }, 1000);
    
        return () => clearTimeout(timeout);
    }
},[projectCode,autorun,setSrcDoc]);

useEffect(()=>{
    if(projectCode)
    {
        setSrcDoc(htmlWithConsole(projectCode.html,projectCode.css,projectCode.js,showConsole,showConsoleOnError ));
    }
},[showConsole,showConsoleOnError]);


return (
<>

    <div className="pane bottom-pane" style={{ position: "relative" }}>
    <OutputFrame srcDoc={srcDoc} code={projectCode}/>
    {!autorun && (
        <button
        onClick={() =>
            setSrcDoc(htmlWithConsole(projectCode.html,projectCode.css,projectCode.js,showConsole,showConsoleOnError ))
        }
        className="run-button"
        >
        <img src={runbtn} alt="" />
        </button>
    )}
    </div>
</>
);
}

export default memo(WebOutput);