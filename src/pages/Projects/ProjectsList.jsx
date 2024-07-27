import { useEffect } from "react";
import useUrl from "../../hooks/UrlClassify";
import useLocalStorage from "../../hooks/localstorage";
import ProjectInfo from "./ProjectInfo";
import { useAtom } from "jotai";
import cloudProjects from "../../Store/CloudProjects";
import CloudProjectInfo from "./CloudProjectInfo";

export default function ProjectList() {
  const projectType = useUrl() || "web";

  const [projects, setProjects] = useLocalStorage(`${projectType}-projects`,{});

  let validProjects = Object.entries(projects).filter((project) => {
    return project[1] == true;
  });

  let [allcloudProjects]=useAtom(cloudProjects);
  let key="codewrite"
  let cloudProjectsList=allcloudProjects.filter((project)=>{return project.type==projectType &&  !localStorage.getItem(`${key}-${projectType}-${project.publicId}`) });

  useEffect(() => {
    validProjects = Object.entries(projects).filter((project) => {
      return project[1] == true;
    });
  }, [projects]);


  return (
    <div className="p-3 pe-0 w-100 row d-flex justify-content-start">
      {projects &&
        validProjects.map((project) => {
          return (
            <ProjectInfo key={project[0]} projectType={projectType} projectId={project[0]} updateProjects={setProjects} />
          );
        })}

      {cloudProjectsList?.length>0 && <><h1>From Cloud</h1>
        {cloudProjectsList.map((project)=>{return <CloudProjectInfo key={project.publicId} value={project}/>})}
        </> 
      }
    </div>
  );
}
