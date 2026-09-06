import React, { useState } from 'react'
import tarta from '../assets/tarta_limon.jpg'
import pastel from '../assets/Pastel_de_Chocolate.jpg'
import croissants from '../assets/Croissants_hojaldrados.jpg'
import pan from '../assets/Pan_Chocolate.jpg'
import macarons from '../assets/Macarons_Surtidos.jpg'
import torta from '../assets/Tartaletas.jpg'

const categorias = ['Todos', 'Tortas & Pasteles', 'Bollería & Hojaldres', 'Bocaditos']

const productos = [
  { 
    nombre: 'Tarta de Limón & Merengue', 
    cat: 'Tortas & Pasteles', 
    precio: '$18.900', 
    desc: 'Curd de limón natural con merengue italiano flambeado.', 
    img: tarta 
  },
  { 
    nombre: 'Pastel de Frambuesa & Chocolate', 
    cat: 'Tortas & Pasteles', 
    precio: '$21.500', 
    desc: 'Bizcocho húmedo de cacao con ganache y frutos frescos.', 
    img: pastel 
  },
  { 
    nombre: 'Croissant Tradicional de Mantequilla', 
    cat: 'Bollería & Hojaldres', 
    precio: '$2.500', 
    desc: '100% mantequilla laminada a mano, textura crujiente.', 
    img: croissants 
  },
  { 
    nombre: 'Pain au Chocolat', 
    cat: 'Bollería & Hojaldres', 
    precio: '$2.800', 
    desc: 'Hojaldre relleno de dos barras de chocolate semiamargo.', 
    img: pan 
  },
  { 
    nombre: 'Macarons Surtidos (Caja x6)', 
    cat: 'Bocaditos', 
    precio: '$8.500', 
    desc: 'Pistacho siciliano, frambuesa, vainilla y chocolate blanco.', 
    img: macarons 
  },
  { 
    nombre: 'Tartaleta de Frutas de Temporada', 
    cat: 'Bocaditos', 
    precio: '$3.800', 
    desc: 'Masa sableé crocante con crema diplomática y berries.', 
    img: torta 
  },
]

export default function MenuSection() {
  const [activa, setActiva] = useState('Todos')

  const filtrados = activa === 'Todos' 
    ? productos 
    : productos.filter(p => p.cat === activa)

  return (
    <section id="menu" className="scroll-mt-24 py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Encabezado */}
      <div className="text-center mb-8 sm:mb-12">
        <span className="text-xs tracking-widest text-amber-800 uppercase font-semibold">
          Selección de la Casa
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mt-2">
          Nuestra Carta Dulce
        </h2>
      </div>

      {/* Botones de Categorías */}
      <div className="flex justify-center gap-2 sm:gap-3 mb-10 flex-wrap">
        {categorias.map(cat => (
          <button
            key={cat}
            onClick={() => setActiva(cat)}
            className={`px-4 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs tracking-wider rounded-full transition-colors cursor-pointer ${
              activa === cat 
                ? 'bg-stone-900 text-white' 
                : 'bg-stone-200/60 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Responsivo (1 col en móvil, 2 cols en tablet, 3 cols en PC) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filtrados.map(prod => (
          <div 
            key={prod.nombre} 
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200/60 flex flex-col justify-between"
          >
            <div className="h-52 sm:h-56 overflow-hidden">
              <img 
                src={prod.img} 
                alt={prod.nombre} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex justify-between items-baseline mb-2 gap-2">
                <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg">
                  {prod.nombre}
                </h3>
                <span className="text-amber-900 font-semibold text-sm whitespace-nowrap">
                  {prod.precio}
                </span>
              </div>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                {prod.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}