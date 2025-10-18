import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Products from './component/Products'
import Anime from './component/anime'
import Navbar from './component/Navbar'

export default function App(){
  return (
    <BrowserRouter>
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<div className="app"><Products /></div>} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/new" element={<New />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}