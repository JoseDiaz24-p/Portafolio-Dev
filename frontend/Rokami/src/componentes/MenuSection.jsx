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
    resumen: 'Infraestructura clínica, blindajes y recintos estériles',
    subcategorias: [
      {
        id: 'angio',
        titulo: 'Pabellones de Angiografía',
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
        faena: 'Redes Sanitarias y Aire Comprimido',
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
    resumen: 'Recintos formativos de alto tráfico y aislación acústica',
    subcategorias: [
      {
        id: 'aulas',
        titulo: 'Aulas y Salas de Clase',
        faena: 'Remodelación y Acústica',
        detalles: 'Acondicionamiento para colegios y universidades con iluminación LED y aislación de ruidos.',
        obras: [
          { img: Educacion1, nombre: 'Pabellón de Clases', tipo: 'Alto Tránsito' }
        ]
      },
      {
        id: 'laboratorios',
        titulo: 'Laboratorios y Bibliotecas',
        faena: 'Mobiliario Técnico y Redes',
        detalles: 'Zonas de estudio e investigación con instalaciones eléctricas y sanitarias reforzadas.',
        obras: [
          { img: Educacion1, nombre: 'Área de Laboratorio', tipo: 'Instalaciones Técnicas' }
        ]
      }
    ]
  },

  industria: {
    nombre: 'Industria y Retail',
    resumen: 'Montaje de acero pesado, naves y centros comerciales',
    subcategorias: [
      {
        id: 'galpones',
        titulo: 'Galpones y Naves de Acero',
        faena: 'Montaje Estructural Pesado',
        detalles: 'Fabricación e izaje de cerchas, perfiles certificados y cubiertas con aislación térmica.',
        obras: [
          { img: IndustriaYRetail1, nombre: 'Nave de Almacenamiento', tipo: 'Estructura Metálica' }
        ]
      },
      {
        id: 'retail',
        titulo: 'Locales y Centros Comerciales',
        faena: 'Habilitación Comercial Integral',
        detalles: 'Tabiquería vidriada, cortinas metálicas motorizadas y terminaciones de alto flujo.',
        obras: [
          { img: IndustriaYRetail1, nombre: 'Local Comercial', tipo: 'Obra Comercial' }
        ]
      }
    ]
  },

  oficinas: {
    nombre: 'Oficinas',
    resumen: 'Plantas libres corporativas, climatización y piso técnico',
    subcategorias: [
      {
        id: 'corporativo',
        titulo: 'Plantas Libres Corporativas',
        faena: 'Cielo Falso y Climatización',
        detalles: 'Instalación de piso técnico elevado, canalizaciones de datos y cielo modular.',
        obras: [
          { img: EspaciosClinicos1, nombre: 'Piso Corporativo', tipo: 'Planta Libre' }
        ]
      }
    ]
  },

  vivienda: {
    nombre: 'Vivienda',
    resumen: 'Edificación habitacional, hormigón y maderas nobles',
    subcategorias: [
      {
        id: 'casas',
        titulo: 'Construcción Habitacional',
        faena: 'Obra Llave en Mano',
        detalles: 'Fundaciones, radieres antisísmicos, techumbres y carpintería de madera a la medida.',
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

  // Calcula el total de fotos/obras de cada categoría principal
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

      {/* 1. Menú Principal de Áreas (Mismo formato de tarjetas que el submenú) */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4 px-1">
          <span className="h-2 w-2 bg-[#C16A28] rounded-full"></span>
          <span className="text-[11px] uppercase tracking-[0.2em] font-extrabold text-[#2A3036]">
            Paso 1: Selecciona el Área General
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {Object.entries(catalogoCompleto).map(([key, cat]) => {
            const estaActiva = categoriaKey === key
            const cantidad = totalObrasCategoria(cat)

            return (
              <button
                key={key}
                onClick={() => handleCambioCategoria(key)}
                className={`text-left p-4 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                  estaActiva
                    ? 'border-[#C16A28] bg-white shadow-md ring-1 ring-[#C16A28]'
                    : 'border-[#D7D2C8] bg-white/70 hover:border-stone-400 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-1.5">
                    <h4 className={`font-bold text-sm uppercase tracking-tight ${estaActiva ? 'text-[#C16A28]' : 'text-[#2A3036]'}`}>
                      {cat.nombre}
                    </h4>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      estaActiva ? 'bg-[#C16A28] text-white' : 'bg-stone-200 text-[#2A3036]'
                    }`}>
                      {cantidad}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-snug font-normal line-clamp-2">
                    {cat.resumen}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className={`text-[10px] uppercase font-bold tracking-wider ${estaActiva ? 'text-[#C16A28]' : 'text-stone-400'}`}>
                    {estaActiva ? 'Área Seleccionada ●' : 'Explorar Área →'}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* 2. Panel Inferior (Submenú Izquierda + Visor de Obras Derecha) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-6 sm:p-8 rounded-xl border border-[#D7D2C8] shadow-sm">
        
        {/* Columna Izquierda (35%): Submenú interactivo idéntico al menú superior */}
        <div className="lg:col-span-4 space-y-3">
          <div className="mb-2">
            <span className="text-[11px] uppercase tracking-[0.2em] font-extrabold text-[#C16A28] block">
              Paso 2: Especialidades en {catActual.nombre}
            </span>
            <p className="text-xs text-stone-500 mt-1">
              Haz clic en la faena para cargar su registro fotográfico.
            </p>
          </div>

          <div className="space-y-2.5">
            {catActual.subcategorias.map((sub, idx) => {
              const estaActivo = subcategoriaIndex === idx

              return (
                <button
                  key={sub.id}
                  onClick={() => setSubcategoriaIndex(idx)}
                  className={`w-full text-left p-4 rounded-lg border transition-all cursor-pointer ${
                    estaActivo
                      ? 'border-[#C16A28] bg-[#F4F2EF] shadow-sm translate-x-1.5 ring-1 ring-[#C16A28]'
                      : 'border-[#D7D2C8] bg-white hover:border-stone-400 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className={`font-bold text-sm uppercase tracking-tight ${estaActivo ? 'text-[#C16A28]' : 'text-[#2A3036]'}`}>
                      {sub.titulo}
                    </h4>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      estaActivo ? 'bg-[#C16A28] text-white' : 'bg-stone-200 text-[#2A3036]'
                    }`}>
                      {sub.obras.length} {sub.obras.length === 1 ? 'obra' : 'obras'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1.5 font-normal">
                    {sub.faena}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Columna Derecha (65%): Visor y registro fotográfico */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-3 mb-4 border-b border-[#D7D2C8] gap-2">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C16A28] font-bold">
                  {catActual.nombre} · {subActual.faena}
                </span>
                <h3 className="font-black uppercase text-xl text-[#2A3036] tracking-tight mt-0.5">
                  {subActual.titulo}
                </h3>
              </div>
              <span className="text-xs font-bold text-stone-500">
                {subActual.obras.length} {subActual.obras.length === 1 ? 'faena en visor' : 'faenas en visor'}
              </span>
            </div>

            <p className="text-xs text-stone-600 mb-6 leading-relaxed bg-[#F4F2EF] p-3 rounded border border-stone-200">
              {subActual.detalles}
            </p>

            {/* Cuadrícula de fotos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {subActual.obras.map((obra, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-lg overflow-hidden border border-[#D7D2C8] shadow-sm flex flex-col justify-between group hover:border-[#C16A28] transition-all"
                >
                  <div className="h-44 relative overflow-hidden bg-[#191D21]">
                    <img 
                      src={obra.img} 
                      alt={obra.nombre} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute top-2.5 right-2.5 bg-[#191D21]/90 text-[#C16A28] border border-[#C16A28]/40 text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded">
                      {obra.tipo}
                    </span>
                  </div>

                  <div className="p-3.5">
                    <h5 className="font-bold text-xs uppercase text-[#2A3036] mb-1">
                      {obra.nombre}
                    </h5>
                    <a
                      href={`https://wa.me/56912345678?text=Hola%20ROKAMI,%20quisiera%20cotizar%20un%20proyecto%20similar%20a%20${encodeURIComponent(obra.nombre)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] uppercase font-bold text-[#C16A28] hover:text-[#964E19] inline-block mt-2"
                    >
                      Cotizar Faena →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer de cotización directa */}
          <div className="mt-8 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-stone-500 text-center sm:text-left">
              ¿Requieres cubicación o asesoría técnica sobre este tipo de obra?
            </span>
            <a
              href={`https://wa.me/56912345678?text=Hola%20ROKAMI,%20quisiera%20solicitar%20evaluación%20técnica%20para%20${encodeURIComponent(subActual.titulo)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C16A28] hover:bg-[#964E19] text-white px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap shadow-sm"
            >
              Consultar Especialista
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}