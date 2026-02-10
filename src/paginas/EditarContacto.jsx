import { useState, useRef } from 'react'
import Header from '../componentes/Header'
import Footer from '../componentes/Footer'

export default function EditarContacto() {
  const [info, setInfo] = useState({
    telefono: '+52 123 456 789',
    email: 'contacto@caborcaboots.com',
    direccion: 'Caborca, Sonora, México',
    horario: 'Lun-Vie 9:00 - 18:00',
    mapaUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120615.72236587609!2d-99.2840989!3d19.432608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce0026db097507%3A0x54061076265ee841!2sCiudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses!2smx!4v1234567890123!5m2!1ses!2smx'
  })

  const [formPreview, setFormPreview] = useState({
    titulo: 'Contáctanos',
    descripcion: 'Envía tus dudas o solicitudes y te responderemos a la brevedad.'
  })

  const [editarInfo, setEditarInfo] = useState(false)
  const [editarForm, setEditarForm] = useState(false)
  const inputFileRef = useRef(null)
  const [guardando, setGuardando] = useState(false)

  const guardarCambios = async () => {
    setGuardando(true)
    try {
      // aquí debería ir la petición a backend
      await new Promise(r => setTimeout(r, 800))
      alert('✓ Cambios guardados')
    } catch (e) {
      alert('✗ Error al guardar')
    } finally {
      setGuardando(false)
      setEditarInfo(false)
      setEditarForm(false)
    }
  }

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8 mt-28">
        <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50 px-6 py-3">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <h3 className="text-lg font-semibold text-caborca-cafe">Editor Visual - Página de Contacto</h3>
            <div className="flex items-center gap-3">
              <button onClick={guardarCambios} disabled={guardando} className="px-4 py-2 bg-caborca-cafe text-white rounded-lg">
                {guardando ? '⏳ Guardando...' : '💾 Guardar Cambios'}
              </button>
            </div>
          </div>
        </div>

        <main className="space-y-12 mt-6">
          {/* Información de contacto */}
          <section data-cms-section="contacto-info" className="bg-white rounded-lg shadow p-6 relative">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-3xl font-serif text-caborca-cafe mb-3">Información de Contacto</h2>
                <p className="text-caborca-negro/80">Teléfono: <strong>{info.telefono}</strong></p>
                <p className="text-caborca-negro/80">Email: <strong>{info.email}</strong></p>
                <p className="text-caborca-negro/80">Dirección: <strong>{info.direccion}</strong></p>
                <p className="text-caborca-negro/80">Horario: <strong>{info.horario}</strong></p>
              </div>
              <div>
                <div className="w-full h-56 bg-gray-100 rounded overflow-hidden">
                  <iframe title="mapa" src={info.mapaUrl} className="w-full h-full border-0" />
                </div>
              </div>
            </div>

            <button onClick={() => setEditarInfo(true)} className="absolute top-4 right-4 bg-blue-600 text-white p-2 rounded-lg">✏️</button>
          </section>

          {/* Formulario de contacto */}
          <section data-cms-section="contacto-form" className="bg-white rounded-lg shadow p-6 relative">
            <div className="md:flex md:items-start md:gap-8">
              <div className="md:flex-1">
                <h2 className="text-3xl font-serif text-caborca-cafe mb-3">{formPreview.titulo}</h2>
                <p className="text-caborca-negro/80 mb-6">{formPreview.descripcion}</p>
                <form className="space-y-3 max-w-md">
                  <input placeholder="Nombre" className="w-full px-3 py-2 border rounded" />
                  <input placeholder="Email" className="w-full px-3 py-2 border rounded" />
                  <textarea placeholder="Mensaje" className="w-full px-3 py-2 border rounded" rows={4} />
                  <button type="button" className="px-4 py-2 bg-caborca-cafe text-white rounded">Enviar</button>
                </form>
              </div>
            </div>
            <button onClick={() => setEditarForm(true)} className="absolute top-4 right-4 bg-blue-600 text-white p-2 rounded-lg">✏️</button>
          </section>
        </main>

        {/* Modales */}
        {editarInfo && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-caborca-cafe">✏️ Editar Información de Contacto</h3>
                <button onClick={() => setEditarInfo(false)} className="text-2xl">✕</button>
              </div>
              <div className="space-y-3">
                <label className="block text-sm">Teléfono</label>
                <input value={info.telefono} onChange={(e) => setInfo(prev => ({ ...prev, telefono: e.target.value }))} className="w-full px-3 py-2 border rounded" />
                <label className="block text-sm">Email</label>
                <input value={info.email} onChange={(e) => setInfo(prev => ({ ...prev, email: e.target.value }))} className="w-full px-3 py-2 border rounded" />
                <label className="block text-sm">Dirección</label>
                <input value={info.direccion} onChange={(e) => setInfo(prev => ({ ...prev, direccion: e.target.value }))} className="w-full px-3 py-2 border rounded" />
                <label className="block text-sm">Horario</label>
                <input value={info.horario} onChange={(e) => setInfo(prev => ({ ...prev, horario: e.target.value }))} className="w-full px-3 py-2 border rounded" />
                <label className="block text-sm">Mapa (embed URL)</label>
                <input value={info.mapaUrl} onChange={(e) => setInfo(prev => ({ ...prev, mapaUrl: e.target.value }))} className="w-full px-3 py-2 border rounded" />
              </div>
              <div className="mt-4 flex justify-end gap-3">
                <button onClick={() => setEditarInfo(false)} className="px-4 py-2 border rounded">Cancelar</button>
                <button onClick={guardarCambios} className="px-4 py-2 bg-caborca-cafe text-white rounded">✓ Aplicar</button>
              </div>
            </div>
          </div>
        )}

        {editarForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-caborca-cafe">✏️ Editar Formulario</h3>
                <button onClick={() => setEditarForm(false)} className="text-2xl">✕</button>
              </div>
              <div className="space-y-3">
                <label className="block text-sm">Título</label>
                <input value={formPreview.titulo} onChange={(e) => setFormPreview(prev => ({ ...prev, titulo: e.target.value }))} className="w-full px-3 py-2 border rounded" />
                <label className="block text-sm">Descripción</label>
                <textarea value={formPreview.descripcion} onChange={(e) => setFormPreview(prev => ({ ...prev, descripcion: e.target.value }))} className="w-full px-3 py-2 border rounded" rows={3} />
              </div>
              <div className="mt-4 flex justify-end gap-3">
                <button onClick={() => setEditarForm(false)} className="px-4 py-2 border rounded">Cancelar</button>
                <button onClick={guardarCambios} className="px-4 py-2 bg-caborca-cafe text-white rounded">✓ Aplicar</button>
              </div>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </>
  )
}
