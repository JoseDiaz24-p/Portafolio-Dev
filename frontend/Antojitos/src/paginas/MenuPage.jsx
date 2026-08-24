import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../componentes/Header'
import MenuSection from '../componentes/MenuSection'
import Footer from '../componentes/Footer'

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-800 flex flex-col justify-between">
      <div>
        <Header />
        
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <Link 
            to="/" 
            className="text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-2 font-medium"
          >
            ← Volver al inicio
          </Link>
        </div>

        <MenuSection />
      </div>

      <Footer />
    </div>
  )
}