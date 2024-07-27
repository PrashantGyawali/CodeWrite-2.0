import { useState, useEffect, useRef} from "react";
import ProjectCards from "../../components/ProjectCards/ProjectCard";
import FallbackProjects from "../../components/ProjectCards/FallbackProjectCards";

export default function DiscoverPage() {
	const [projects, setProjects] = useState([]);
	const intersectionRef = useRef(null);
    const [page, setPage] = useState(0);
    const [lastPage, setLastPage] = useState(2);
    const limit=useRef(window.innerWidth>800?16:window.innerWidth>600?12:window.innerWidth>400?8:6);

    const fetchData = () => {
        if (page >= lastPage) {
            return;
        }
        fetch(`https://codewrite-server.onrender.com/discover?limit=${limit.current}&page=${page+1}`)
        .then((res) => res.json())
        .then((data) => {
            if (data?.projects?.length > 0) {
                let allProjects=[...projects,...data.projects];
                allProjects=allProjects.filter((project,index,self)=>self.findIndex(t=>(t.sharedURL === project.sharedURL))===index);
                setProjects(allProjects);
                setPage(data.currentPage);
                setLastPage(data.lastPage);
            }
        })
        .catch((e) => {
            console.log(e.toString().slice(0, 500));
        });
    };

	useEffect(() => {
        window.scrollTo(0, 0);
		fetchData();
	}, []);

	useEffect(() => {
        let currentintersectionRef=intersectionRef.current;
		const observer = new IntersectionObserver((entries) => {
			const target = entries[0];
			if (target.isIntersecting) {
				fetchData();
			}
		},{
            rootMargin: '0px 0px 100px 0px',
            root: null,
            threshold: 0.9
        });

		if (currentintersectionRef) {
			observer.observe(currentintersectionRef);
		}

		return () => {
			if (currentintersectionRef) {
				observer.unobserve(currentintersectionRef);
			}
		};
	}, [fetchData]);

	return (
        <div>
            <br></br><h1 className="pt-1 ps-3">Popular projects</h1><br></br>
            <div className="grid-container">
                {projects.length > 0 ? (<>
                    {
                    projects.map((project) => (
                        <ProjectCards
                            projectInfo={project}
                            key={project.sharedURL}
                        />
                    ))  }
                    <div ref={intersectionRef} style={{color:"transparent",display:"hidden"}}>If you can see this you are gay</div>
                    </>
                ) : (
                    <FallbackProjects />
                )}
                
            </div>
        </div>
	);
}
