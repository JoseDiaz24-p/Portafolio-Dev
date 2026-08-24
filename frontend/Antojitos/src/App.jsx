import Header from './componentes/Header'
import MenuSection from './componentes/MenuSection'
import AboutStory from './componentes/AboutStory'
import Footer from './componentes/Footer'

/* Importación  */
import croissants from './assets/Croissants_hojaldrados.jpg'
import pastel from './assets/Pastel_de_Chocolate.jpg'
import tartaletas from './assets/Tartaletas.jpg'



export default function App() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-800 flex flex-col justify-between">
      <div>
        <Header />

        <main>
          {/* Hero */}
          <section className="px-4 py-16 text-center">
            <div className="max-w-3xl mx-auto">
              <span className="text-xs uppercase tracking-[0.2em] text-stone-500 font-medium">
                — Boutique de Pastelería Fina —
              </span>
              
              <h1 className="mt-6 text-4xl sm:text-6xl font-serif text-stone-900 leading-tight">
                Repostería artesanal creada con delicadeza y pasión
              </h1>
              
              <p className="mt-4 text-stone-600 text-sm sm:text-base font-light">
                Celebramos la tradición de la pastelería lenta, horneando diariamente con ingredientes seleccionados y recetas familiares.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="#menu" 
                  className="bg-stone-900 !text-white px-6 py-3 text-xs tracking-widest font-medium rounded-md hover:bg-stone-800 transition-colors uppercase"
                >
                  Ver Carta y Precios
                </a>
                <a 
                  href="#historia" 
                  className="border border-stone-400 text-stone-900 px-6 py-3 text-xs tracking-widest font-medium rounded-md hover:bg-stone-100 transition-colors uppercase"
                >
                  Conocer la Historia
                </a>
              </div>
            </div>
          </section>

          {/* Galería de 3 Fotos */}
          <section className="px-4 pb-16 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="overflow-hidden rounded-3xl shadow-sm bg-stone-200 aspect-[4/5]">
                <img 
                  src={croissants} 
                  alt="Croissants hojaldrados" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="overflow-hidden rounded-3xl shadow-sm bg-stone-200 aspect-[4/5]">
                <img 
                  src={tartaletas} 
                  alt="Tartaletas " 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="overflow-hidden rounded-3xl shadow-sm bg-stone-200 aspect-[4/5]">
                <img 
                  src={pastel} 
                  alt="Pastel de frambuesa" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                />
              </div>
            </div>
          </section>

          {/* Menú y Categorías */}
          <MenuSection />

          {/* Historia */}
          <AboutStory />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}