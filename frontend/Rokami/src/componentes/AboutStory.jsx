import React from 'react'

export default function AboutStory() {
  return (
    <section id="historia" className="scroll-mt-24 bg-white py-24 px-6 border-t border-[#D7D2C8]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Identidad y Trayectoria */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C16A28] font-bold">
            Respaldo Técnico & Compromiso
          </span>

          <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#2A3036] tracking-tight leading-tight">
            La fuerza de construir con experiencia
          </h2>

          <div className="space-y-4 text-stone-600 text-sm sm:text-base font-normal leading-relaxed">
            <p>
              En <strong className="text-[#2A3036] font-bold">ROKAMI</strong> convertimos proyectos arquitectónicos e industriales en estructuras seguras y precisas. Cumplimos con altos estándares en cubicación de materiales, control de faena y normativas de seguridad vigentes.
            </p>
            <p>
              Nuestra ingeniería equilibra la resistencia del hormigón masivo, la rigidez del acero estructural y la elegancia de las terminaciones en maderas nobles tratadas.
            </p>
          </div>

          <div className="flex items-center gap-4 pt-6 border-t border-stone-200">
            <div className="w-12 h-12 rounded-lg bg-[#2A3036] text-[#C16A28] flex items-center justify-center font-black text-xl shadow-sm border border-stone-300">
              R
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-wide text-[#2A3036] text-sm">
                ROKAMI Ingeniería y Construcción
              </h4>
              <p className="text-xs text-[#C16A28] font-bold uppercase tracking-wider">
                Cálculo · Montaje · Edificación Integral
              </p>
            </div>
          </div>
        </div>

        {/* Fotos Técnicas */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-6">
          <div className="group overflow-hidden rounded-lg shadow-md bg-[#2A3036] aspect-[3/4] border border-[#D7D2C8] relative">
            <img 
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=700&auto=format&fit=crop"
              alt="Supervisión técnica de obras" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95" 
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#191D21]/90 to-transparent p-4">
              <p className="text-white text-xs font-bold uppercase tracking-wider">Control en Terreno</p>
            </div>
          </div>

          <div className="group overflow-hidden rounded-lg shadow-md bg-[#2A3036] aspect-[3/4] border border-[#D7D2C8] relative">
            <img 
              src="https://images.unsplash.com/photo-1541971875076-8f970d573be6?w=700&auto=format&fit=crop" 
              alt="Materiales y faena" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95" 
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#191D21]/90 to-transparent p-4">
              <p className="text-white text-xs font-bold uppercase tracking-wider">Calidad de Materiales</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}