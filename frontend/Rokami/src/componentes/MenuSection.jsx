import React, { useState } from 'react'

// Imports Locales - Salud
import Angiografia1 from '../assets/Salud/Angiografia1.jpeg'
import Angiografia2 from '../assets/Salud/Angiografia2.jpeg'
import Angiografia3 from '../assets/Salud/Angiografia3.jpeg'
import EspaciosClinicos1 from '../assets/Salud/EspaciosClinicos1.jpeg'
import Imagenologia1 from '../assets/Salud/Imagenologia1.jpeg'
import Odontologia1 from '../assets/Salud/Odontologia1.jpeg'
import Odontologia2 from '../assets/Salud/Odontologia2.jpeg'
import Odontologia3 from '../assets/Salud/Odontologia3.jpeg'
import Odontologia4 from '../assets/Salud/Odontologia4.jpeg'
import Odontologia5 from '../assets/Salud/Odontologia5.jpeg'

// Imports Locales - Educación e Industria y Retail
import Educacion1 from '../assets/Educacion/Educacion1.jpeg'
import IndustriaYRetail1 from '../assets/Industria Y Retail/Industria Y Retail1.jpeg'

const categorias = ['Todos', 'Salud', 'Oficinas', 'Educacion', 'Vivienda', 'Industria Y Retail']

const servicios = [
  // Salud
  { 
    nombre: 'Angiografía - Pabellón 1', 
    cat: 'Salud', 
    tipo: 'Angiografía', 
    desc: 'Áreas clínicas especializadas, habilitadas y remodelaciones con blindaje técnico.', 
    img: Angiografia1
  },
  { 
    nombre: 'Angiografía - Control y Monitoreo', 
    cat: 'Salud', 
    tipo: 'Angiografía', 
    desc: 'Áreas clínicas especializadas, habilitadas y remodelaciones.', 
    img: Angiografia2
  },
  { 
    nombre: 'Angiografía - Soporte Técnico', 
    cat: 'Salud', 
    tipo: 'Angiografía', 
    desc: 'Áreas clínicas especializadas, habilitadas y remodelaciones.', 
    img: Angiografia3
  },
  { 
    nombre: 'Odontología - Módulo 1', 
    cat: 'Salud', 
    tipo: 'Odontología', 
    desc: 'Habilitaciones interiores y espacios de atención clínica.', 
    img: Odontologia1 
  },
  { 
    nombre: 'Odontología - Módulo 2', 
    cat: 'Salud', 
    tipo: 'Odontología', 
    desc: 'Habilitaciones interiores y espacios de atención clínica.', 
    img: Odontologia2 
  },
  { 
    nombre: 'Odontología - Módulo 3', 
    cat: 'Salud', 
    tipo: 'Odontología', 
    desc: 'Habilitaciones interiores y espacios de atención clínica.', 
    img: Odontologia3 
  },
  { 
    nombre: 'Odontología - Módulo 4', 
    cat: 'Salud', 
    tipo: 'Odontología', 
    desc: 'Habilitaciones interiores y espacios de atención clínica.', 
    img: Odontologia4
  },
  { 
    nombre: 'Odontología - Módulo 5', 
    cat: 'Salud', 
    tipo: 'Odontología', 
    desc: 'Habilitaciones interiores y espacios de atención clínica.', 
    img: Odontologia5 
  },
  { 
    nombre: 'Imagenología', 
    cat: 'Salud', 
    tipo: 'Imagenología', 
    desc: 'TAC y radiología en salas de alta exigencia técnica y estructural.', 
    img: Imagenologia1 
  },
  { 
    nombre: 'Espacios Clínicos', 
    cat: 'Salud', 
    tipo: 'Espacios Clínicos', 
    desc: 'Infraestructura de apoyo y áreas sanitarias reguladas.', 
    img: EspaciosClinicos1
  },

  // Educación
  { 
    nombre: 'Infraestructura Educativa', 
    cat: 'Educacion', 
    tipo: 'Educación', 
    desc: 'Construcción y remodelación de aulas, laboratorios, bibliotecas y espacios institucionales de alto tráfico.', 
    img: Educacion1
  },

  // Industria y Retail
  { 
    nombre: 'Plantas Industriales & Retail', 
    cat: 'Industria Y Retail', 
    tipo: 'Comercial e Industrial', 
    desc: 'Montaje estructural de galpones, bodegas logísticas, radieres pesados y remodelaciones de locales comerciales.', 
    img: IndustriaYRetail1
  },
]

export default function MenuSection() {
  const [activa, setActiva] = useState('Todos')

  const filtrados = activa === 'Todos' 
    ? servicios 
    : servicios.filter(s => s.cat === activa)

  return (
    <section id="servicios" className="scroll-mt-24 py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Encabezado */}
      <div className="text-center mb-10 sm:mb-14">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C16A28] font-bold">
          Ingeniería Aplicada y Obras Especializadas
        </span>
        <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#2A3036] tracking-tight mt-2">
          Catálogo de Servicios y Proyectos
        </h2>
        <div className="h-1 w-16 bg-[#C16A28] mx-auto mt-4"></div>
      </div>

      {/* Botones de Categorías */}
      <div className="flex justify-center gap-2 sm:gap-3 mb-12 flex-wrap">
        {categorias.map(cat => (
          <button
            key={cat}
            onClick={() => setActiva(cat)}
            className={`px-5 py-2 text-xs uppercase tracking-wider font-bold rounded transition-colors cursor-pointer border ${
              activa === cat 
                ? 'bg-[#2A3036] text-white border-[#2A3036]' 
                : 'bg-white text-[#2A3036] border-[#D7D2C8] hover:bg-[#D7D2C8]/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Responsivo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filtrados.map((serv, index) => (
          <div 
            key={`${serv.nombre}-${index}`} 
            className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#D7D2C8] flex flex-col justify-between hover:shadow-md transition-shadow group"
          >
            <div className="h-56 overflow-hidden relative bg-[#191D21]">
              <img 
                src={serv.img} 
                alt={serv.nombre} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <span className="absolute top-3 right-3 bg-[#191D21]/90 text-[#C16A28] border border-[#C16A28]/40 text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded">
                {serv.tipo}
              </span>
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#C16A28] font-bold block mb-1">
                  {serv.cat}
                </span>
                <h3 className="font-bold text-[#2A3036] text-lg uppercase tracking-tight leading-snug mb-3">
                  {serv.nombre}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  {serv.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <a
                  href={`https://wa.me/56912345678?text=Hola%20ROKAMI,%20quisiera%20cotizar%20el%20proyecto%20de%20${encodeURIComponent(serv.nombre)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-wider font-bold text-[#C16A28] hover:text-[#964E19] flex items-center gap-1 transition-colors"
                >
                  Cotizar Proyecto →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}