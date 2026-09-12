import { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, MapPin, Search, LogOut, ShieldCheck, UserCheck, Lock, User } from 'lucide-react';
import './App.css';

const API_BASE_URL = `http://${window.location.hostname}:8000/api`;

function App() {
  // Estado de Autenticación
  const [currentUser, setCurrentUser] = useState(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Estados del Dashboard de Trazabilidad
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [filterText, setFilterText] = useState('');

  // Estados de Modales (Solo para Operador/Admin)
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [showCheckpointModal, setShowCheckpointModal] = useState(false);

  // Formulario nuevo lote
  const [newBatchId, setNewBatchId] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const [newFarm, setNewFarm] = useState('');
  const [newHarvestDate, setNewHarvestDate] = useState('');

  // Formulario nuevo checkpoint
  const [cpStage, setCpStage] = useState('');
  const [cpLocation, setCpLocation] = useState('');
  const [cpOperator, setCpOperator] = useState('');
  const [cpNotes, setCpNotes] = useState('');

  // 1. Verificar si hay sesión activa guardada
  useEffect(() => {
    const savedUser = localStorage.getItem('cacau_session');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setCurrentUser(parsed);
      loadBatches(parsed.token);
    }
  }, []);

  // 2. Cargar Lotes desde Django (MySQL)
  const loadBatches = async (token) => {
    try {
      setDataLoading(true);
      setErrorMessage(null);
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get(`${API_BASE_URL}/batches/`, { headers });
      setBatches(response.data);
      if (response.data.length > 0) {
        setSelectedBatch(response.data[0]);
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
      setErrorMessage('Error al conectar con la base de datos MySQL en Django.');
    } finally {
      setDataLoading(false);
    }
  };

  // 3. Manejo de Inicio de Sesión
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login/`, {
        username: usernameInput,
        password: passwordInput,
      });

      const sessionData = {
        token: response.data.access,
        username: response.data.username,
        role: response.data.role || (response.data.is_staff ? 'admin' : 'auditor'),
      };

      setCurrentUser(sessionData);
      localStorage.setItem('cacau_session', JSON.stringify(sessionData));
      setUsernameInput('');
      setPasswordInput('');
      loadBatches(sessionData.token);
    } catch (error) {
      setAuthError('Credenciales inválidas. Verifica tu usuario y contraseña.');
    } finally {
      setAuthLoading(false);
    }
  };

  // 4. Cerrar Sesión
  const handleLogout = () => {
    setCurrentUser(null);
    setBatches([]);
    setSelectedBatch(null);
    localStorage.removeItem('cacau_session');
  };

  // 5. Crear Lote (Solo Admin/Operador)
  const handleCreateBatch = async (e) => {
    e.preventDefault();
    if (!newBatchId || !newProduct || !newFarm) return;

    try {
      const payload = {
        id: newBatchId,
        product: newProduct,
        origin_farm: newFarm,
        harvest_date: newHarvestDate || new Date().toISOString().split('T')[0],
        destination: 'Centro de Distribución Logístico',
        current_status: 'En proceso',
        temperature_avg: '20.00',
        humidity_avg: '60.00',
        quality_cert: 'Certificación UTZ / ISO 22000',
      };

      const headers = { Authorization: `Bearer ${currentUser.token}` };
      const response = await axios.post(`${API_BASE_URL}/batches/`, payload, { headers });

      setBatches([response.data, ...batches]);
      setSelectedBatch(response.data);
      setShowBatchModal(false);
      setNewBatchId('');
      setNewProduct('');
      setNewFarm('');
      setNewHarvestDate('');
    } catch (error) {
      alert('Error al registrar el lote. Revisa que el código no exista previamente.');
    }
  };

  // 6. Agregar Checkpoint (Solo Admin/Operador)
  const handleAddCheckpoint = async (e) => {
    e.preventDefault();
    if (!cpStage || !cpLocation || !selectedBatch) return;

    try {
      const payload = {
        stage: cpStage,
        date: new Date().toISOString().split('T')[0],
        location: cpLocation,
        operator: cpOperator || currentUser.username,
        status: 'Completado',
        notes: cpNotes || 'Sin observaciones.',
      };

      const headers = { Authorization: `Bearer ${currentUser.token}` };
      const response = await axios.post(
        `${API_BASE_URL}/batches/${selectedBatch.id}/checkpoints/`,
        payload,
        { headers }
      );

      const updatedBatch = response.data;
      setBatches(batches.map((b) => (b.id === updatedBatch.id ? updatedBatch : b)));
      setSelectedBatch(updatedBatch);
      setShowCheckpointModal(false);
      setCpStage('');
      setCpLocation('');
      setCpOperator('');
      setCpNotes('');
    } catch (error) {
      alert('Error al registrar el checkpoint en el servidor.');
    }
  };

  // 7. Filtro de lotes
  const filteredBatches = batches.filter(
    (b) =>
      b.id.toLowerCase().includes(filterText.toLowerCase()) ||
      b.product.toLowerCase().includes(filterText.toLowerCase()) ||
      b.origin_farm.toLowerCase().includes(filterText.toLowerCase())
  );

  // ==========================================
  // PANTALLA 1: LOGIN (SI NO HAY SESIÓN)
  // ==========================================
  if (!currentUser) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'radial-gradient(circle at top, #1e293b, #0f172a)',
        padding: '1rem',
      }}>
        <div style={{
          background: 'rgba(30, 41, 59, 0.85)',
          backdropFilter: 'blur(12px)',
          border: '1px solid #334155',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '420px',
          padding: '2.5rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
          boxSizing: 'border-box',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              display: 'inline-flex',
              padding: '12px',
              borderRadius: '50%',
              background: 'rgba(56, 189, 248, 0.1)',
              color: '#38bdf8',
              marginBottom: '1rem',
            }}>
              <ShieldCheck size={40} />
            </div>
            <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700, color: '#f8fafc' }}>
              Cacau Prime Trace
            </h2>
            <p style={{ margin: '0.5rem 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>
              Sistema de Cadena de Custodia y Trazabilidad
            </p>
          </div>

          {authError && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #ef4444',
              color: '#fca5a5',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              fontSize: '0.85rem',
              textAlign: 'center',
            }}>
              ⚠️ {authError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
                Usuario
              </label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#64748b' }} />
                <input
                  type="text"
                  placeholder="ej. admin o auditor"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
                Contraseña
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#64748b' }} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                    background: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              style={{
                marginTop: '0.5rem',
                padding: '0.8rem',
                background: '#0284c7',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: authLoading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
              }}
            >
              {authLoading ? 'Autenticando .....' : 'Ingresar al Sistema'}
            </button>
          </form>

          <div style={{ marginTop: '1.75rem', textAlign: 'center', borderTop: '1px solid #334155', paddingTop: '1.25rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Control de Acceso Relacional con JWT • MySQL Backend
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // PANTALLA 2: DASHBOARD (AUTENTICADO)
  // ==========================================
  return (
    <div className="layout">
      {/* Topbar con información del Usuario y su Rol */}
      <header className="topbar">
        <div>
          <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Cacau Prime Trace</h1>
          <p style={{ margin: '0.3rem 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Panel de Control de Trazabilidad y Cadena de Suministro
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            padding: '0.4rem 0.8rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <UserCheck size={16} color="var(--accent)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{currentUser.username}</span>
            <span className={`badge ${currentUser.role === 'admin' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.7rem' }}>
              {currentUser.role === 'admin' ? 'Operador / Admin' : 'Auditor (Solo Lectura)'}
            </span>
          </div>

          {/* PERMISO ADMIN: Solo el Admin ve el botón de crear lote */}
          {currentUser.role === 'admin' && (
            <button className="btn-primary" onClick={() => setShowBatchModal(true)}>
              <PlusCircle size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
              Nuevo Lote
            </button>
          )}

          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              padding: '0.5rem 0.8rem',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.85rem'
            }}
          >
            <LogOut size={14} />
            Salir
          </button>
        </div>
      </header>

      {errorMessage && (
        <div style={{ background: '#ef4444', color: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center' }}>
          ⚠️ {errorMessage}
        </div>
      )}

      {/* Indicadores clave */}
      {selectedBatch && (
        <section className="stats-grid">
          <div className="stat-card">
            <h4>Lotes Registrados</h4>
            <p>{batches.length}</p>
          </div>
          <div className="stat-card">
            <h4>Lote Seleccionado</h4>
            <p style={{ fontSize: '1.2rem', color: 'var(--accent-blue)' }}>{selectedBatch.id}</p>
          </div>
          <div className="stat-card">
            <h4>Certificación</h4>
            <p style={{ fontSize: '1rem', color: 'var(--accent)' }}>{selectedBatch.quality_cert}</p>
          </div>
          <div className="stat-card">
            <h4>Condición Media</h4>
            <p style={{ fontSize: '1.1rem' }}>
              {selectedBatch.temperature_avg}°C | {selectedBatch.humidity_avg}% Hum.
            </p>
          </div>
        </section>
      )}

      {/* Contenido principal */}
      <div className="main-content">
        {/* Columna Izquierda: Buscador y Lista de Lotes */}
        <aside className="batch-list">
          <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
            <Search
              size={16}
              style={{ position: 'absolute', top: '10px', left: '10px', color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              placeholder="Buscar lote, producto o planta..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.5rem 0.5rem 2rem',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                color: 'white',
                borderRadius: '8px',
                boxSizing: 'border-box',
                fontSize: '0.85rem',
              }}
            />
          </div>

          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Lotes ({filteredBatches.length})</h3>
          
          {dataLoading ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>Cargando datos...</p>
          ) : (
            <div style={{ maxHeight: '600px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {filteredBatches.map((batch) => (
                <div
                  key={batch.id}
                  className={`batch-item ${selectedBatch?.id === batch.id ? 'active' : ''}`}
                  onClick={() => setSelectedBatch(batch)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontWeight: 'bold' }}>{batch.id}</span>
                    <span
                      className={`badge ${batch.current_status === 'Completado' ? 'badge-success' : 'badge-warning'}`}
                    >
                      {batch.current_status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{batch.product}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>
                    Origen: {batch.origin_farm}
                  </div>
                </div>
              ))}
              {filteredBatches.length === 0 && (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>
                  No se encontraron coincidencias.
                </p>
              )}
            </div>
          )}
        </aside>

        {/* Columna Derecha: Detalle y Checkpoints */}
        {selectedBatch ? (
          <main className="detail-view">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ margin: '0 0 0.5rem 0' }}>{selectedBatch.product}</h2>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <strong>Destino programado:</strong> {selectedBatch.destination}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-success">Sello Auditado</span>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                  Fecha de Producción: {selectedBatch.harvest_date}
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '2rem',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '0.5rem',
              }}
            >
              <h3 style={{ margin: 0 }}>Cadena de Custodia y Checkpoints</h3>
              
              {/* PERMISO ADMIN: Solo el Admin ve el botón de registrar checkpoint */}
              {currentUser.role === 'admin' && (
                <button
                  className="btn-primary"
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                  onClick={() => setShowCheckpointModal(true)}
                >
                  <MapPin size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                  Registrar Checkpoint
                </button>
              )}
            </div>

            <div className="timeline">
              {selectedBatch.checkpoints && selectedBatch.checkpoints.length > 0 ? (
                selectedBatch.checkpoints.map((cp) => (
                  <div key={cp.id} className="timeline-step">
                    <div className="timeline-dot" />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h4 style={{ margin: '0 0 0.3rem 0', fontSize: '1rem', color: 'var(--accent-blue)' }}>
                        {cp.stage}
                      </h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cp.date}</span>
                    </div>
                    <p style={{ margin: '0 0 0.4rem 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      📍 {cp.location} • 👤 {cp.operator}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.4' }}>{cp.notes}</p>
                  </div>
                ))
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  No hay checkpoints registrados para este lote todavía.
                </p>
              )}
            </div>
          </main>
        ) : (
          <main className="detail-view">
            <p style={{ color: 'var(--text-muted)' }}>Selecciona un lote para auditar su trazabilidad.</p>
          </main>
        )}
      </div>

      {/* Modal Nuevo Lote (Solo Admin) */}
      {showBatchModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <form
            onSubmit={handleCreateBatch}
            style={{
              background: 'var(--bg-surface)',
              padding: '2rem',
              borderRadius: '12px',
              width: '400px',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <h3 style={{ margin: 0 }}>Registrar Nuevo Lote (MySQL)</h3>
            <input
              style={{
                width: '100%',
                padding: '0.5rem',
                background: 'var(--bg-main)',
                border: '1px solid var(--border)',
                color: 'white',
                borderRadius: '6px',
                boxSizing: 'border-box',
              }}
              placeholder="Código de Lote (ej. CP-BATCH-99999)"
              value={newBatchId}
              onChange={(e) => setNewBatchId(e.target.value)}
              required
            />
            <input
              style={{
                width: '100%',
                padding: '0.5rem',
                background: 'var(--bg-main)',
                border: '1px solid var(--border)',
                color: 'white',
                borderRadius: '6px',
                boxSizing: 'border-box',
              }}
              placeholder="Producto (ej. Chocolate Amargo 70%)"
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
              required
            />
            <input
              style={{
                width: '100%',
                padding: '0.5rem',
                background: 'var(--bg-main)',
                border: '1px solid var(--border)',
                color: 'white',
                borderRadius: '6px',
                boxSizing: 'border-box',
              }}
              placeholder="Planta de Origen (ej. Planta São Paulo)"
              value={newFarm}
              onChange={(e) => setNewFarm(e.target.value)}
              required
            />
            <input
              type="date"
              style={{
                width: '100%',
                padding: '0.5rem',
                background: 'var(--bg-main)',
                border: '1px solid var(--border)',
                color: 'white',
                borderRadius: '6px',
                boxSizing: 'border-box',
              }}
              value={newHarvestDate}
              onChange={(e) => setNewHarvestDate(e.target.value)}
              required
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setShowBatchModal(false)}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                Guardar en MySQL
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal Registrar Checkpoint (Solo Admin) */}
      {showCheckpointModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <form
            onSubmit={handleAddCheckpoint}
            style={{
              background: 'var(--bg-surface)',
              padding: '2rem',
              borderRadius: '12px',
              width: '420px',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <h3 style={{ margin: 0 }}>Nuevo Checkpoint ({selectedBatch.id})</h3>
            <input
              style={{
                width: '100%',
                padding: '0.5rem',
                background: 'var(--bg-main)',
                border: '1px solid var(--border)',
                color: 'white',
                borderRadius: '6px',
                boxSizing: 'border-box',
              }}
              placeholder="Etapa (ej. Control de Temperatura en Tránsito)"
              value={cpStage}
              onChange={(e) => setCpStage(e.target.value)}
              required
            />
            <input
              style={{
                width: '100%',
                padding: '0.5rem',
                background: 'var(--bg-main)',
                border: '1px solid var(--border)',
                color: 'white',
                borderRadius: '6px',
                boxSizing: 'border-box',
              }}
              placeholder="Ubicación (ej. Centro Logístico Curitiba)"
              value={cpLocation}
              onChange={(e) => setCpLocation(e.target.value)}
              required
            />
            <input
              style={{
                width: '100%',
                padding: '0.5rem',
                background: 'var(--bg-main)',
                border: '1px solid var(--border)',
                color: 'white',
                borderRadius: '6px',
                boxSizing: 'border-box',
              }}
              placeholder="Operador responsable"
              value={cpOperator}
              onChange={(e) => setCpOperator(e.target.value)}
            />
            <textarea
              style={{
                width: '100%',
                padding: '0.5rem',
                background: 'var(--bg-main)',
                border: '1px solid var(--border)',
                color: 'white',
                borderRadius: '6px',
                boxSizing: 'border-box',
                resize: 'none',
                height: '70px',
              }}
              placeholder="Observaciones de trazabilidad..."
              value={cpNotes}
              onChange={(e) => setCpNotes(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setShowCheckpointModal(false)}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                Registrar en MySQL
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;