import { memo,createContext } from "react";
import "../../App.css";
import NavComponent from "../../components/Navbar";
import WebEditorBody from "./WebEditorBody";
import WebOutput from "./WebOutput";
import useProject from "../../hooks/ProjectFunctions";
import { useParams} from "react-router-dom";
import { ProjectCodeContext,SetProjectCodeContext } from "../../App";


 function WebEditor() {

  const urlParams=useParams();
  const [code, setCode] = useProject("web",urlParams.id); 

  return (
    <SetProjectCodeContext.Provider value={setCode}>
      <ProjectCodeContext.Provider value={code}>
        <NavComponent />
        <WebEditorBody />
        <WebOutput/>
      </ProjectCodeContext.Provider>
    </SetProjectCodeContext.Provider>
  );
}

export default memo(WebEditor)