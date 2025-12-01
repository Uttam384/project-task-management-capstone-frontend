import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskComments from './components/TaskComments'
import LogIn from './pages/LogIn'
import Register from './pages/Register'
import ProjectsPage from './components/ProjectsPage'
import Home from './pages/Home'

function App() {

  return (
    <>
      <ProjectsPage />
    </>
  )
}

export default App
