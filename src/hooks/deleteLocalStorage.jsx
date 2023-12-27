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
        sharedURL:"",
    }
    if(type==="web")
    {   
        projectInfo={
            ...projectInfo,
            deployment:"",
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
    projectList[id]=true;
    localStorage.setItem(`${key}-${type}-projects`,JSON.stringify(projectList));
    localStorage.setItem(`${key}-${type}-${id}`,JSON.stringify(projectInfo));

    return id;
}