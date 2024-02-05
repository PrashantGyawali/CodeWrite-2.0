import React from 'react'

function ProjectCards()
{
  return <div className='p-2'>Project</div>
}

export default function Home() {
  return (
    <>
      <div className='text-center'>
        <h3>Simplistic Editor for the web</h3>
        <h4>Brainstorm ideas and quickly bring them to life</h4>
      </div>

        <div className="d-flex justify-content-between container-fluid">
          <div className='p-2 m-1'>
            <div className="h4">Simple and customizable</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum vel exercitationem corporis distinctio deleniti!</div>
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
