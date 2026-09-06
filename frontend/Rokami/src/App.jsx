import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './paginas/HomePage'
import MenuPage from './paginas/MenuPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </BrowserRouter>
  )
}