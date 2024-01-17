import React from "react";
import { Navbar } from "react-bootstrap";
import { useNavigate} from "react-router-dom";

const BrandName=React.memo(()=>{
    const navigate=useNavigate();
    return (
  <Navbar.Brand className="brand-name" onClick={()=>{navigate("/")}}>CodeWrite</Navbar.Brand>
    )
});

export default BrandName;