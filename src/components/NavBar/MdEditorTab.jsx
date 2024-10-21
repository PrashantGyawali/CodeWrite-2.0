import { memo, useCallback } from "react";
import useLocalStorage from "../../hooks/localstorage";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MarkdownTab=memo(()=>{
    const navigate=useNavigate();
    const [lastOpened, setLastOpened] = useLocalStorage("lastOpened", {web:"",md:"", "other-language":""});

    const handleMdEditorClick = useCallback(() => {
        navigate(`/self/md/${lastOpened.md}`)
    });

    return (
    <Nav.Item>
    <Nav.Link eventKey="link-2" onClick={handleMdEditorClick} className="ps-3 pe-3">
        <span className="text-info">M&darr;{" "}</span>Markdown editor</Nav.Link>
    </Nav.Item>
    );
});

export default MarkdownTab;