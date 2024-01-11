import {useEffect, useState} from 'react'

const url="https://codewrite-server.onrender.com";
// const url="http://localhost:3000";

export default function useUser() {
    const [user,setUser] = useState({name:"Guest",email:"",joined:Date.now()});


    async function handleUser(type,data){
        switch(type)
        {
            case "login":
                let userInfo=await logInUser(data);

                if(userInfo && userInfo.isAuth && !userInfo.error)
                {
                    setUser(userInfo);
                }
                else{
                    console.log(userInfo);
                }
                return (userInfo)

                break;


            case "logout":
                logOutUser().then(()=>{
                    setUser({name:"Guest",email:"",joined:Date.now()});
                });
                
                break;


            case "update":
                const updatedUser =await updateExistingUserInfo(data);
                console.log(updatedUser);
                if(updatedUser && !updatedUser.error && updatedUser.isAuth)
                {
                    setUser(updatedUser);
                }
                break;

            case "register":
                const registeredUser = await registerUser(data);
                if(registeredUser && registeredUser.isAuth && !registeredUser.error)
                {
                    setUser(registeredUser);
                }
                return registeredUser; //this will return the error text recieved from db or the user object
                break;

            default:
                break;
        }
    }

    async function updateExistingUserInfo(data)
    {
        const response = await fetch(url+"/updateuser", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "include", 
            headers: {
              "Content-Type": "application/json",
              "Set-Cookie":"SameSite=None; Secure"
            },
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
          });
          return response.json(); // parses JSON response into native JavaScript objects
    }


    async function logInUser(data)
    {
        const response = await fetch(url+"/login", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "include", 
            headers: {
              "Content-Type": "application/json",
              "Set-Cookie":"SameSite=None; Secure"
            },
            referrerPolicy: "no-referrer", 
            body: JSON.stringify(data),
          });

        
          try{
                let resjson = await response.json();
                return resjson;
          }
          catch(err)
          {
              return {error:"Something went wrong"};
          }

    }

    async function logOutUser()
    {
        const response = await fetch(url + "/logout", {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "include", 
            headers: {
              "Content-Type": "application/json",
            },
            referrerPolicy: "no-referrer", 
          });
          console.log(response)
    }

    async function registerUser(data)
    {
        try{

        const response = await fetch(url+"/register", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "include", 
            headers: {
              "Content-Type": "application/json",              
            },
            referrerPolicy: "no-referrer", 
            body: JSON.stringify(data), 
          });

          let resjson = await response.json();
          return resjson;

          }
          catch(err)
          {
              return {error:"Something went wrong"};
          }    
    }

    async function checkAuth()
    {
        const res=await fetch(url+"/auth",{
            method:"GET",
            mode:"cors",
            credentials:"include",
            headers:{
                "Content-Type":"application/json",
                // "Access-Control-Allow-Credentials":true,
                // "Access-Control-Allow-Origin":"*",
                // "Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS",
            }
        });
       let resjson=await res.json();
        console.log(resjson);
        if(resjson && resjson.isAuth)
        {
            if(await resjson.isAuth){
                setUser(resjson);
            }
        }
    }

    useEffect( ()=>{
        checkAuth()
    },[]);

    return [user,handleUser];

}
