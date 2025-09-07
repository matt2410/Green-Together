import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import AppLayout from './routes/AppLayout'
import Home from './routes/Home'
import Goals from './routes/Goals'
import Timeline from './routes/Timeline'
import Projects from './routes/Projects'
import Team from './routes/Team'
import Impact from './routes/Impact'
import NotFound from './routes/NotFound'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "goals", element: <Goals /> },
      { path: "timeline", element: <Timeline /> },
      { path: "projects", element: <Projects /> },
      { path: "team", element: <Team /> },
      { path: "impact", element: <Impact /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)