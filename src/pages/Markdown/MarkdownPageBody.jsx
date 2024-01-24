import React, { useCallback, useContext,useState,useEffect } from 'react'
import MarkdownOutput from './MarkdownOutput'
import { ProjectCodeContext, SetProjectCodeContext } from '../../App';
import Editor from './MdEditorComponent';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/localstorage';


export default function MarkdownPageBody() {
    const navigate=useNavigate();
    const [mdMinimize, setMdMinimize] = useState(false);

    const code=useContext(ProjectCodeContext);
    const setCode=useContext(SetProjectCodeContext);

    const [lastOpened, setLastOpened] = useLocalStorage("lastOpened", {web:"",md:""});


    const handleMinimize = useCallback((resize) => {
            if(!resize)
            {
            if(mdMinimize==false)
            {
            setMdMinimize(true);
            }
            else{
            setMdMinimize(false);
            }
        }
        else{
            setMdMinimize("resize");
        }
    });

    const [markdown, setMarkdown] = useState( code?.md || "");


    //handle rerouting to projects if project id not found  or updating last opened route
    useEffect(() => {
        if(!code || !setCode)
        {
        navigate(`/projects/md`);
        }
        else{
            if(code?.id)
            {
                setLastOpened({...lastOpened,md:code.id});
            }
        setCode({...code,md:markdown})
        }
    }, [markdown])

    
return (
    <div className="d-sm-flex mdeditor-container" >
        <Editor language="markdown" displayname="Markdown" value={markdown} onChange={setMarkdown} minimized={mdMinimize} handleMinimize={handleMinimize}/>
        <MarkdownOutput markdown={markdown}/>
    </div>  
)
}
