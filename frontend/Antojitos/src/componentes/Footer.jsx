import React from 'react'
import logo from '../assets/logo.png'

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Grid Principal del Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Columna 1: Identidad y Logo */}
          <div className="space-y-4">
            <div className="bg-[#FAF9F5] p-2.5 rounded-2xl inline-block shadow-sm">
              <img 
                src={logo} 
                alt="Logo Antojitos" 
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Pastelería fina y repostería artesanal horneada a diario con ingredientes seleccionados y amor por la tradición.
            </p>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-200">
              Nosotros
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" className="hover:text-amber-200 transition-colors">
                  Nuestra Carta Dulce
                </a>
              </li>
              <li>
                <a href="#historia" className="hover:text-amber-200 transition-colors">
                  Historia & Taller
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/56912345678?text=Hola%20Antojitos,%20quisiera%20hacer%20un%20pedido%20personalizado" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-200 transition-colors"
                >
                  Pedidos para Eventos
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Horarios & Dirección */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-200">
              Horario & Tienda
            </h4>
            <div className="text-xs text-stone-400 space-y-1.5 font-light">
              <p><strong className="text-stone-200 font-normal">Lunes a Sábado:</strong> 09:00 – 20:00</p>
              <p><strong className="text-stone-200 font-normal">Domingos & Festivos:</strong> 10:00 – 16:00</p>
              <p className="pt-2 text-stone-300">📍 Av. Siempre Viva 123, Local 4</p>
            </div>
          </div>

          {/* Columna 4: Contacto & Redes */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-200">
              Contacto Directo
            </h4>
            <div className="space-y-2 text-xs">
              <a 
                href="https://wa.me/56912345678" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                💬 WhatsApp: +56 9 1234 5678
              </a>
              <a 
                href="https://www.instagram.com/antojitos.cordova" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-rose-400 hover:text-rose-300 transition-colors"
              >
                📷 Instagram: @antojitos.pasteleria
              </a>
            </div>
          </div>

        </div>

        {/* Barra Inferior de Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 font-light gap-4">
          <p>© {new Date().getFullYear()} Antojitos Dulces Artesanales. Todos los derechos reservados.</p>
          <p className="tracking-wider uppercase text-[10px]">Hecho con dedicación y mantequilla pura</p>
        </div>

      </div>
    </footer>
  )
}