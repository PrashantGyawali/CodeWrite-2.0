const key="codewrite";

export function deleteProject(id,type, updateProjectList) {
    
    let projectList=localStorage.getItem(`${key}-${type}-projects`);
    if(projectList===null)
    { 
        projectList={};
    }
    else 
    {
        projectList=JSON.parse(projectList);
        let newProjectList={}
        for (let key in projectList)
        {
            if(key==id)
            {
                continue;
            }
            else{
                newProjectList[key]=true;
            }
        }
        localStorage.setItem(`${key}-${type}-projects`,JSON.stringify(newProjectList));
        localStorage.removeItem(`${key}-${type}-${id}`);
        updateProjectList(newProjectList);

    }
    // localStorage.setItem(`${key}-${type}-${id}`,JSON.stringify(projectInfo));

    return id;
}