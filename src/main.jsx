import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import WebEditor from './components/Webeditor.jsx'
import MarkdownEditor from './components/Mdeditor.jsx'


const routes=[
  {
  path: '/',
  element: <App/>,
  children:[
    {
    path: '/web',
    element: <WebEditor/>
  },
  {
    path: '/markdown',
    element: <MarkdownEditor/>,
  },
  {
    path: '/',
    element: <WebEditor/>
  }
  ]
}]

const browserRouter=createBrowserRouter(routes,{
  basename: '/CodeWrite/',
}

)


ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={browserRouter} />
  </React.StrictMode>,
  document.getElementById('root')
)
