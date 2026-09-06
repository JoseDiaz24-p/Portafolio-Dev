import React from 'react'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative bg-[#191D21] text-white px-6 py-24 md:py-32 text-center border-b-4 border-[#C16A28]">
      <div className="max-w-4xl mx-auto">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C16A28] font-bold">
          Ingeniería y Construcción
        </span>

        <h1 className="mt-6 text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-tight">
          La fuerza de construir con <span className="text-[#C16A28]">experiencia.</span>
        </h1>

        <p className="mt-5 text-gray-300 text-sm sm:text-base md:text-lg font-normal max-w-2xl mx-auto leading-relaxed">
          Especialistas en obras civiles, cálculo y montaje de estructuras metálicas, edificaciones habitacionales y proyectos llave en mano.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/menu"
            className="bg-[#C16A28] hover:bg-[#964E19] text-white px-8 py-3.5 text-xs tracking-widest font-bold rounded uppercase transition-colors shadow-md text-center"
          >
            Ver Servicios y Obras
          </Link>

          <a
            href="#contacto"
            className="border border-[#D7D2C8]/40 hover:border-white hover:bg-white hover:text-[#191D21] text-[#F4F2EF] px-8 py-3.5 text-xs tracking-widest font-bold rounded uppercase transition-all text-center"
          >
            Cotizar Proyecto
          </a>
        </div>
      </div>
    </section>
  )
}