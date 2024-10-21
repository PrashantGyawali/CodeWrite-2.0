import NavComponent from '../../components/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import {  useState,useEffect } from 'react';
import '../../App.css'
import '../Editor/styles/Editor.css'

import { useParams } from 'react-router-dom';

import { ProjectCodeContext, SetProjectCodeContext } from '../../App';
import OtherLanguageCodePageBody from '../OtherLanguage/OtherLnaguagePageBody';




export default function SharedOther(){

const urlParams=useParams();

const [code, setCode] = useState(); 
const [error,setError]=useState(null);

useEffect(async ()=>{
const url="https://codewrite-server.onrender.com";
try{
    let result=await fetch(`${url}/shared/other-language/${urlParams.id}`);
    let data=await result.json();
    if(data.error){
    setError(data.error);         
    }
    else{
    setError(null);
    setCode({...data});
    }
}
catch(e){
    console.log(e);
}
},[])

    return (
        <>
        <SetProjectCodeContext.Provider value={setCode}>
            <ProjectCodeContext.Provider value={code}>
            <NavComponent shared={true}/>
            { (code && Object.keys(code).length>0 && !error) && (<OtherLanguageCodePageBody/>) }
            </ProjectCodeContext.Provider>
        </SetProjectCodeContext.Provider>
        </>
    )  
}
            


