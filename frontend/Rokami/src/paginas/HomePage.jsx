import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../componentes/Header'
import Gallery from '../componentes/Gallery'
import AboutStory from '../componentes/AboutStory'
import Footer from '../componentes/Footer'
import logoOficial from '../assets/Logo.jpeg'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F4F2EF] text-[#2A3036] font-sans antialiased selection:bg-[#C16A28] selection:text-white flex flex-col justify-between">
      <div>
        <Header />

        <main>
          {/* Hero Section */}
          <section className="px-6 py-16 md:py-24 text-center bg-[#191D21] text-white border-b-4 border-[#C16A28]">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
              
              <span className="text-xs uppercase tracking-[0.3em] text-[#C16A28] font-bold mb-6">
                Ingeniería y Construcción
              </span>

              {/* Tarjeta del Logo con recorte perimetral para eliminar la línea negra */}
              <div className="w-full max-w-sm sm:max-w-md bg-white p-5 sm:p-7 rounded-2xl border border-[#D7D2C8] shadow-2xl overflow-hidden mb-8">
                <div className="overflow-hidden rounded-xl">
                  <img 
                    src={logoOficial} 
                    alt="ROKAMI Ingeniería y Construcción" 
                    className="w-full h-auto object-contain scale-[1.04] translate-x-[-1px] translate-y-[-1px]"
                  />
                </div>
              </div>

              {/* Bajada descriptiva */}
              <p className="text-gray-300 text-sm sm:text-base md:text-lg font-normal max-w-2xl mx-auto leading-relaxed">
                Desarrollamos proyectos habitacionales, comerciales, industriales y clínicos con soluciones integrales en hormigón armado, estructuras metálicas y terminaciones de alto estándar.
              </p>

              {/* Acciones */}
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
                <Link 
                  to="/menu" 
                  className="bg-[#C16A28] hover:bg-[#964E19] text-white px-8 py-3.5 text-xs tracking-widest font-bold rounded uppercase transition-colors shadow-md text-center"
                >
                  Ver Servicios y Obras
                </Link>

                <a 
                  href="#historia" 
                  className="border border-[#D7D2C8]/40 hover:border-white hover:bg-white hover:text-[#191D21] text-[#F4F2EF] px-8 py-3.5 text-xs tracking-widest font-bold rounded uppercase transition-all text-center"
                >
                  Sobre Nosotros
                </a>
              </div>

            </div>
          </section>

          {/* Galería */}
          <Gallery />

          {/* Historia */}
          <AboutStory />
        </main>
      </div>

      <Footer />
    </div>
  )
}