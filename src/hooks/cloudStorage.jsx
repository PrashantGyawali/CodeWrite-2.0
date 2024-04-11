export default async function  fetchCloudStorage() {

    const url = "https://codewrite-server.onrender.com/allprojects";
    
        let result=await fetch(url,{
            method:"GET",
            mode: "cors",
            headers:{
                "Content-Type":"application/json",
                "Access-Control-Allow-Credentials":true,
            },
            cache: "no-cache",
            credentials: "include", 
        });
        let resjson=await result.json();

        return resjson;

}


export async function deleteCloudProject(id,type)
{
    const url = "https://codewrite-server.onrender.com/delete";
        let result=await fetch(url,{
            method:"POST",
            mode: "cors",
            headers:{
                "Content-Type":"application/json",
                "Access-Control-Allow-Credentials":true,
            },
            cache: "no-cache",
            credentials: "include", 
            body:JSON.stringify({id:id,type:type})
        });
        let resjson=await result.json();
        let alertMessage=resjson.message||resjson.error;
        alert(alertMessage);
}