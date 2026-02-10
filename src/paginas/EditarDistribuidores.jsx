import { useState, useEffect } from 'react';
// Header and footer removed for CMS editing pages

const EditarDistribuidores = () => {
  const defaultContent = {
    hero: {
      badge: 'ÚNETE A NOSOTROS',
      titulo: '¿Quieres ser distribuidor?',
      subtitulo: 'Únete a nuestra red de distribuidores y forma parte de la familia Caborca',
      imagen: 'https://blocks.astratic.com/img/general-img-landscape.png'
    },
    counters: {
      distribuidores: '+500',
      estados: '20+'
    },
    formulario: {
      submitLabel: 'ENVIAR SOLICITUD',
      responseMessage: '¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.'
    },
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120615.72236587609!2d-99.2840989!3d19.432608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce0026db097507%3A0x54061076265ee841!2sCiudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses!2smx!4v1234567890123!5m2!1ses!2smx'
  };

  const [content, setContent] = useState(defaultContent);
  const [formulario, setFormulario] = useState({
    nombreCompleto: '',
    correoElectronico: '',
    telefono: '',
    ciudad: '',
    mensaje: ''
  });

  const [tipoCompra, setTipoCompra] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [activeEdit, setActiveEdit] = useState(null);
  const [form, setForm] = useState({ badge: '', titulo: '', subtitulo: '', imagen: null, submitLabel: '', responseMessage: '', mapSrc: '' });

  // decorative hero: no button behavior required

  const manejarCambioFormulario = (evento) => {
    const { name, value } = evento.target;
    setFormulario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const manejarEnvioFormulario = (evento) => {
    evento.preventDefault();
    console.log('Formulario enviado:', formulario);
    alert('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.');
  };

  useEffect(() => {
    // Persistence disabled: do not load from localStorage
  }, []);

  useEffect(() => {
    const handler = (e) => {
      const detail = e.detail || {};
      const section = detail.section || detail.sectionId || detail.id || detail.sectionName;
      console.log('[cms] edit event received for section:', section, 'raw detail:', detail);
      if (section) openEditor(section);
    };
    window.addEventListener('cms:edit-section', handler);
    try {
      const qp = new URLSearchParams(window.location.search);
      const edit = qp.get('edit');
      if (edit) openEditor(edit);
    } catch (e) {}
    return () => window.removeEventListener('cms:edit-section', handler);
  }, [content]);

  const openEditor = (section) => {
    if (section === 'hero') {
      setForm({
        badge: content.hero.badge || '',
        titulo: content.hero.titulo || '',
        subtitulo: content.hero.subtitulo || '',
        imagen: content.hero.imagen || null,
        submitLabel: '', responseMessage: '', mapSrc: ''
      });
    } else if (section === 'formulario') {
      setForm({
        badge: '', titulo: '', subtitulo: '', imagen: null,
        submitLabel: content.formulario?.submitLabel || 'ENVIAR SOLICITUD',
        responseMessage: content.formulario?.responseMessage || '¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.',
        mapSrc: ''
      });
    } else if (section === 'mapa') {
      setForm({ badge: '', titulo: '', subtitulo: '', imagen: null, submitLabel: '', responseMessage: '', mapSrc: content.mapSrc || '' });
    }
    setActiveEdit(section);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      alert('El archivo excede 1 MB. Elige una imagen más pequeña');
      return;
    }
    const reader = new FileReader();
    const name = e.target.name || 'imagen';
    reader.onload = () => setForm(prev => ({ ...prev, [name]: reader.result }));
    reader.readAsDataURL(file);
  };

  const saveChanges = () => {
    if (!activeEdit) return;
    if (activeEdit === 'hero') {
      setContent(prev => ({ ...prev, hero: { ...prev.hero, badge: form.badge || prev.hero.badge, titulo: form.titulo || prev.hero.titulo, subtitulo: form.subtitulo || prev.hero.subtitulo, imagen: form.imagen || prev.hero.imagen } }));
    } else if (activeEdit === 'formulario') {
      setContent(prev => ({ ...prev, formulario: { ...prev.formulario, submitLabel: form.submitLabel || prev.formulario?.submitLabel, responseMessage: form.responseMessage || prev.formulario?.responseMessage } }));
    } else if (activeEdit === 'mapa') {
      setContent(prev => ({ ...prev, mapSrc: form.mapSrc || prev.mapSrc }));
    }
    alert('✅ Cambios aplicados (no se persisten en localStorage)');
    setActiveEdit(null);
  };

  const guardarCambios = () => {
    // Persistence disabled: do not save to localStorage
    alert('✅ Cambios aplicados (no se persisten en localStorage)');
  };

  const manejarLimpiarFiltros = () => {
    setTipoCompra('');
    setEstadoFiltro('');
  };

  const manejarAplicarFiltros = () => {
    console.log('Filtros aplicados:', { tipoCompra, estadoFiltro });
  };

  const manejarUbicarme = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (posicion) => {
          console.log('Ubicación:', posicion.coords);
          alert('Ubicación obtenida correctamente');
        },
        (error) => {
          console.error('Error al obtener ubicación:', error);
          alert('No se pudo obtener tu ubicación');
        }
      );
    } else {
      alert('Tu navegador no soporta geolocalización');
    }
  };

  return (
    <div className="bg-white text-caborca-cafe font-sans">
      {/* Top editor bar - fixed, does not cover sidebar (left margin applied) */}
      <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-white shadow-sm">
        <div className="h-full flex items-center justify-between">
          <div className="flex items-center ml-4 md:ml-64 gap-6">
            <h2 className="text-xl font-semibold text-caborca-cafe">Editor Visual - Configuración</h2>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-caborca-cafe text-white rounded-md text-sm">mx ES</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">us EN</span>
            </div>
          </div>
          <div className="mr-4 md:mr-8">
            <button onClick={guardarCambios} className="flex items-center gap-3 bg-caborca-cafe text-white px-4 py-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 2a1 1 0 00-1 1v2H4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-2V3a1 1 0 00-1-1H7z" />
                <path d="M7 8a1 1 0 012 0v2a1 1 0 11-2 0V8z" />
              </svg>
              Guardar Cambios
            </button>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* HERO IMAGE SECTION */}
        <section data-cms-section="hero" className="relative pt-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={content.hero.imagen}
                  alt="Distribuidores Caborca Boots"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                  <div className="text-center text-white px-6 flex flex-col items-center justify-center h-full">
                    <div className="mx-auto mb-6 w-48 h-48 flex items-center justify-center pointer-events-none">
                      <svg viewBox="0 0 200 200" className="w-full h-full opacity-18">
                        <rect x="14" y="14" width="172" height="172" rx="28" ry="28" fill="none" stroke="#ffffff" strokeWidth="12" opacity="0.12" />
                        <path d="M55 120 C80 90, 100 90, 115 110 C130 130, 155 105, 155 105" fill="none" stroke="#ffffff" strokeWidth="10" opacity="0.08"/>
                      </svg>
                    </div>
                    <div className="inline-block bg-caborca-beige-suave text-caborca-cafe px-6 py-2 rounded-full mb-6 text-sm font-medium tracking-widest uppercase">
                      {content.hero.badge}
                    </div>
                    <h1 className="text-[32px] md:text-[48px] lg:text-[64px] font-playfair leading-tight mb-4 max-w-3xl mx-auto">
                      {content.hero.titulo}
                    </h1>
                    <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
                      {content.hero.subtitulo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* EDIT MODAL */}
        {activeEdit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-caborca-cafe">Editar sección: {activeEdit}</h3>
                <button onClick={() => setActiveEdit(null)} className="text-gray-500 hover:text-gray-700">Cerrar</button>
              </div>

              {activeEdit === 'hero' && (
                <div className="space-y-4">
                  <label className="block">
                    <div className="text-sm font-medium text-caborca-cafe mb-1">Badge</div>
                    <input name="badge" value={form.badge} onChange={handleInput} className="w-full border px-3 py-2 rounded" />
                  </label>
                  <label className="block">
                    <div className="text-sm font-medium text-caborca-cafe mb-1">Título</div>
                    <input name="titulo" value={form.titulo} onChange={handleInput} className="w-full border px-3 py-2 rounded" />
                  </label>
                  <label className="block">
                    <div className="text-sm font-medium text-caborca-cafe mb-1">Subtítulo</div>
                    <input name="subtitulo" value={form.subtitulo} onChange={handleInput} className="w-full border px-3 py-2 rounded" />
                  </label>
                  <label className="block">
                    <div className="text-sm font-medium text-caborca-cafe mb-1">Imagen (max 1 MB)</div>
                    <input type="file" name="imagen" accept="image/*" onChange={handleImage} />
                    {form.imagen && <img src={form.imagen} alt="preview" className="mt-3 w-48 h-32 object-cover rounded" />}
                  </label>
                </div>
              )}

              {activeEdit === 'formulario' && (
                <div className="space-y-4">
                  <label className="block">
                    <div className="text-sm font-medium text-caborca-cafe mb-1">Texto del botón</div>
                    <input name="submitLabel" value={form.submitLabel} onChange={handleInput} className="w-full border px-3 py-2 rounded" />
                  </label>
                  <label className="block">
                    <div className="text-sm font-medium text-caborca-cafe mb-1">Mensaje de respuesta</div>
                    <textarea name="responseMessage" value={form.responseMessage} onChange={handleInput} className="w-full border px-3 py-2 rounded" rows="3" />
                  </label>
                </div>
              )}

              {activeEdit === 'mapa' && (
                <div className="space-y-4">
                  <label className="block">
                    <div className="text-sm font-medium text-caborca-cafe mb-1">URL del iframe de mapa</div>
                    <input name="mapSrc" value={form.mapSrc} onChange={handleInput} className="w-full border px-3 py-2 rounded" />
                  </label>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setActiveEdit(null)} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
                <button onClick={saveChanges} className="px-4 py-2 bg-caborca-cafe text-white rounded">Guardar</button>
              </div>
            </div>
          </div>
        )}

        {/* FORMULARIO DISTRIBUIDOR */}
        <section data-cms-section="formulario" className="py-12 bg-caborca-beige-suave">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
                <form onSubmit={manejarEnvioFormulario} className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-caborca-cafe mb-2">
                        Nombre completo
                      </label>
                      <input 
                        type="text" 
                        name="nombreCompleto"
                        value={formulario.nombreCompleto}
                        onChange={manejarCambioFormulario}
                        placeholder="Ej: Juan Pérez" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-caborca-cafe focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-caborca-cafe mb-2">
                        Correo electrónico
                      </label>
                      <input 
                        type="email" 
                        name="correoElectronico"
                        value={formulario.correoElectronico}
                        onChange={manejarCambioFormulario}
                        placeholder="correo@ejemplo.com" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-caborca-cafe focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-caborca-cafe mb-2">
                        Teléfono
                      </label>
                      <input 
                        type="tel" 
                        name="telefono"
                        value={formulario.telefono}
                        onChange={manejarCambioFormulario}
                        placeholder="(123) 456-7890" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-caborca-cafe focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-caborca-cafe mb-2">
                        Ciudad
                      </label>
                      <input 
                        type="text" 
                        name="ciudad"
                        value={formulario.ciudad}
                        onChange={manejarCambioFormulario}
                        placeholder="Ej: Guadalajara" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-caborca-cafe focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-sm font-medium text-caborca-cafe mb-2">
                        Mensaje
                      </label>
                      <textarea 
                        rows="4" 
                        name="mensaje"
                        value={formulario.mensaje}
                        onChange={manejarCambioFormulario}
                        placeholder="Cuéntanos sobre tu negocio..." 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-caborca-cafe focus:border-transparent resize-none h-full"
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
                    <button 
                      type="submit" 
                      className="bg-caborca-cafe text-white px-8 py-3 rounded-lg font-semibold hover:bg-caborca-negro transition-colors"
                    >
                      {content.formulario?.submitLabel || 'ENVIAR SOLICITUD'}
                    </button>
                    <div className="flex items-center gap-3 text-caborca-cafe/70">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                      <span className="text-sm">Respuesta en 24-48 hrs</span>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-caborca-cafe">{content.counters.distribuidores}</div>
                        <div className="text-xs text-caborca-cafe/60">Distribuidores</div>
                      </div>
                      <div className="w-14 h-14 bg-caborca-cafe rounded-full flex items-center justify-center">
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                        </svg>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-caborca-cafe">{content.counters.estados}</div>
                        <div className="text-xs text-caborca-cafe/60">Estados</div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* MAP SECTION */}
        <section data-cms-section="mapa" className="py-8 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-serif mb-8 text-caborca-cafe text-center">
              Encuéntranos en el mapa
            </h2>
            <p className="text-center mb-8 text-caborca-negro">
              Visita nuestras tiendas y distribuidores autorizados en todo México.
            </p>
            
            {/* Filtros de Búsqueda */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Filtro por Tipo de Compra */}
                <div className="flex flex-col">
                  <label htmlFor="purchaseType" className="block text-sm font-semibold text-caborca-cafe mb-2">
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    Tipo de compra
                  </label>
                  <select 
                    id="purchaseType" 
                    value={tipoCompra}
                    onChange={(e) => setTipoCompra(e.target.value)}
                    className="border-2 border-gray-300 rounded py-2 px-4 focus:border-caborca-cafe focus:outline-none transition-colors w-full"
                  >
                    <option value="">Todos los tipos</option>
                    <option value="tienda">Tienda física</option>
                    <option value="online">Compra en línea</option>
                    <option value="ambos">Tienda física y en línea</option>
                  </select>
                </div>

                {/* Filtro por Estado/Ciudad */}
                <div className="flex flex-col">
                  <label htmlFor="stateFilter" className="block text-sm font-semibold text-caborca-cafe mb-2">
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    Ubicación por Estado
                  </label>
                  <select 
                    id="stateFilter" 
                    value={estadoFiltro}
                    onChange={(e) => setEstadoFiltro(e.target.value)}
                    className="border-2 border-gray-300 rounded py-2 px-4 focus:border-caborca-cafe focus:outline-none transition-colors w-full"
                  >
                    <option value="">Selecciona un estado</option>
                    <option value="cdmx">Ciudad de México</option>
                    <option value="jalisco">Jalisco</option>
                    <option value="nuevo-leon">Nuevo León</option>
                    <option value="sonora">Sonora</option>
                    <option value="chihuahua">Chihuahua</option>
                    <option value="texas">Texas, USA</option>
                    <option value="arizona">Arizona, USA</option>
                    <option value="california">California, USA</option>
                  </select>
                </div>

                {/* Botón Usar mi ubicación */}
                <div className="flex flex-col justify-end">
                  <button 
                    onClick={manejarUbicarme}
                    className="bg-caborca-cafe text-white py-2 px-4 rounded hover:bg-caborca-cafe/80 transition-colors whitespace-nowrap w-full" 
                    title="Usar mi ubicación"
                  >
                    <svg className="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    Usar mi ubicación
                  </button>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col justify-end">
                  <div className="flex gap-2">
                    <button 
                      onClick={manejarLimpiarFiltros}
                      className="bg-gray-200 text-caborca-cafe py-2 px-3 rounded hover:bg-gray-300 transition-colors flex-1" 
                      title="Limpiar filtros"
                    >
                      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                    <button 
                      onClick={manejarAplicarFiltros}
                      className="bg-caborca-cafe text-white py-2 px-3 rounded hover:bg-caborca-cafe/80 transition-colors flex-1" 
                      title="Buscar distribuidores"
                    >
                      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-xl max-w-7xl mx-auto" style={{height: '420px'}}>
              <iframe 
                id="mapFrame" 
                src={content.mapSrc}
                width="100%" 
                height="100%" 
                style={{border: 0}} 
                allowFullScreen 
                loading="lazy"
                title="Mapa de distribuidores"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EditarDistribuidores;