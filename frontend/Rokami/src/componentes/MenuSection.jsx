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

const catalogoCompleto = {
  salud: {
    nombre: 'Salud',
    resumen: 'Recintos clínicos y blindajes',
    subcategorias: [
      {
        id: 'angio',
        titulo: 'Pabellón Angiográfico',
        faena: 'Blindaje Plomado y Soporte en Losa',
        detalles: 'Áreas de intervención vascular con blindaje perimetral para arcos en C y monitoreo central.',
        obras: [
          { img: Angiografia1, nombre: 'Pabellón Principal', tipo: 'Blindaje Técnico' },
          { img: Angiografia2, nombre: 'Sala de Monitoreo', tipo: 'Control Técnico' },
          { img: Angiografia3, nombre: 'Soporte Estructural', tipo: 'Refuerzo de Losa' }
        ]
      },
      {
        id: 'odonto',
        titulo: 'Módulos Odontológicos',
        faena: 'Redes Sanitarias y Aire Seco',
        detalles: 'Clínicas dentales completas con canalización bajo radier, curva sanitaria y mobiliario aséptico.',
        obras: [
          { img: Odontologia1, nombre: 'Box Dental 1', tipo: 'Red Sanitaria' },
          { img: Odontologia2, nombre: 'Box Dental 2', tipo: 'Mobiliario Técnico' },
          { img: Odontologia3, nombre: 'Box Dental 3', tipo: 'Curva Sanitaria' },
          { img: Odontologia4, nombre: 'Box Dental 4', tipo: 'Canalización' },
          { img: Odontologia5, nombre: 'Box Dental 5', tipo: 'Esterilización' }
        ]
      },
      {
        id: 'imagen',
        titulo: 'Imagenología y Resonancia',
        faena: 'Salas TAC y Rayos X',
        detalles: 'Revestimientos baritados de alta densidad y protección radiológica certificada.',
        obras: [
          { img: Imagenologia1, nombre: 'Sala TAC & Escáner', tipo: 'Radioprotección' }
        ]
      },
      {
        id: 'espacios',
        titulo: 'Espacios Clínicos y Apoyo',
        faena: 'Áreas Sanitarias Reguladas',
        detalles: 'Lavamanos quirúrgicos, farmacia institucional y vestidores clínicos reglamentarios.',
        obras: [
          { img: EspaciosClinicos1, nombre: 'Área Sanitaria Central', tipo: 'Circulación Aséptica' }
        ]
      }
    ]
  },

  educacion: {
    nombre: 'Educación',
    resumen: 'Recintos formativos de alto tránsito',
    subcategorias: [
      {
        id: 'aulas',
        titulo: 'Aulas y Salas de Clase',
        faena: 'Remodelación y Acústica',
        detalles: 'Acondicionamiento para colegios y universidades con iluminación técnica y aislación sonora.',
        obras: [
          { img: Educacion1, nombre: 'Pabellón de Clases', tipo: 'Alto Tráfico' }
        ]
      },
      {
        id: 'laboratorios',
        titulo: 'Laboratorios y Bibliotecas',
        faena: 'Mobiliario Técnico y Redes',
        detalles: 'Zonas de estudio e investigación con instalaciones sanitarias y eléctricas reforzadas.',
        obras: [
          { img: Educacion1, nombre: 'Área de Laboratorio', tipo: 'Instalaciones Técnicas' }
        ]
      }
    ]
  },

  industria: {
    nombre: 'Industria y Retail',
    resumen: 'Montaje de acero pesado y bodegas',
    subcategorias: [
      {
        id: 'galpones',
        titulo: 'Galpones y Naves de Acero',
        faena: 'Montaje Estructural Pesado',
        detalles: 'Fabricación e izaje de cerchas, marcos rígidos certificados y radieres de alta carga.',
        obras: [
          { img: IndustriaYRetail1, nombre: 'Nave de Almacenamiento', tipo: 'Estructura Metálica' }
        ]
      },
      {
        id: 'retail',
        titulo: 'Locales y Centros Comerciales',
        faena: 'Habilitación Comercial Integral',
        detalles: 'Tabiquería vidriada, cortinas metálicas y terminaciones de alto estándar.',
        obras: [
          { img: IndustriaYRetail1, nombre: 'Local Comercial', tipo: 'Obra Comercial' }
        ]
      }
    ]
  },

  oficinas: {
    nombre: 'Oficinas',
    resumen: 'Plantas libres corporativas y HVAC',
    subcategorias: [
      {
        id: 'corporativo',
        titulo: 'Plantas Libres Corporativas',
        faena: 'Piso Técnico y Climatización',
        detalles: 'Instalación de piso técnico elevado, canalizaciones de datos y cielo modular acústico.',
        obras: [
          { img: EspaciosClinicos1, nombre: 'Piso Corporativo', tipo: 'Planta Libre' }
        ]
      }
    ]
  },

  vivienda: {
    nombre: 'Vivienda',
    resumen: 'Edificación habitacional y acabados',
    subcategorias: [
      {
        id: 'casas',
        titulo: 'Construcción Habitacional',
        faena: 'Obra Llave en Mano',
        detalles: 'Fundaciones, radieres antisísmicos, techumbres y carpintería técnica a medida.',
        obras: [
          { img: Angiografia3, nombre: 'Estructura Residencial', tipo: 'Obra Gruesa' }
        ]
      }
    ]
  }
}

