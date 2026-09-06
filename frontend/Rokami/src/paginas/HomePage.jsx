import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../componentes/Header'
import Gallery from '../componentes/Gallery'
import AboutStory from '../componentes/AboutStory'
import Footer from '../componentes/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F4F2EF] text-[#2A3036] font-sans antialiased selection:bg-[#C16A28] selection:text-white flex flex-col justify-between">
      <div>
        <Header />

        <main>
          {/* Hero */}
          <section className="px-6 py-20 md:py-28 text-center bg-[#191D21] text-white border-b-4 border-[#C16A28]">
            <div className="max-w-4xl mx-auto">
              <span className="text-xs uppercase tracking-[0.3em] text-[#C16A28] font-bold">
                Ingeniería y Construcción
              </span>

              <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-tight">
                La fuerza de construir con <span className="text-[#C16A28]">experiencia.</span>
              </h1>

              <p className="mt-5 text-gray-300 text-sm sm:text-base md:text-lg font-normal max-w-2xl mx-auto leading-relaxed">
                Soluciones técnicas e integrales para edificación industrial, comercial y habitacional. Especialistas en hormigón armado, estructuras de acero y terminaciones de alto estándar.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/menu" 
                  className="bg-[#C16A28] hover:bg-[#964E19] text-white px-7 py-3.5 text-xs tracking-widest font-bold rounded transition-colors uppercase shadow-md"
                >
                  Ver Servicios y Obras
                </Link>

                <a 
                  href="#historia" 
                  className="border border-[#D7D2C8]/40 text-[#F4F2EF] hover:bg-white hover:text-[#191D21] px-7 py-3.5 text-xs tracking-widest font-bold rounded transition-all uppercase"
                >
                  Nuestra Empresa
                </a>
              </div>
            </div>
          </section>

          {/* Galería de Obras */}
          <Gallery />

          {/* Sección Nosotros / Historia */}
          <AboutStory />
        </main>
      </div>

      <Footer />
    </div>
  )
}