import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../componentes/Header'
import AboutStory from '../componentes/AboutStory'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-800">
      <Header />

      <main>
        {/* Hero */}
        <section className="px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-stone-500 font-medium">
              — Boutique de Pastelería Fina —
            </span>
            
            <h1 className="mt-6 text-4xl sm:text-6xl font-serif text-stone-900 leading-tight">
              Repostería artesanal creada con delicadeza y pasión
            </h1>
            
            <p className="mt-4 text-stone-600 text-sm sm:text-base font-light">
              Celebramos la tradición de la pastelería lenta, horneando diariamente con ingredientes seleccionados y recetas familiares.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              {/* Hipervínculo a la nueva página /menu */}
              <Link 
                to="/menu" 
                className="bg-stone-900 !text-white px-6 py-3 text-xs tracking-widest font-medium rounded-md hover:bg-stone-800 transition-colors uppercase"
              >
                Ver Carta y Precios
              </Link>

              <a 
                href="#historia" 
                className="border border-stone-400 text-stone-900 px-6 py-3 text-xs tracking-widest font-medium rounded-md hover:bg-stone-100 transition-colors uppercase"
              >
                Conocer la Historia
              </a>
            </div>
          </div>
        </section>

        {/* Galería */}
        <section className="px-4 pb-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="overflow-hidden rounded-3xl shadow-sm bg-stone-200 aspect-[4/5]">
              <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600" alt="Croissants" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="overflow-hidden rounded-3xl shadow-sm bg-stone-200 aspect-[4/5]">
              <img src="https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600" alt="Tartaletas" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="overflow-hidden rounded-3xl shadow-sm bg-stone-200 aspect-[4/5]">
              <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600" alt="Pastel" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </section>

        {/* Historia */}
        <AboutStory />
      </main>
    </div>
  )
}