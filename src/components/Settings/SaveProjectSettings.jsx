import React,{memo, useContext, useState,useEffect, useCallback} from 'react'
import { Button } from 'react-bootstrap'
import { ProjectCodeContext, SetProjectCodeContext } from "../../App";
import cloudUpload from "../../assets/cloudUpload.svg"
import cloudSavedIcon from "../../assets/cloudSavedIcon.svg"
import cloudErrorIcon from "../../assets/cloudErrorIcon.svg"
import { SettingsContext } from '../../App';
import { useNavigate } from 'react-router-dom';

function SaveProjectSettings() {

    const code=useContext(ProjectCodeContext);
    const {user,editor}=useContext(SettingsContext)
    const setCode=useContext(SetProjectCodeContext);
    const [saved, setSaved] = useState(new Date(code?.dateSaved).getTime()>new Date(code?.dateModified).getTime());

    const navigate=useNavigate();



    useEffect(()=>{
        if(!code?.dateSaved || new Date(code.dateSaved).getTime()<new Date(code.dateModified).getTime())
        {
            setSaved(false);
        }
        else
        {
            setSaved(true);
        }
    },[code?.dateSaved,code?.dateModified]);

    const  saveToCloud=useCallback( async()=>{
        if(user?.isAuth)
        {
            const dateSaved=Date.now();
            const url="https://codewrite-server.onrender.com";
            console.log
            let res= await fetch(url+"/save",
            {
                method:"POST",
                mode: "cors",
                headers:{
                    "Content-Type":"application/json",
                    "Access-Control-Allow-Credentials":true,
                },
                cache: "no-cache",
                credentials: "include", 
                body:JSON.stringify({
                    ...code, type:editor, dateSaved:dateSaved
                })
            })
            let resjson=await res.json();
            if(!resjson.error)
            {
                setCode({...code,dateSaved:dateSaved});
            }
        }
        else
        {
            navigate("/auth/login");
        }
    })

return (
    <Button className="w-nav-100" variant="secondary" onClick={saveToCloud} ><img src={saved?cloudSavedIcon:cloudUpload} className="icon-images" /> Save to cloud</Button>
    )
}

export default memo(SaveProjectSettings);
