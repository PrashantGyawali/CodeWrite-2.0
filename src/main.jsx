import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter,redirect,Navigate} from 'react-router-dom'
import WebEditor from './pages/Web/Webeditor.jsx'
import Home from './pages/Home/Home.jsx'
import Projects from './pages/Projects/Projects.jsx'
import WebProjectsPage from './pages/Projects/Web/WebProjectsPage.jsx'
import MarkdownProjectsPage from './pages/Projects/Markdown/MarkdownProjectsPage.jsx'
import MarkdownEditor from './pages/Markdown/Mdeditor.jsx'
import Auth from './pages/Authentication/Auth.jsx'
import Login from './pages/Authentication/Login.jsx'
import Register from './pages/Authentication/Register.jsx'
import Profile from './pages/Profile/Profile.jsx'
import Protected from './components/Protected.jsx'
import DefaultNavOnlyPage from './pages/Default/DefaultNavOnlyPage.jsx'
import Deployment from './pages/Deployments/Deployment.jsx'

const routes=[
  {
  path: '/',
  element: <App/>,
  children:[
    {
      path: '/',
      element: <DefaultNavOnlyPage/>,
      children:[
        {
          path: '/',
          element: <Home/>
        },
        {
          path: '/auth',
          element:<Auth/>,
          children:[
            {
              path: '/auth/',
              element: <Navigate to="/auth/login"/>
            },
            {
              path: '/auth/login',
              element: <Login/>
            },
            {
              path: '/auth/signup',
              element: <Navigate to="/auth/register"/>
            },
            {
              path: '/auth/register',
              element: <Register/>
            },
            {
              path: '/auth/signin',
              element: <Navigate to="/auth/login"/>
            }
          ]
        },
        {
          path:"/profile",
          element:<Protected element={Profile}/>
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
              path: '/projects/web/*',
              element: <Navigate to="/projects/web"/>
            },
            {
              path: '/projects/web',
              element: <WebProjectsPage/>
            },
            {
              path: '/projects/md/',
              element: <MarkdownProjectsPage/>
            }
          ]
        }
      ]
    },
   {
      path: '/web',
      element: <Navigate to="/projects/web"/>,
      
    },
    {
    path: '/self/web/:id',
    element: <WebEditor/>,
    errorElement:<Navigate to="/projects/web"/>
  },
  {
    path: '/self/md/:id',
    element: <MarkdownEditor/>,
    errorElement:<Navigate to="/projects/md"/>
  },
  {
    path: '/self/web',
    element:<Navigate to="/projects/web"/>
    
  },
  {
    path: '/self/md',
    element:<Navigate to="/projects/md"/>
  },
  {
    path:"/deployments/:id",
    element:<Deployment/>
  }
  ,  
  {
    path:"/shared/web/:id",
    element:<Deployment/>
  },
  {
    path:"/shared/md/:id",
    element:<Deployment/>
  }


  ],
  errorElement:<Navigate to="/"/>
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
);
