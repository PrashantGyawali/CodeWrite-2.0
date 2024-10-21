import { useLocation } from "react-router-dom";

export default function useUrl(){
    const location=useLocation();

    if(String(location.pathname).includes("web"))
    return "web";
    else if(String(location.pathname).includes("md"))
    return "md";
    else if(String(location.pathname).includes("other-language"))
    return "other-language";
}