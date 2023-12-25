import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import WebEditor from './pages/Web/Webeditor.jsx'
import Home from './pages/Home/Home.jsx'
import Projects from './pages/Projects/Projects.jsx'
import WebProjectsPage from './pages/Projects/Web/WebProjectsPage.jsx'
import MarkdownProjectsPage from './pages/Projects/Markdown/MarkdownProjectsPage.jsx'
import MarkdownEditor from './pages/Markdown/Mdeditor.jsx'


const routes=[
  {
  path: '/',
  element: <App/>,
  children:[
    {
      path: '/',
      element: <Home/> //here will be home page
    },
    {
      path: '/projects',
      element: <Projects/>,
      children:[
        {
          path: '/projects/',
          element: <WebProjectsPage/>
        }
        ,
        {
          path: '/projects/web',
          element: <WebProjectsPage/>
        },
        {
          path: '/projects/markdown/',
          element: <MarkdownProjectsPage/>
        }
      ]
    },
    {
    path: '/self/web/:id',
    element: <WebEditor/>
  },
  {
    path: '/self/markdown/:id',
    element: <MarkdownEditor/>
  }

  ]
}]

const browserRouter=createBrowserRouter(routes,{
  basename: '/',
}

)


ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={browserRouter} />
  </React.StrictMode>,
  document.getElementById('root')
)
