import React, { useEffect, useState } from "react";

export const ListadoPersonajes = () => {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);
  const [info, setInfo] = useState({});

  const obtenerPersonajes = async (pageUrl) => {
    setCargando(true);
    try {
      const res = await fetch(pageUrl || `https://rickandmortyapi.com/api/character/?page=${pagina}`);
      const data = await res.json();
      setPersonajes(data.results || []);
      setInfo(data.info || {});
    } catch (error) {
      console.error("Error al consultar la API:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerPersonajes();
  }, [pagina]);

  // Filtro en memoria por nombre
  const personajesFiltrados = personajes.filter((p) =>
    p.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="fw-bold">Explorador de Personajes</h1>
        <p className="text-muted">Consumo de API REST pública con React y Vite</p>
      </div>

      {/* Barra de Búsqueda */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control form-control-lg shadow-sm"
            placeholder="Buscar por nombre (ej: Morty)..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      {/* Estado de Carga */}
      {cargando ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Cargando catálogo...</p>
        </div>
      ) : (
        <>
          {/* Grid de Tarjetas */}
          <div className="row g-4">
            {personajesFiltrados.map((item) => (
              <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                  <img src={item.image} className="card-img-top" alt={item.name} />
                  <div className="card-body">
                    <h5 className="card-title fw-bold text-truncate">{item.name}</h5>
                    <p className="card-text mb-1">
                      <span
                        className={`badge ${
                          item.status === "Alive"
                            ? "bg-success"
                            : item.status === "Dead"
                            ? "bg-danger"
                            : "bg-secondary"
                        } me-1`}
                      >
                        {item.status}
                      </span>
                      <small className="text-muted">{item.species}</small>
                    </p>
                    <p className="card-text small text-muted mb-0">
                      <strong>Origen:</strong> {item.origin.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controles de Paginación */}
          <div className="d-flex justify-content-center gap-3 mt-5">
            <button
              className="btn btn-outline-dark px-4"
              disabled={!info.prev || cargando}
              onClick={() => setPagina((prev) => Math.max(prev - 1, 1))}
            >
              ← Anterior
            </button>
            <span className="align-self-center fw-semibold text-muted">
              Página {pagina}
            </span>
            <button
              className="btn btn-outline-dark px-4"
              disabled={!info.next || cargando}
              onClick={() => setPagina((prev) => prev + 1)}
            >
              Siguiente →
            </button>
          </div>
        </>
      )}
    </div>
  );
};