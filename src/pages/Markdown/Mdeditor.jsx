import NavComponent from '../../components/Navbar';
import Editor from './MdEditorComponent';
import 'bootstrap/dist/css/bootstrap.css';
import { memo, useEffect, useState } from 'react';
import '../../App.css'
import '../Editor/styles/Editor.css'
import useLocalStorage from '../../hooks/localstorage';



import useUrl from '../../hooks/UrlClassify';
import useProject from '../../hooks/ProjectFunctions';
import { useParams,useNavigate } from 'react-router-dom';

import MarkdownOutput from './MarkdownOutput';
import { ProjectCodeContext, SetProjectCodeContext } from '../../App';
import MarkdownPageBody from './MarkdownPageBody';




export default function MarkdownEditor(){

  const navigate=useNavigate();

  const type=useUrl();
  const id=useParams().id;


  const [code,setCode]=useProject(type,id);  
  
    return (
        <>
        <SetProjectCodeContext.Provider value={setCode}>
          <ProjectCodeContext.Provider value={code}>
            <NavComponent/>
            <MarkdownPageBody/>
          </ProjectCodeContext.Provider>
        </SetProjectCodeContext.Provider>
        </>
    )  
}
            


