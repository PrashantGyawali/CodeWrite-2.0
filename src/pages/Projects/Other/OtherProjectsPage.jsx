import { useState } from "react";
import { createNewProject } from "../../../hooks/ProjectFunctions";
import CreatingNewProjectElement from "../CreateNewProjectInput";
import ProjectList from "../ProjectsList";

export default function OtherLanguageProjectsPage() {
	const [creatingNewProject, setCreatingNewProject] = useState();
	const handleCLick = () => {
		const id = String(Number(createNewProject("other-language", {})));
		setCreatingNewProject(id);
	};

	return (
		<div>
			<button onClick={handleCLick} className="ms-1">
				+New Project
			</button>{" "}
			<br></br>
			{creatingNewProject && (
				<CreatingNewProjectElement
					id={creatingNewProject}
					type="other-language"
					setCreatingNewProject={setCreatingNewProject}
				/>
			)}
			<ProjectList type="other-language" />
		</div>
	);
}
