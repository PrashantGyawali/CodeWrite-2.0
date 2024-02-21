import React from 'react'
import "./Home.css"


import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, EffectCards } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import "swiper/css/autoplay"
import "swiper/css/effect-cards"
import "swiper/css/keyboard"

import livePreview from "./assets/livepreview.gif"


function ProjectCards()
{
  return <div className='p-2'>Project</div>
}




const Slider =() => {
  return (
    <Swiper
      rewind={true}
      effect={'cards'}
      grabCursor={true}
      modules={[EffectCards,Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      className="swiper" 
    >
      <SwiperSlide className='materialIDE'></SwiperSlide>
      <SwiperSlide className='cobaltIDE'></SwiperSlide>
      <SwiperSlide className='matrixIDE'></SwiperSlide>
      <SwiperSlide className='nightIDE'></SwiperSlide>
      <SwiperSlide className='lightIDE'></SwiperSlide>
      <SwiperSlide className='xqdarkIDE'></SwiperSlide>

    </Swiper>
  );
};

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
            <div className="h2 text-center">Simple and customizable</div>
            <div className='justify h5'>Explore the simple yet fully customizable editor for web developers right in your browser! Choose between multiple IDE themes and settings.</div>
          </div>


          <div className=' container p-0 d-flex justify-content-end col-10 col-md-5  '> 
            <Slider/>
          </div>

        </div>

        <div className="d-flex justify-content-between container-fluid flex-column-reverse flex-md-row">
          <div className='col-md-6 ms-sm-4 p-md-2 p-lg-4 '><img src={livePreview} className='w-100' style={{borderRadius:"5%"}}></img></div>
          <div className='p-3 m-1 col-md-6 d-flex  flex-column justify-content-center align-items-center'>
            <div className='h2 text-center'>Realtime Preview</div>
            <div className='h5'>Get instant preview of your code on the same page. Say goodbye to hassle of switching tabs or windows</div>
          </div>
        </div>


        <div className="d-flex justify-content-between container-fluid">
          <div className='p-2 m-1'>
            <div className='h4'>Beautiful Code Snippets</div>
            <div>Capture beautiful code snippets as you go. Choose your own backgrounds, fonts themes and much more.</div>
          </div>
          <div>Scrolling sample photos of code snippets</div>
        </div>

        
        <div className="d-flex justify-content-between container-fluid">
          <div className='p-2 m-1'>
            <div className='h4'>Simple and customizable</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum vel exercitationem corporis distinctio deleniti!</div>
          </div>
          <div>Scrolling sample photos of resized</div>
        </div>


        <section className='container-fluid'> 
            <h4 className='text-center'>Discover</h4>
            <div className='d-flex flex-wrap '>
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
