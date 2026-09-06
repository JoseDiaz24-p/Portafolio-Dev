import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const [openLocation, setOpenLocation] = useState(false)
  const [openContact, setOpenContact] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleLocation = () => {
    setOpenLocation(!openLocation)
    if (openContact) setOpenContact(false)
  }

  const toggleContact = () => {
    setOpenContact(!openContact)
    if (openLocation) setOpenLocation(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-[#191D21]/95 backdrop-blur-md border-b border-[#2A3036] py-3 px-4 sm:px-8 text-white transition-all shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Lado Izquierdo: Menú Desktop */}
        <nav className="hidden lg:flex space-x-8 text-xs tracking-[0.2em] font-bold text-gray-300 items-center">
          <Link to="/menu" className="hover:text-[#C16A28] transition-colors uppercase">
            SERVICIOS
          </Link>
          <a href="/#historia" className="hover:text-[#C16A28] transition-colors uppercase">
            NOSOTROS
          </a>

          {/* Desplegable Contacto */}
          <div className="relative">
            <button
              type="button"
              onClick={toggleContact}
              className="hover:text-[#C16A28] transition-colors uppercase tracking-[0.2em] flex items-center gap-1.5 font-bold text-xs cursor-pointer"
            >
              CONTACTO
              <span className="text-[#C16A28] text-[9px]">▼</span>
            </button>

            {openContact && (
              <div className="absolute left-0 top-full mt-4 group h-80 w-72 [perspective:1000px] z-50 shadow-2xl rounded-xl">
                <div className="duration-700 w-full h-full [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] transition-all">
                  <div className="absolute w-full h-full rounded-xl bg-[#2A3036] p-6 text-white border border-[#3E464E] shadow-xl [backface-visibility:hidden] flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-base font-bold uppercase tracking-wider text-white">Canales Directos</span>
                        <span className="text-xl">🏗️</span>
                      </div>

                      <div className="mt-5 space-y-3 text-xs normal-case tracking-normal">
                        <div className="p-2.5 rounded bg-[#191D21] border border-stone-700">
                          <p className="text-[10px] uppercase tracking-wider font-bold text-[#C16A28]">WhatsApp Técnico</p>
                          <a 
                            href="https://wa.me/56912345678" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="font-medium text-gray-200 hover:text-white block mt-0.5 text-sm"
                          >
                            +56 9 1234 5678
                          </a>
                        </div>

                        <div className="p-2.5 rounded bg-[#191D21] border border-stone-700">
                          <p className="text-[10px] uppercase tracking-wider font-bold text-[#C16A28]">Correo Corporativo</p>
                          <a 
                            href="mailto:contacto@rokami.cl" 
                            className="font-medium text-gray-200 hover:text-white block mt-0.5 text-xs truncate"
                          >
                            contacto@rokami.cl
                          </a>
                        </div>
                      </div>
                    </div>

                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                      <span>Girar ficha técnica</span> <span>→</span>
                    </p>
                  </div>

                  <div className="absolute w-full h-full rounded-xl bg-[#191D21] p-6 text-white border border-[#C16A28] [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between">
                    <div>
                      <span className="text-base font-bold uppercase tracking-wider text-[#C16A28]">Cotizaciones</span>
                      <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                        Cálculo de presupuestos de obra, cubicaciones técnicas y asesorías estructurales.
                      </p>
                    </div>

                    <div className="space-y-2 mt-auto">
                      <a
                        href="https://wa.me/56912345678?text=Hola%20ROKAMI,%20quisiera%20cotizar%20un%20proyecto"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block text-center py-2.5 px-3 bg-[#C16A28] hover:bg-[#964E19] text-white rounded text-xs font-bold transition-colors uppercase tracking-wider shadow-sm"
                      >
                        Chatear por WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Centro: Logo SVG / Tipográfico Vectorial ROKAMI */}
        <Link to="/" className="flex items-center gap-2 group py-1">
          <div className="h-10 w-10 bg-[#2A3036] border border-[#C16A28] rounded flex items-center justify-center text-[#C16A28] font-black text-xl shadow-sm">
            R
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-[0.2em] text-white group-hover:text-[#C16A28] transition-colors uppercase leading-none">
              ROKAMI
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#C16A28] font-bold mt-0.5">
              Ingeniería y Construcción
            </span>
          </div>
        </Link>

        {/* Lado Derecho: Base Operativa y CTA */}
        <div className="hidden lg:flex items-center space-x-6 text-xs tracking-[0.2em] font-bold text-gray-300">
          <div className="relative">
            <button
              type="button"
              onClick={toggleLocation}
              className="hover:text-[#C16A28] transition-colors uppercase tracking-[0.2em] flex items-center gap-1.5 font-bold text-xs cursor-pointer"
            >
              OFICINA
              <span className="text-[#C16A28] text-[9px]">▼</span>
            </button>

            {openLocation && (
              <div className="absolute right-0 top-full mt-4 group h-80 w-72 [perspective:1000px] z-50 shadow-2xl rounded-xl">
                <div className="duration-700 w-full h-full [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] transition-all">
                  <div className="absolute w-full h-full rounded-xl bg-[#2A3036] p-6 text-white border border-[#3E464E] shadow-xl [backface-visibility:hidden] flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-base font-bold uppercase tracking-wider text-white">Base Operativa</span>
                        <span className="text-xl">📍</span>
                      </div>
                      <div className="mt-5 space-y-3 text-xs normal-case tracking-normal">
                        <div className="p-2.5 rounded bg-[#191D21] border border-stone-700">
                          <p className="text-[10px] uppercase tracking-wider font-bold text-[#C16A28]">Dirección</p>
                          <p className="font-semibold text-gray-200 mt-0.5">Av. Industrial 450, Of. 302</p>
                        </div>
                        <div className="p-2.5 rounded bg-[#191D21] border border-stone-700">
                          <p className="text-[10px] uppercase tracking-wider font-bold text-[#C16A28]">Horario Faenas</p>
                          <p className="text-gray-300 mt-0.5">Lun - Vie: 08:30 a 18:30</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                      <span>Ver localización</span> <span>→</span>
                    </p>
                  </div>

                  <div className="absolute w-full h-full rounded-xl bg-[#191D21] p-6 text-white border border-[#C16A28] [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between">
                    <div>
                      <span className="text-base font-bold uppercase tracking-wider text-[#C16A28]">Cobertura</span>
                      <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                        Despliegue integral en toda la región para obras civiles, montajes y faenas industriales.
                      </p>
                    </div>
                    <div className="mt-auto">
                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="block text-center w-full py-2.5 bg-[#C16A28] hover:bg-[#964E19] text-white rounded text-xs font-bold transition-colors uppercase tracking-wider"
                      >
                        Abrir Mapa
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <a
            href="https://wa.me/56912345678?text=Hola%20ROKAMI,%20quisiera%20cotizar%20un%20proyecto"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#C16A28] hover:bg-[#964E19] text-white px-5 py-2.5 rounded font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            COTIZAR OBRA
          </a>
        </div>

        {/* Menú Móvil Botones */}
        <div className="flex lg:hidden items-center gap-3">
          <a
            href="https://wa.me/56912345678?text=Hola%20ROKAMI,%20quisiera%20cotizar%20un%20proyecto"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#C16A28] text-white text-[11px] px-3.5 py-1.5 rounded font-bold uppercase tracking-wider shadow-sm"
          >
            Cotizar
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-gray-200 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <span className="text-2xl font-bold">✕</span> : <span className="text-2xl font-bold">☰</span>}
          </button>
        </div>

      </div>

      {/* Desplegable Móvil */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-4 border-t border-[#2A3036] space-y-4 px-3 pb-5 text-center bg-[#191D21] rounded-xl">
          <Link
            to="/menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-xs tracking-widest font-bold uppercase text-gray-300 hover:text-[#C16A28]"
          >
            Servicios y Obras
          </Link>
          <a
            href="/#historia"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-xs tracking-widest font-bold uppercase text-gray-300 hover:text-[#C16A28]"
          >
            Nuestra Empresa
          </a>
          <a
            href="https://wa.me/56912345678"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-2 text-xs font-bold text-[#C16A28]"
          >
            WhatsApp: +56 9 1234 5678
          </a>
        </div>
      )}
    </header>
  )
}