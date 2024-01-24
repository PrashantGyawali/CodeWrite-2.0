import { memo, useEffect, useState} from "react";
import "../../App.css";
import NavComponent from "../../components/Navbar";
import WebEditorBody from "../Web/WebEditorBody";
import WebOutput from "../Web/WebOutput";
import { useParams} from "react-router-dom";
import { ProjectCodeContext,SetProjectCodeContext } from "../../App";


function SharedWeb() {

const urlParams=useParams();

const [code, setCode] = useState(); 
const [error,setError]=useState(null);

  useEffect(async ()=>{
    const url="https://codewrite-server.onrender.com";
    try{
        let result=await fetch(`${url}/shared/web/${urlParams.id}`);
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
    <SetProjectCodeContext.Provider value={setCode}>
      <ProjectCodeContext.Provider value={code}>
        <NavComponent shared={true} />
          { (code && Object.keys(code).length>0 && !error) && (<><WebEditorBody /><WebOutput/></>) }
      </ProjectCodeContext.Provider>
    </SetProjectCodeContext.Provider>
  );
}

export default memo(SharedWeb)