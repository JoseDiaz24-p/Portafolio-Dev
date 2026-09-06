import React from 'react'

export default function Gallery() {
  return (
    <section id="galeria" className="bg-[#F4F2EF] px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#D7D2C8]">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#C16A28] font-bold">
              Portafolio Técnico
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#2A3036] tracking-tight mt-1">
              Obras y Faenas Recientes
            </h2>
          </div>
          <span className="hidden sm:block text-xs uppercase tracking-widest text-stone-500 font-bold">
            Garantía Estructural
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative overflow-hidden rounded-lg shadow-md bg-[#191D21] aspect-[4/5] border border-[#D7D2C8]">
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?w=800&auto=format&fit=crop" 
              alt="Obras Civiles y Hormigón Armado" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#191D21]/95 via-[#191D21]/30 to-transparent flex items-end p-6">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#C16A28] font-black">
                  Obra Gruesa
                </span>
                <h3 className="text-white font-black text-lg uppercase tracking-wide mt-1">
                  Fundaciones y Hormigón
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  Movimientos de terreno, emplantillados y radieres masivos.
                </p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg shadow-md bg-[#191D21] aspect-[4/5] border border-[#D7D2C8]">
            <img 
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop" 
              alt="Montaje de Estructuras Metálicas" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#191D21]/95 via-[#191D21]/30 to-transparent flex items-end p-6">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#C16A28] font-black">
                  Montaje
                </span>
                <h3 className="text-white font-black text-lg uppercase tracking-wide mt-1">
                  Estructuras de Acero
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  Fabricación e izaje de marcos rígidos y galpones industriales.
                </p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-lg shadow-md bg-[#191D21] aspect-[4/5] border border-[#D7D2C8]">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop" 
              alt="Edificación y Acabados" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#191D21]/95 via-[#191D21]/30 to-transparent flex items-end p-6">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#C16A28] font-black">
                  Terminaciones
                </span>
                <h3 className="text-white font-black text-lg uppercase tracking-wide mt-1">
                  Maderas & Acabados
                </h3>
                <p className="text-xs text-stone-300 mt-1">
                  Arquitectura habitacional, vigas a la vista y carpintería técnica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}