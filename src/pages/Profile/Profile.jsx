import {useState, useRef, useEffect, useContext} from 'react'
import "./Profile.css"
import userIcon from "../../assets/userIcon.svg"
import { useNavigate } from 'react-router-dom'
import { SettingsContext } from '../../App'

export default function Profile() {
    const {user,setUser:handleUser}=useContext(SettingsContext);
    const [userNameEditing,setUserNameEditing]=useState(false);
    const [userName,setUserName]=useState(user.username);

    const projectNameRef=useRef(0);
    const navigate=useNavigate();

    const handleLogout=()=>{
        handleUser("logout");
        navigate("/");
    }

    useEffect(()=>{

        if(userNameEditing)
        {
          projectNameRef.current.focus(); 
            projectNameRef.current.addEventListener("focusout",()=>{
              setUserNameEditing(false);
              setTimeout(()=>{              handleUser("update",{username:userName});
            },1000);
            });
             projectNameRef.current.addEventListener('keyup', function (e) {
                if (e.key === 'Enter')
                {
                  setUserNameEditing(false);
                }
             });

        }
      },[userNameEditing]);

    useEffect(()=>{
      setUserName(user.username);
    },[user]);


  return (
    <>
    <div className='profile '>
    <section className="auth-section">
        <div className="auth register">
          <div className="content">

            <h2>Your Profile</h2>
  
            <div className='profile-icon-container'>
              <img src={userIcon} alt="profile" className='profile-icon'/>
            </div>

            <div className="profileInfo-div ">
              <div className={`profile-property ${userNameEditing?"text-white":""}`}>Name:&nbsp;</div> 
              {
                !userNameEditing?<div className='property-value value-editable' onClick={()=>{setUserNameEditing(true)}}>{user.username}</div>
                :<input value={userName} ref={projectNameRef} className='editing-input' onChange={(e) => {setUserName(e.target.value);}} />
              }
             </div>
            <div className="profileInfo-div ">Email: {user.email}</div>
            <div className="profileInfo-div ">Date joined: {user.dateJoined}</div>
            <button className="logout" onClick={handleLogout}>LOGOUT</button>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}
