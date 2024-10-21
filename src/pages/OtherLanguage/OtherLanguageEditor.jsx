import NavComponent from '../../components/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import '../../App.css'
import '../Editor/styles/Editor.css'


import useUrl from '../../hooks/UrlClassify';
import useProject from '../../hooks/ProjectFunctions';
import { useParams } from 'react-router-dom';

import { ProjectCodeContext, SetProjectCodeContext } from '../../App';
import OtherLanguageCodePageBody from './OtherLnaguagePageBody';



export default function OtherLanguageEditor(){

  const type=useUrl();
  const id=useParams().id;


  const [code,setCode]=useProject(type,id);  
  
    return (
        <>
        <SetProjectCodeContext.Provider value={setCode}>
          <ProjectCodeContext.Provider value={code}>
            <NavComponent/>
            <OtherLanguageCodePageBody/>
          </ProjectCodeContext.Provider>
        </SetProjectCodeContext.Provider>
        </>
    )  
}
            


