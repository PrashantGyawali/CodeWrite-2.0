import { useParams } from 'react-router-dom';

export default function Deployment() {
    const params=useParams();
    const url="https://codewrite-server.onrender.com";

    window.location.href=url+"/deployment/"+params.id;

  return (
    <></>
  )
}
