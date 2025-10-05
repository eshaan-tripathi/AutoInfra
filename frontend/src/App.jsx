import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import {Route, Routes,BrowserRouter as Router} from 'react-router-dom'
import ScriptGenerator from './pages/GenerateScript'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/scriptgenerate" element={<ScriptGenerator/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
