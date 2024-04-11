import { useEffect, useState,useRef } from "react";

const key="codewrite";

export function createNewProject(type,value) {

    let id= Math.floor(Math.random()*((new Date()).getTime().toString(9).substring(3, 12))).toString(9).substring(2, 10);
    
    let projectList=localStorage.getItem(`${key}-${type}-projects`);
    if(projectList===null) projectList={};
    else projectList=JSON.parse(projectList);

    value={...value} || {};

    let projectInfo={
        id:id,
        name:  `New Project ${id}`,
        dateModified: Date.now(),
        dateCreated: Date.now(),
        sharedURL:"",
        dateSaved:"",
        dateShared:"",
        type:type,
    }
    if(type==="web")
    {   
        projectInfo={
            ...projectInfo,
            deployment:"",
            html:"",
            css:"",
            js:"",
            ...value
        }
    }
    else if(type==="md")
    {
        projectInfo={
            ...projectInfo,
            ...value
        }
    }
    projectList[projectInfo.id]=true;
    localStorage.setItem(`${key}-${type}-projects`,JSON.stringify(projectList));
    localStorage.setItem(`${key}-${type}-${projectInfo.id}`,JSON.stringify(projectInfo));

    return id;
}



export default function useProject(type,id) {


    const render=useRef(0);

    if (!id || typeof id !== 'string' || !type || typeof type !== 'string') {
      return [null, null, null];
    }
  
    const preFixedKey = `${key}-${type}-${id}`;
    let projectInfo = getItemFromLocalStorage(preFixedKey);
  
    if (!projectInfo) {
      return [null, null, null];
    }
  
    const [value, setValue] = useState(() => getItemFromLocalStorage(preFixedKey));
    const [data, setData] = useState(value);


  
    useEffect(() => {
      let projectList = JSON.parse(localStorage.getItem(`${key}-${type}-projects`)) || {};
  
      if (id) {
        projectList[id] = true;
        localStorage.setItem(`${key}-${type}-projects`, JSON.stringify(projectList));
      }

      let newProjectInfo = {
        ...projectInfo,
        ...value,
      };

      if(data?.html!==value.html || data.css!==value.css || data.js!==value.js || data.md!==value.md || data.name!==value.name ) 
      {
        newProjectInfo.dateModified = Date.now();
      }

      setData(newProjectInfo);
      localStorage.setItem(preFixedKey, JSON.stringify(newProjectInfo));

      render.current+=1;
    }, [value]);
  
    return [data, setValue];
  }
  
  function getItemFromLocalStorage(key){
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  };

