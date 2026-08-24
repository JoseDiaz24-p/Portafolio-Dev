import React from 'react'
import Chef from '../assets/Chef.jpg'

import pan_glaseado from '../assets/pan_glaseado.jpg'
import taller from '../assets/taller.jpg'


export default function AboutStory() {
  return (
    <section id="historia" className="scroll-mt-24 bg-white py-24 px-6 border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Columna Izquierda: Historia */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-semibold">
            — Nuestro Taller & Trazabilidad —
          </span>

          <h2 className="text-4xl sm:text-5xl font-serif text-stone-900 leading-tight">
            Nuestra obsesión con la masa perfecta
          </h2>

          <div className="space-y-4 text-stone-600 text-sm sm:text-base font-light leading-relaxed">
            <p>
              Antojitos nació en una pequeña cocina con tres principios inquebrantables: honrar la tradición del hojaldrado artesanal, seleccionar fruta fresca de temporada y crear piezas dulces que deleiten tanto a la vista como al paladar.
            </p>
            <p>
              Cada mañana laminamos a mano masas con mantequilla de alta pureza y fermentaciones lentas de hasta 36 horas. Es un proceso pausado y meticuloso que jamás intentamos apurar.
            </p>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-stone-100">
            <img 
              src={Chef} 
              alt="Chef Pastelera" 
              className="w-12 h-12 rounded-full object-cover shadow-sm border border-stone-200"
            />
            <div>
              <h4 className="font-serif font-bold text-stone-900 text-sm">Pastelería Antojitos</h4>
              <p className="text-xs text-stone-500">Elaboración 100% Casera y Artesanal</p>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Fotos */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-6">
          <div className="overflow-hidden rounded-3xl shadow-sm bg-stone-100 aspect-[3/4]">
            <img 
              src={pan_glaseado}
              alt="Glaseado" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
            />
          </div>
          <div className="overflow-hidden rounded-3xl shadow-sm bg-stone-100 aspect-[3/4]">
            <img 
              src={taller}
              alt="Taller de pastelería" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
            />
          </div>
        </div>

      </div>
    </section>
  )
}