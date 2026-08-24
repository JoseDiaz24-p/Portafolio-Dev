


export default function Gallery() {
  return (
    <section className="bg-[#FAF9F5] px-4 pb-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Imagen 1 */}
        <div className="overflow-hidden rounded-3xl shadow-sm bg-stone-200 aspect-[4/5]">
          <img src="/assets/Alfajores.jpg" alt="Croissants" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </div>

        {/* Imagen 2 */}
        <div className="overflow-hidden rounded-3xl shadow-sm bg-stone-200 aspect-[4/5]">
          <img src="/assets/tarts.jpg" alt="Tarts" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </div>

        {/* Imagen 3 */}
        <div className="overflow-hidden rounded-3xl shadow-sm bg-stone-200 aspect-[4/5]">
          <img src="/assets/coffee.jpg" alt="Coffee" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        </div>

      </div>
    </section>
  )
}