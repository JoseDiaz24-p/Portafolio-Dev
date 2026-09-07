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
  const [fotoActivaIndex, setFotoActivaIndex] = useState(0)
  const [lightboxAbierto, setLightboxAbierto] = useState(false)

  const catActual = catalogoCompleto[categoriaKey]
  const subActual = catActual.subcategorias[subcategoriaIndex] || catActual.subcategorias[0]
  const fotoActual = subActual.obras[fotoActivaIndex] || subActual.obras[0]

  const handleCambioCategoria = (key) => {
    setCategoriaKey(key)
    setSubcategoriaIndex(0)
    setFotoActivaIndex(0)
  }

  const handleCambioSubcategoria = (idx) => {
    setSubcategoriaIndex(idx)
    setFotoActivaIndex(0)
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
          Registro Técnico de Obras
        </h2>
        <div className="h-1 w-16 bg-[#C16A28] mx-auto mt-4"></div>
      </div>

      {/* Contenedor Principal: Barra de Navegación Lateral + Visor Panorámico */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-6 sm:p-8 rounded-xl border border-[#D7D2C8] shadow-sm">
        
        {/* PANEL IZQUIERDO (4 Cols): Menús y Submenús Estructurados */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Nivel 1: Menú de Áreas */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#C16A28] block mb-2.5">
              1. Área de Construcción
            </span>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(catalogoCompleto).map(([key, cat]) => {
                const activa = categoriaKey === key
                return (
                  <button
                    key={key}
                    onClick={() => handleCambioCategoria(key)}
                    className={`text-left px-3.5 py-2.5 rounded-md border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex justify-between items-center ${
                      activa
                        ? 'border-[#C16A28] bg-[#2A3036] text-white shadow-sm'
                        : 'border-[#D7D2C8] bg-[#F4F2EF] text-[#2A3036] hover:bg-stone-200'
                    }`}
                  >
                    <span>{cat.nombre}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded ${activa ? 'bg-[#C16A28] text-white' : 'bg-stone-300 text-[#2A3036]'}`}>
                      {totalObrasCategoria(cat)}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Nivel 2: Submenú de Especialidades */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-stone-500 block mb-2.5">
              2. Especialidades en {catActual.nombre}
            </span>
            <div className="space-y-2">
              {catActual.subcategorias.map((sub, idx) => {
                const activa = subcategoriaIndex === idx
                return (
                  <button
                    key={sub.id}
                    onClick={() => handleCambioSubcategoria(idx)}
                    className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                      activa
                        ? 'border-[#C16A28] bg-[#F4F2EF] shadow-sm ring-1 ring-[#C16A28] translate-x-1'
                        : 'border-[#D7D2C8] bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h4 className={`font-bold text-xs uppercase tracking-tight ${activa ? 'text-[#C16A28]' : 'text-[#2A3036]'}`}>
                        {sub.titulo}
                      </h4>
                      <span className="text-[10px] font-bold text-stone-400">
                        {sub.obras.length} {sub.obras.length === 1 ? 'foto' : 'fotos'}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 line-clamp-1">
                      {sub.faena}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Ficha Resumen de la Faena */}
          <div className="bg-[#F4F2EF] p-4 rounded-lg border border-[#D7D2C8] text-xs text-stone-600 leading-relaxed">
            <strong className="text-[#2A3036] uppercase font-bold block mb-1">Alcance Técnico:</strong>
            {subActual.detalles}
          </div>

        </div>

        {/* PANEL DERECHO (8 Cols): Visor Panorámico de Alta Visibilidad */}
        <div className="lg:col-span-8 flex flex-col justify-between lg:border-l lg:border-stone-200 lg:pl-8">
          <div>
            
            {/* Cabecera del Visor */}
            <div className="flex justify-between items-end pb-3 mb-4 border-b border-[#D7D2C8]">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C16A28] font-bold">
                  {catActual.nombre} · {subActual.titulo}
                </span>
                <h3 className="font-black uppercase text-xl text-[#2A3036] tracking-tight mt-0.5">
                  {fotoActual.nombre}
                </h3>
              </div>
              <span className="text-xs font-bold text-stone-400">
                Ángulo {fotoActivaIndex + 1} de {subActual.obras.length}
              </span>
            </div>

            {/* FOTO PRINCIPAL EN GRAN FORMATO */}
            <div 
              onClick={() => setLightboxAbierto(true)}
              className="relative w-full h-[360px] sm:h-[440px] rounded-xl overflow-hidden bg-[#191D21] border border-[#D7D2C8] shadow-md group cursor-pointer"
            >
              <img 
                src={fotoActual.img} 
                alt={fotoActual.nombre} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6">
                <div>
                  <span className="bg-[#C16A28] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded tracking-wider shadow-sm">
                    {fotoActual.tipo}
                  </span>
                  <p className="text-white text-xs font-semibold mt-2 tracking-wide">
                    {subActual.faena}
                  </p>
                </div>

                <span className="text-[11px] uppercase tracking-wider font-bold bg-white/20 backdrop-blur text-white px-3 py-1.5 rounded border border-white/30 group-hover:bg-white group-hover:text-[#191D21] transition-colors">
                Pantalla Completa
                </span>
              </div>
            </div>

            {/* CARRUSEL DE MINIATURAS (Selección de ángulos) */}
            <div className="mt-4">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block mb-2">
                Tomas y Vistas Registradas en Faena:
              </span>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {subActual.obras.map((obra, idx) => {
                  const activa = fotoActivaIndex === idx
                  return (
                    <button
                      key={idx}
                      onClick={() => setFotoActivaIndex(idx)}
                      className={`relative flex-shrink-0 w-24 sm:w-28 h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        activa
                          ? 'border-[#C16A28] ring-2 ring-[#C16A28]/40 scale-105 shadow-md'
                          : 'border-[#D7D2C8] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={obra.img} alt={obra.nombre} className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[8px] px-1.5 py-0.5 rounded font-black">
                        #{idx + 1}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

          </div>

          {/* CTA Técnico */}
          <div className="mt-8 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-stone-500 text-center sm:text-left">
              ¿Deseas evaluar requerimientos estructurales para <strong>{subActual.titulo}</strong>?
            </span>
            <a
              href={`https://wa.me/56912345678?text=Hola%20ROKAMI,%20quisiera%20solicitar%20asesoría%20sobre%20la%20faena%20de%20${encodeURIComponent(fotoActual.nombre)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C16A28] hover:bg-[#964E19] text-white px-6 py-3 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-sm whitespace-nowrap"
            >
              Cotizar Esta Obra por WhatsApp →
            </a>
          </div>
        </div>

      </div>

      {/* MODAL LIGHTBOX: Zoom de Alta Definición */}
      {lightboxAbierto && (
        <div 
          onClick={() => setLightboxAbierto(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            <button 
              onClick={() => setLightboxAbierto(false)}
              className="absolute -top-10 right-0 text-white text-3xl font-bold hover:text-[#C16A28] transition-colors"
            >
              ✕
            </button>
            <img 
              src={fotoActual.img} 
              alt={fotoActual.nombre} 
              className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl border border-white/20" 
            />
            <p className="text-white text-xs uppercase tracking-widest mt-4 font-bold text-center">
              {fotoActual.nombre} · <span className="text-[#C16A28]">{fotoActual.tipo}</span>
            </p>
          </div>
        </div>
      )}

    </section>
  )
}