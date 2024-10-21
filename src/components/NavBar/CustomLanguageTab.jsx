import { memo, useCallback } from "react";
import useLocalStorage from "../../hooks/localstorage";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CustomLanguageTab=memo(()=>{
    const navigate=useNavigate();
    const [lastOpened, setLastOpened] = useLocalStorage("lastOpened", {web:"",md:"","other-language":""});

    const handleClick = useCallback(() => {
        navigate(`/self/other-language/${lastOpened["other-language"]}`)
    });

    return (
    <Nav.Item>
    <Nav.Link eventKey="link-3" onClick={handleClick} className="ps-3 pe-3">
        <span className="text-info">&#127760;{" "}</span>Other Languages</Nav.Link>
    </Nav.Item>
    );
});

export default CustomLanguageTab;