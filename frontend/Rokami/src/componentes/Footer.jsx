import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#191D21] text-stone-300 pt-16 pb-12 border-t-4 border-[#C16A28]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#2A3036]">
          
          {/* Identidad */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 bg-[#2A3036] border border-[#C16A28] rounded flex items-center justify-center text-[#C16A28] font-black text-lg">
                R
              </div>
              <span className="font-black text-xl tracking-[0.2em] text-white uppercase">ROKAMI</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-normal">
              ROKAMI Ingeniería y Construcción. Especialistas en obras civiles, estructuras metálicas y proyectos habitacionales e industriales con los más altos estándares técnicos.
            </p>
          </div>

          {/* Navegación */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.25em] font-bold text-[#C16A28]">
              Empresa
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/menu" className="hover:text-white transition-colors">
                  Catálogo de Servicios
                </Link>
              </li>
              <li>
                <a href="/#galeria" className="hover:text-white transition-colors">
                  Obras y Faenas
                </a>
              </li>
              <li>
                <a href="/#historia" className="hover:text-white transition-colors">
                  Nosotros
                </a>
              </li>
            </ul>
          </div>

          {/* Oficinas */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.25em] font-bold text-[#C16A28]">
              Oficina Central
            </h4>
            <div className="text-xs text-stone-400 space-y-1.5 font-normal">
              <p><strong className="text-stone-200">Lunes a Viernes:</strong> 08:30 – 18:30</p>
              <p><strong className="text-stone-200">Sábados:</strong> 08:30 – 13:30</p>
              <p className="pt-2 text-stone-300">📍 Av. Industrial 450, Of. 302</p>
            </div>
          </div>

          {/* Canales */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.25em] font-bold text-[#C16A28]">
              Contacto Directo
            </h4>
            <div className="space-y-2 text-xs">
              <a 
                href="https://wa.me/56912345678" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block text-stone-300 hover:text-white transition-colors"
              >
                📱 WhatsApp: +56 9 1234 5678
              </a>
              <a 
                href="mailto:contacto@rokami.cl" 
                className="block text-stone-300 hover:text-white transition-colors"
              >
                ✉️ contacto@rokami.cl
              </a>
              <span className="inline-block mt-2 px-3 py-1 bg-[#2A3036] text-[#C16A28] text-[10px] uppercase tracking-wider font-extrabold rounded">
                Cobertura Regional
              </span>
            </div>
          </div>

        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 font-normal gap-4">
          <p>© {new Date().getFullYear()} ROKAMI Ingeniería y Construcción. Todos los derechos reservados.</p>
          <p className="tracking-wider uppercase text-[10px] text-stone-400 font-bold">La fuerza de construir con experiencia</p>
        </div>
      </div>
    </footer>
  )
}