export default function MenuSection() {
  const [categoriaKey, setCategoriaKey] = useState('salud')
  const [subcategoriaIndex, setSubcategoriaIndex] = useState(0)

  const catActual = catalogoCompleto[categoriaKey]
  const subActual = catActual.subcategorias[subcategoriaIndex] || catActual.subcategorias[0]

  const handleCambioCategoria = (key) => {
    setCategoriaKey(key)
    setSubcategoriaIndex(0)
  }

  const totalObrasCategoria = (cat) =>
    cat.subcategorias.reduce((acc, sub) => acc + sub.obras.length, 0)

  return (
    <section id="servicios" className="scroll-mt-24 py-12 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto font-sans">
      
      {/* Encabezado */}
      <div className="text-center mb-10 sm:mb-14">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C16A28] font-bold">
          Ingeniería Aplicada y Obras Especializadas
        </span>
        <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#2A3036] tracking-tight mt-2">
          Catálogo Técnico de Proyectos
        </h2>
        <div className="h-1 w-16 bg-[#C16A28] mx-auto mt-4"></div>
      </div>

      {/* Panel Unificado en 3 Columnas Paralelas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white p-5 sm:p-7 rounded-xl border border-[#D7D2C8] shadow-sm">
        
        {/* COLUMNA 1: Menú de Áreas Generales (3 columnas de 12) */}
        <div className="lg:col-span-3 space-y-2.5">
          <div className="pb-2 border-b border-stone-200 mb-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#C16A28] block">
              1. Área General
            </span>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Sector de intervención
            </p>
          </div>

          <div className="space-y-2">
            {Object.entries(catalogoCompleto).map(([key, cat]) => {
              const estaActiva = categoriaKey === key
              const total = totalObrasCategoria(cat)

              return (
                <button
                  key={key}
                  onClick={() => handleCambioCategoria(key)}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                    estaActiva
                      ? 'border-[#C16A28] bg-[#F4F2EF] shadow-sm ring-1 ring-[#C16A28] translate-x-1'
                      : 'border-[#D7D2C8] bg-white hover:border-stone-400 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <h4 className={`font-bold text-xs uppercase tracking-tight ${estaActiva ? 'text-[#C16A28]' : 'text-[#2A3036]'}`}>
                      {cat.nombre}
                    </h4>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      estaActiva ? 'bg-[#C16A28] text-white' : 'bg-stone-200 text-[#2A3036]'
                    }`}>
                      {total}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 line-clamp-1 font-normal">
                    {cat.resumen}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* COLUMNA 2: Submenú de Especialidades (3 columnas de 12) */}
        <div className="lg:col-span-3 space-y-2.5 lg:border-l lg:border-stone-200 lg:pl-6">
          <div className="pb-2 border-b border-stone-200 mb-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#C16A28] block">
              2. Especialidad en {catActual.nombre}
            </span>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Partida o tipo de faena
            </p>
          </div>

          <div className="space-y-2">
            {catActual.subcategorias.map((sub, idx) => {
              const estaActivo = subcategoriaIndex === idx

              return (
                <button
                  key={sub.id}
                  onClick={() => setSubcategoriaIndex(idx)}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                    estaActivo
                      ? 'border-[#C16A28] bg-[#F4F2EF] shadow-sm ring-1 ring-[#C16A28] translate-x-1'
                      : 'border-[#D7D2C8] bg-white hover:border-stone-400 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <h4 className={`font-bold text-xs uppercase tracking-tight ${estaActivo ? 'text-[#C16A28]' : 'text-[#2A3036]'}`}>
                      {sub.titulo}
                    </h4>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      estaActivo ? 'bg-[#C16A28] text-white' : 'bg-stone-200 text-[#2A3036]'
                    }`}>
                      {sub.obras.length}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 line-clamp-1 font-normal">
                    {sub.faena}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* COLUMNA 3: Visor de Obras y Galería (6 columnas de 12) */}
        <div className="lg:col-span-6 flex flex-col justify-between lg:border-l lg:border-stone-200 lg:pl-6">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-2 mb-3 border-b border-[#D7D2C8] gap-1">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#C16A28] font-bold">
                  {catActual.nombre} · {subActual.faena}
                </span>
                <h3 className="font-black uppercase text-lg text-[#2A3036] tracking-tight mt-0.5">
                  {subActual.titulo}
                </h3>
              </div>
              <span className="text-xs font-bold text-stone-500">
                {subActual.obras.length} {subActual.obras.length === 1 ? 'faena' : 'faenas'}
              </span>
            </div>

            <p className="text-xs text-stone-600 mb-5 leading-relaxed bg-[#F4F2EF] p-2.5 rounded border border-stone-200">
              {subActual.detalles}
            </p>

            {/* Grid fotográfico adaptativo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {subActual.obras.map((obra, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-lg overflow-hidden border border-[#D7D2C8] shadow-sm flex flex-col justify-between group hover:border-[#C16A28] transition-all"
                >
                  <div className="h-40 relative overflow-hidden bg-[#191D21]">
                    <img 
                      src={obra.img} 
                      alt={obra.nombre} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute top-2 right-2 bg-[#191D21]/90 text-[#C16A28] border border-[#C16A28]/40 text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded">
                      {obra.tipo}
                    </span>
                  </div>

                  <div className="p-3">
                    <h5 className="font-bold text-xs uppercase text-[#2A3036] mb-1">
                      {obra.nombre}
                    </h5>
                    <a
                      href={`https://wa.me/56912345678?text=Hola%20ROKAMI,%20quisiera%20cotizar%20un%20proyecto%20similar%20a%20${encodeURIComponent(obra.nombre)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] uppercase font-bold text-[#C16A28] hover:text-[#964E19] inline-block mt-1"
                    >
                      Cotizar Faena →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Barra inferior de cotización */}
          <div className="mt-6 pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-stone-500 text-center sm:text-left">
              ¿Requieres cubicación técnica de esta especialidad?
            </span>
            <a
              href={`https://wa.me/56912345678?text=Hola%20ROKAMI,%20quisiera%20solicitar%20evaluación%20técnica%20para%20${encodeURIComponent(subActual.titulo)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C16A28] hover:bg-[#964E19] text-white px-4 py-2 rounded text-[11px] font-bold uppercase tracking-wider transition-colors whitespace-nowrap shadow-sm"
            >
              Consultar Especialista
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}