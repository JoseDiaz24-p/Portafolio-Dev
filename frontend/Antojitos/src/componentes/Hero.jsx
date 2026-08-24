export default function Hero() {
  return (
    <section className="bg-[#FAF9F5] px-4 py-16 text-center">
      <div className="max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-[0.2em] text-stone-500 font-medium">
          — Boutique Patisserie & Café —
        </span>
        
        <h1 className="mt-6 text-4xl sm:text-6xl font-serif text-stone-900 leading-tight">
          Artisanal pastries crafted with modern elegance
        </h1>
        
        <p className="mt-4 text-stone-600 text-sm sm:text-base font-light">
          Celebramos El arte de la repostería tradicional, que combina ingredientes de temporada con un diseño pastelero exquisito.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-stone-900 text-white px-6 py-3 text-xs tracking-widest font-medium rounded-md hover:bg-stone-800 transition-colors">
            EXPLORE OUR MENU
          </button>
          <button className="border border-stone-400 text-stone-900 px-6 py-3 text-xs tracking-widest font-medium rounded-md hover:bg-stone-100 transition-colors">
            VISIT ATELIER
          </button>
        </div>
      </div>
    </section>
  )
}