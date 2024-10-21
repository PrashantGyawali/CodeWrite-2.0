import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter,Navigate} from 'react-router-dom'
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
import SharedWeb from './pages/Shared/SharedWeb.jsx'
import SharedMd from './pages/Shared/SharedMd.jsx'
import DiscoverPage from './pages/Discover/DiscoverPage.jsx'
import OtherLanguageEditor from './pages/OtherLanguage/OtherLanguageEditor.jsx'

import { inject } from '@vercel/analytics';
import OtherLanguageProjectsPage from './pages/Projects/Other/OtherProjectsPage.jsx'
import SharedOther from './pages/Shared/SharedOther.jsx'


inject();

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
          path:"/discover",
          element:<DiscoverPage/>
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
            },
            {
              path: '/projects/other-language/',
              element: <OtherLanguageProjectsPage/>
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
    path: '/self/other-language/:id',
    element: <OtherLanguageEditor/>,
    errorElement:<Navigate to="/projects/other-language"/>
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
    path: '/self/other-language',
    element:<Navigate to="/projects/other-language"/>
  },
  {
    path:"/deployments/:id",
    element:<Deployment/>
  }
  ,  
  {
    path:"/shared/web/:id",
    element:<SharedWeb/>
  },
  {
    path:"/shared/md/:id",
    element:<SharedMd/>
  },
  {
    path:"/shared/other-language/:id",
    element:<SharedOther/>
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
