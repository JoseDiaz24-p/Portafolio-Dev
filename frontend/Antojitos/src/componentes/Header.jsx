import React, { useState } from 'react'
import logo from '../assets/logo.png'

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
    <header className="sticky top-0 z-50 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-stone-200/80 py-2 px-4 sm:px-8 text-stone-800 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* 1. Lado Izquierdo: Menú Desktop */}
        <nav className="hidden lg:flex space-x-8 text-xs tracking-widest font-medium text-stone-700 items-center">
          <a href="#menu" className="hover:text-stone-900 transition-colors uppercase">
            MENÚ
          </a>
          <a href="#historia" className="hover:text-stone-900 transition-colors uppercase">
            NOSOTROS
          </a>

          {/* Desplegable Contacto */}
          <div className="relative">
            <button
              type="button"
              onClick={toggleContact}
              className="hover:text-stone-900 transition-colors uppercase tracking-widest flex items-center gap-1 font-medium text-xs cursor-pointer"
            >
              CONTACTO
              <span className="text-stone-400 text-[10px]">▼</span>
            </button>

            {openContact && (
              <div className="absolute left-0 top-full mt-4 group h-80 w-72 [perspective:1000px] z-50 shadow-2xl rounded-2xl">
                <div className="duration-700 w-full h-full [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] transition-all">

                  {/* Frente Contacto */}
                  <div className="absolute w-full h-full rounded-2xl bg-[#FFFDF9] p-6 text-stone-800 border border-stone-200 shadow-md [backface-visibility:hidden] flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-lg font-serif italic font-bold text-stone-900">Escríbenos</span>
                        <span className="text-2xl">💬</span>
                      </div>

                      <div className="mt-5 space-y-4 text-xs normal-case tracking-normal">
                        <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-100">
                          <p className="text-[10px] uppercase tracking-wider font-semibold text-stone-400">Instagram</p>
                          <a 
                            href="https://www.instagram.com/antojitos.cordova" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="font-medium !text-rose-700 hover:underline block mt-0.5 text-sm"
                          >
                            @antojitos.cordova
                          </a>
                        </div>

                        <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-100">
                          <p className="text-[10px] uppercase tracking-wider font-semibold text-stone-400">Teléfono / Pedidos</p>
                          <a 
                            href="https://wa.me/56912345678" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="font-medium !text-emerald-700 hover:underline block mt-0.5 text-sm"
                          >
                            +56 9 1234 5678
                          </a>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-stone-500 font-medium normal-case flex items-center gap-1">
                      <span>Gira la tarjeta para enlaces directos</span> <span>→</span>
                    </p>
                  </div>

                  {/* Reverso Contacto */}
                  <div className="absolute w-full h-full rounded-2xl bg-stone-900 p-6 text-white [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between">
                    <div>
                      <span className="text-lg font-serif italic font-bold text-amber-200">Atención Directa</span>
                      <p className="text-xs text-stone-300 mt-2 normal-case tracking-normal leading-relaxed">
                        Tomamos pedidos personalizados, tortas para eventos y consultas especiales.
                      </p>
                    </div>

                    <div className="space-y-2 mt-auto">
                      <a
                        href="https://www.instagram.com/antojitos.cordova"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block text-center py-2 px-3 bg-rose-100 hover:bg-rose-200 !text-rose-950 rounded-lg text-xs font-semibold transition-colors uppercase tracking-wider shadow-sm"
                      >
                        Abrir Instagram
                      </a>
                      <a
                        href="https://wa.me/56912345678?text=Hola%20Antojitos,%20quisiera%20hacer%20un%20pedido"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block text-center py-2 px-3 bg-emerald-100 hover:bg-emerald-200 !text-emerald-950 rounded-lg text-xs font-semibold transition-colors uppercase tracking-wider shadow-sm"
                      >
                        Escribir al WhatsApp
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </nav>

        {/* 2. Centro: Logo Adaptativo */}
        <a href="#" className="flex items-center group py-0.5">
          <img 
            src={logo} 
            alt="Antojitos Dulces Artesanales" 
            className="h-16 sm:h-20 lg:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-sm" 
          />
        </a>

        {/* 3. Lado Derecho: Ubicación y Pedido Online */}
        <div className="hidden lg:flex items-center space-x-6 text-xs tracking-widest font-medium text-stone-700">
          
          {/* Desplegable Ubicación */}
          <div className="relative">
            <button
              type="button"
              onClick={toggleLocation}
              className="hover:text-stone-900 transition-colors uppercase tracking-widest flex items-center gap-1 font-medium text-xs cursor-pointer"
            >
              Ubicación
              <span className="text-stone-400 text-[10px]">▼</span>
            </button>

            {openLocation && (
              <div className="absolute right-0 top-full mt-4 group h-80 w-72 [perspective:1000px] z-50 shadow-2xl rounded-2xl">
                <div className="duration-700 w-full h-full [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] transition-all">
                  
                  {/* Frente Ubicación */}
                  <div className="absolute w-full h-full rounded-2xl bg-[#FFFDF9] p-6 text-stone-800 border border-stone-200 shadow-md [backface-visibility:hidden] flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-lg font-serif italic font-bold text-stone-900">Nuestra Tienda</span>
                        <span className="text-2xl">📍</span>
                      </div>
                      <div className="mt-5 space-y-3 text-xs normal-case tracking-normal">
                        <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-100">
                          <p className="text-[10px] uppercase tracking-wider font-semibold text-stone-400">Dirección</p>
                          <p className="font-semibold text-stone-900 mt-0.5">Av. Siempre Viva 123, Local 4</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-100">
                          <p className="text-[10px] uppercase tracking-wider font-semibold text-stone-400">Horario</p>
                          <p className="text-stone-600 mt-0.5">Lun - Sáb: 09:00 a 20:00</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-[11px] text-stone-500 font-medium normal-case flex items-center gap-1">
                      <span>Gira la tarjeta para abrir el mapa</span> <span>→</span>
                    </p>
                  </div>

                  {/* Reverso Ubicación */}
                  <div className="absolute w-full h-full rounded-2xl bg-stone-900 p-6 text-white [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between">
                    <div>
                      <span className="text-lg font-serif italic font-bold text-amber-200">¿Cómo llegar?</span>
                      <p className="text-xs text-stone-300 mt-2 normal-case tracking-normal leading-relaxed">
                        Estamos a 2 cuadras de la estación central. Contamos con estacionamiento exclusivo para clientes.
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-auto">
                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-amber-100 hover:bg-amber-200 !text-stone-900 rounded-lg text-xs font-semibold transition-colors uppercase tracking-wider shadow-sm"
                      >
                        Abrir Maps
                      </a>
                      <span className="text-xl">🥐</span>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>

          <a
            href="https://wa.me/56912345678?text=Hola%20Antojitos,%20quisiera%20hacer%20un%20pedido"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-stone-900 !text-white px-5 py-2.5 rounded-full hover:bg-stone-800 transition-colors shadow-sm"
          >
            PEDIR ONLINE
          </a>
        </div>

        {/* 4. Botón Menú Móvil */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href="https://wa.me/56912345678?text=Hola%20Antojitos,%20quisiera%20hacer%20un%20pedido"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-stone-900 !text-white text-[11px] px-3.5 py-1.5 rounded-full font-medium shadow-sm"
          >
            Pedir
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-800 hover:text-stone-900 focus:outline-none cursor-pointer"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? (
              <span className="text-2xl font-bold">✕</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>
        </div>

      </div>

      {/* 5. Desplegable Móvil */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-4 border-t border-stone-200/80 space-y-4 px-2 pb-4 text-center bg-[#FAF9F5] rounded-2xl shadow-inner">
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-xs tracking-widest font-semibold uppercase text-stone-700 hover:text-stone-900"
          >
            Menú & Precios
          </a>
          <a
            href="#historia"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-xs tracking-widest font-semibold uppercase text-stone-700 hover:text-stone-900"
          >
            Nosotros / Historia
          </a>
          <a
            href="https://www.instagram.com/antojitos.cordova"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-2 text-xs font-semibold text-rose-700 hover:text-rose-800"
          >
            📷 Instagram: @antojitos.cordova
          </a>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-2 text-xs font-semibold text-amber-900 hover:text-stone-900"
          >
            📍 Av. Siempre Viva 123, Local 4 (Ver Mapa)
          </a>
        </div>
      )}
    </header>
  )
}