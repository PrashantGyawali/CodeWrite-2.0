import React from 'react'
import "./Home.css"

import cloudUploadIcon from "../../assets/cloudUpload.svg"
import deployIcon from "../../assets/deployIcon.svg"
import shareIcon from "../../assets/shareIcon.svg"


// Import Swiper styles
import 'swiper/css';
import "swiper/css/autoplay"
import "swiper/css/effect-cards"
import "swiper/css/keyboard"

import livePreview from "./assets/livepreview.gif"

import Slider from './Slider';


function ProjectCards()
{
  const srcdoc=`
  <html>
  <head></head>
  <body style="overflow:hidden;">

    <div class="container">
    Current Time
    <canvas id="canvas" width="250" height="250"
    style="background-color:#333"></canvas>
    </div>  
  </body>

  <script>
  const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);

function drawClock() {
  drawFace(ctx, radius);
  let currentTime=new Date(new Date().getTime()-15*60*1000);
  drawTime(ctx, radius, currentTime);
  drawNumbers(ctx, radius);
}

function drawFace(ctx, radius) {
  const grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(let num = 1; num < 13; num++){
    let ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius,currentTime){
    const now = currentTime;
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}
  </script>
  </html>
  `
  return <>
      <div className='p-2 bg-dark d-flex flex-column col-sm-10 col-md-6 col-lg-4 col-xl-3 border-box' style={{aspectRatio:"1"}}>

        <div className='position-relative h-100'>

          {/* Because iframe didnt detect the mouse clicks */}
          <div style={{width:"100%",height:"100%",position:"absolute"}} onClick={(e)=>{e.stopPropagation();console.log("hi")}}></div> 

          <iframe srcDoc={srcdoc} title="output"
          sandbox="allow-scripts" style={{ overflow:'hidden', borderRadius:"10px",width:"100%",height:"100%"}} >
          </iframe>
        </div>
        <div className="text-end pe-3">-Ram</div>
      </div>
    </>
}


const IDEs=["materialIDE","cobaltIDE","matrixIDE","nightIDE","lightIDE","xqdarkIDE"];
const snippets=Array(5).fill(0).map((_,i)=>`snippet${i+1}`);


export default function Home() {
  return (
    < div className='home'>


      <section className='hero-section'>
      <div className='text-center hero-image'>
      </div>
        <div className='hero-text'>
          <div className='hero-title h1'>Simplistic Editor for the web</div>
          <div className='hero-subtitle h2'>Brainstorm ideas and quickly bring them to life</div>
        </div>
      </section>



        <div className=" container-fluid row">

          <div className='container p-4 d-flex align-items-center flex-column justify-content-center col col-md-6'>
            <div className="feature-title">Simple and customizable</div>
            <div className='feature-description'>Explore the simple yet fully customizable editor for web developers right in your browser! Choose between multiple IDE themes and settings.</div>
          </div>


          <div className=' container p-0 d-flex justify-content-end col-10 col-md-5  '> 
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

          <div className='container d-flex justify-content-center align-items-center col-12 col-md-5 ms-2'>
            <img src={shareIcon} alt="deploy" width="33%"/>
            <img src={cloudUploadIcon} alt="share"  width="33%%"/>
            <img src={deployIcon} alt="save"  width="33%%"/>
          </div>

          <div className='p-2 ms-2 col-md-6'>
            <div className='feature-title'>Save, Deploy and Share </div>
            <div className='feature-description'>Never lose your progress by saving on the cloud. Want to see your project live? simply deploy with just a single click. Want to share your code to others? No worries we got you covered</div>
          </div >
        </div>


        <section className='container-fluid p-4'> 
            <div className='feature-title'>Discover</div>
            <div className='d-flex flex-wrap justify-content-evenly row p-3'>
              <ProjectCards/>
              <ProjectCards/>
              <ProjectCards/>
              <ProjectCards/>
              <ProjectCards/>
              <ProjectCards/>
              <ProjectCards/>
              <ProjectCards/>              
              <ProjectCards/>
              <ProjectCards/>
              <ProjectCards/>
              <ProjectCards/>
            </div>
        </section>
    </div>
  )
}
