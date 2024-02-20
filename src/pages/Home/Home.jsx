import React from 'react'
import "./Home.css"

function ProjectCards()
{
  return <div className='p-2'>Project</div>
}

export default function Home() {
  return (
    <>


      <section className='hero-section'>
      <div className='text-center hero-image'>
      </div>
        <div className='hero-text'>
          <div className='hero-title h1'>Simplistic Editor for the web</div>
          <div className='hero-subtitle h2'>Brainstorm ideas and quickly bring them to life</div>
        </div>
      </section>



        <div className="d-flex justify-content-between container-fluid">

          <div className='container m-1'>
            <div className="h4">Simple and customizable</div>
            <div>Explore the simple yet fully customizable editor for web developers right in your browser!</div>
          </div>


          <div>Scrolling sample photos of different idea themes</div>

        </div>

        <div className="d-flex justify-content-between container-fluid">
          <div className='p-2 m-1'>
            <div className='h4'>Realtime Preview</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum vel exercitationem corporis distinctio deleniti!</div>
          </div>
          <div>Scrolling sample photos of different ide themes</div>
        </div>


        <div className="d-flex justify-content-between container-fluid">
          <div className='p-2 m-1'>
            <div className='h4'>Simple and customizable</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum vel exercitationem corporis distinctio deleniti!</div>
          </div>
          <div>Scrolling sample photos of resized</div>
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
    </>
  )
}
