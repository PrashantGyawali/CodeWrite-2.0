import "./Home.css"

import cloudUploadIcon from "../../assets/cloudUpload.svg"
import deployIcon from "../../assets/deployIcon.svg"
import shareIcon from "../../assets/shareIcon.svg"

import FallbackProjects from "../../components/ProjectCards/FallbackProjectCards.jsx"

// Import Swiper styles
import 'swiper/css';
import "swiper/css/autoplay"
import "swiper/css/effect-cards"
import "swiper/css/keyboard"

import livePreview from "./assets/livepreview.gif"

import { useState,useEffect} from 'react';
import Slider from './Slider';
import { useNavigate } from 'react-router-dom'

import ProjectCards from "../../components/ProjectCards/ProjectCard.jsx"
import CookieNotice from "./CookieNotice.jsx"


function FeaturedProjects()
{
  const [data, setData] = useState(null);
  const fetchDataAsync = async () => {
    try{
    const result = await fetch("https://codewrite-server.onrender.com/discover").then(res=> res.json());
    if(result?.projects?.length>0)
    {
      setData(result.projects);
    }}
    catch(e)
    {
      console.log(e.toString().slice(0,500));
    }
  };

  // Immediately trigger data fetching when component mounts
  useEffect(() => {
  fetchDataAsync();
},[]);

    return (<>
          <div className="grid-container">
          {data ? data.map((project) => <ProjectCards projectInfo={project} key={project.sharedURL}/>): <FallbackProjects />}
          </div> 
          </>
    );

}



const IDEs=["materialIDE","cobaltIDE","matrixIDE","nightIDE","lightIDE","xqdarkIDE"];
const snippets=Array(5).fill(0).map((_,i)=>`snippet${i+1}`);

export default function Home() {
  const navigate=useNavigate();
  return (
    < div className='home'>

      <CookieNotice/>

      <section className='hero-section'>
      <div className='text-center hero-image'>
      </div>
        <div className='hero-text'>
          <div className='hero-title h1'>Simplistic Editor for the web</div>
          <div className='hero-subtitle h2'>Brainstorm ideas and quickly bring them to life</div>
          <button className='start-now' onClick={()=>navigate("/projects/web")}>Start Now</button>
        </div>
      </section>



        <div className=" container-fluid row">

          <div className='container p-4 d-flex align-items-center flex-column justify-content-center col col-md-6'>
            <div className="feature-title">Simple and customizable</div>
            <div className='feature-description'>Explore the simple yet fully customizable editor for web developers right in your browser! Choose between multiple IDE themes and settings.</div>
          </div>


          <div className=' container p-0 d-flex justify-content-end col-12 col-md-5  '> 
            <Slider classNames={IDEs} type="ide-img"/>
          </div>

        </div>



        <div className="d-flex justify-content-between container-fluid flex-column-reverse flex-md-row">

          <div className='col-md-6 ms-sm-4 p-md-2 p-lg-4 '>
            <img src={livePreview} className='w-100' style={{borderRadius:"5%"}}></img>
          </div>

          <div className='p-4 col-md-6 d-flex  flex-column justify-content-center align-items-center'>
            <div className='feature-title'>Realtime Preview</div>
            <div className='feature-description'>Get instant preview of your code on the same page. Say goodbye to hassle of switching tabs or windows</div>
          </div>
        </div>




        <div className="container-fluid row">
          <div className='container p-4 d-flex align-items-center flex-column justify-content-center col col-md-5'>
            <div className='feature-title'>Beautiful Code Snippets</div>
            <div className='feature-description'>Capture beautiful code snippets as you go. Choose your own backgrounds, fonts, themes and much more.</div>
          </div>
          <div className=' container p-0 d-flex justify-content-end col-11 col-md-6  '> 
            <Slider classNames={snippets} type="snippet-img"/>
          </div>
        </div>

        
        <div className="row justify-content-between container-fluid mt-5 mb-4">

          <div className='container d-flex justify-content-center  align-items-center col-12 col-md-5 ms-2'>
            <img src={shareIcon} alt="deploy" className='m-2 w-25 '/>
            <img src={cloudUploadIcon} alt="share"  className="m-2 w-25"/>
            <img src={deployIcon} alt="save"  className="m-2 w-25"/>
          </div>

          <div className='p-2 ms-2 col-md-6'>
            <div className='feature-title'>Save, Deploy and Share </div>
            <div className='feature-description'>Never lose your progress by saving on the cloud. Want to see your project live? simply deploy with just a single click. Want to share your code to others? No worries we got you covered</div>
          </div >
        </div>


        <section className='container-fluid p-4'> 
            <div className='feature-title'>Discover</div>
            <div className='d-flex flex-wrap justify-content-evenly row ' >
              <FeaturedProjects/>   
            </div>
            <button className='discover-btn' onClick={()=>navigate("/discover")}>More↓</button>
        </section>
    </div>
  )
}
