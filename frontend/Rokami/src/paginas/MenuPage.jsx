import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../componentes/Header'
import MenuSection from '../componentes/MenuSection' 
import Footer from '../componentes/Footer'

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-[#F4F2EF] text-[#2A3036] flex flex-col justify-between font-sans antialiased selection:bg-[#C16A28] selection:text-white">
      <div>
        <Header />

        <div className="max-w-7xl mx-auto px-6 pt-8">
          <Link 
            to="/" 
            className="text-xs uppercase tracking-[0.2em] text-[#2A3036]/70 hover:text-[#C16A28] transition-colors flex items-center gap-2 font-bold"
          >
            ← Volver al inicio
          </Link>
        </div>

        <main className="pb-16">
          <MenuSection />
        </main>
      </div>

      <Footer />
    </div>
  )
}