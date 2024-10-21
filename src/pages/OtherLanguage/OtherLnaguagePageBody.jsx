import React, { useCallback, useContext,useState,useEffect } from 'react'
import OtherLanguageEditorOutput from './OtherLanguageOutput';
import { ProjectCodeContext, SetProjectCodeContext } from '../../App';
import Editor from './OtherLanguageEditorComponent';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/localstorage';


export default function OtherLanguageCodePageBody() {
    const navigate=useNavigate();
    const [editorMinimize, setEditorMinimize] = useState(false);

    const code=useContext(ProjectCodeContext);
    const setCode=useContext(SetProjectCodeContext);

    const [lastOpened, setLastOpened] = useLocalStorage("lastOpened", {web:"",md:"","other-language":""});

    const handleMinimize = useCallback((resize) => {
            if(!resize)
            {
            if(editorMinimize==false)
            {
            setEditorMinimize(true);
            }
            else{
            setEditorMinimize(false);
            }
        }
        else{
            setEditorMinimize("resize");
        }
    });

    const [otherLanguageCode, setOtherLanguageCode] = useState(code?code["other-code"]?code["other-code"]:"":"");
    const [language, setLanguage] = useState(code?code["language"]?code["language"]:"c":"c");
    const [output, setOutput] = useState({});
    const [stdin, setStdin] = useState(code?code["stdin"]?code["stdin"]:"":"");
    //handle rerouting to projects if project id not found  or updating last opened route
    useEffect(() => {
        if(!code || !setCode)
        {
        navigate(`/projects/md`);
        }
        else{
            if(code?.id)
            {
                setLastOpened({...lastOpened,"other-language":code.id});
            }
        setCode({...code,"other-code":otherLanguageCode,"language":language,"stdin":stdin});
        }
    }, [otherLanguageCode,language,stdin]);

    

    
return (
    <div className="d-sm-flex mdeditor-container" >
        <Editor value={otherLanguageCode} stdin={stdin} setStdin={setStdin} language={language} onLanguageChange={setLanguage} fileName={code.name} onChange={setOtherLanguageCode} onRun={setOutput} minimized={editorMinimize} handleMinimize={handleMinimize}/>
        <OtherLanguageEditorOutput output={output}/>
    </div>  
)
}
