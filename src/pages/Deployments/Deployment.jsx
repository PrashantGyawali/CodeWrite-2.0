import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Deployment() {
    const params=useParams();
    console.log(params.id);
    const [deployment,setDeployment]=useState();
    const url="https://codewrite-server.onrender.com";

    useEffect(async() => {
        const page=await fetch(url+"/deployments:"+params.id,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });
        console.log(page);
    },[]);


  return (
    <></>
  )
}
