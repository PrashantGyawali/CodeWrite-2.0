import { memo, useCallback } from "react";
import useLocalStorage from "../../hooks/localstorage";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const WebEditorTab=memo(()=>{
    const navigate=useNavigate();
    const [lastOpened, setLastOpened] = useLocalStorage("lastOpened", {web:"",md:""});

    const handleWebEditorClick = useCallback(() => {
        navigate(`/self/web/${lastOpened.web}`)
    });

    return (<Nav.Item>
    <Nav.Link eventKey="link-1" onClick={handleWebEditorClick} className="ps-3 pe-3">
        <span className="text-warning">{"</> "}</span>Web Editor
        </Nav.Link>
    </Nav.Item>)
})

export default WebEditorTab;