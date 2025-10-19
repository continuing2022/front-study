import React from 'react'
import { BrowserRouter, Routes, Route,HashRouter } from 'react-router-dom'
import Products from './component/Products'
import Anime from './component/anime'
import Navbar from './component/Navbar'
import ReduxDemo from './component/redux-demo'

export default function App(){
  return (
    <HashRouter>
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<div className="app"><Products /></div>} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/redux" element={<ReduxDemo />} />
        </Routes>
      </div>
    </HashRouter>
  )
}