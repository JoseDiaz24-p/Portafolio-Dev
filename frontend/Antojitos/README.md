# 🥐 Antojitos — Pastelería & Repostería Artesanal

Landing page y catálogo interactivo responsive para **Antojitos**, una pastelería boutique especializada en repostería fina, bollería con fermentación lenta, tortas de autor y bocaditos artesanales.

---

## 🌟 Características Principales

* **Navegación Interactiva con Tarjetas 3D:** Barra superior con desplegables (*Contacto* y *Ubicación*) que giran 180° (`preserve-3d`) para revelar accesos directos.
* **Catálogo Filtrable por Categorías:** Explorador dinámico (*Todos*, *Tortas & Pasteles*, *Bollería & Hojaldres*, *Bocaditos*) gestionado con hooks de React (`useState`).
* **100% Responsivo:** Adaptado con diseño fluido para dispositivos móviles, tablets y computadoras de escritorio.
* **Integración Directa a Canales de Venta:** Enlace directo con mensaje preconfigurado a WhatsApp y redirección al perfil oficial de Instagram.
* **Storytelling Editorial:** Sección de taller e historia orientada a destacar los procesos artesanales y materias primas.

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React
* **Estilos:** Tailwind CSS
* **Build Tool:** Vite

---

## 📁 Estructura del Proyecto

```text
antojitos/
├── src/
│   ├── assets/               # Imágenes locales de productos, taller y logo
│   ├── componentes/          # Componentes modulares
│   │   ├── Header.jsx        # Navbar responsive con tarjetas 3D
│   │   ├── MenuSection.jsx   # Catálogo con filtros interactivos
│   │   ├── AboutStory.jsx    # Sección editorial de historia y taller
│   │   └── Footer.jsx        # Horarios, ubicación y enlaces oficiales
│   ├── App.jsx               # Vista principal integrada
│   ├── main.jsx              # Punto de entrada de la aplicación
│   └── index.css             # Directivas de Tailwind CSS
├── index.html
├── package.json
└── vite.config.js