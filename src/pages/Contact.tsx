// src/pages/Contact.tsx
import React, { useState } from 'react'
import { useToast } from '../context/ToastContext'

export default function Contact() {
  const { toast } = useToast()
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    toast('¡Mensaje recibido! Te contactaremos pronto 💚', 'success')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="page">
      <div className="page-hero fade-up">
        <h1>Contacto</h1>
        <p>¿Tienes dudas sobre tu pedido? ¡Escríbenos! También puedes encontrarnos en Instagram.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
        <div className="auth-card fade-up" style={{ maxWidth: '100%' }}>
          <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.5rem', fontWeight: 400, marginBottom: 24 }}>
            Envíanos un mensaje
          </h3>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="form-label">Tu nombre</label>
              <input className="form-input" placeholder="Nombre" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label className="form-label">Correo</label>
              <input className="form-input" type="email" placeholder="correo@email.com" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label className="form-label">Mensaje</label>
              <textarea className="form-input" rows={5} placeholder="¿En qué podemos ayudarte?" value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required
                style={{ resize: 'vertical' }} />
            </div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} type="submit">
              Enviar mensaje
            </button>
          </form>
        </div>

        <div className="fade-up fade-up-2">
          <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.5rem', fontWeight: 400, marginBottom: 20 }}>
            Otras formas de contacto
          </h3>
          {[
            ['📸', 'Instagram', '@artaee.store', 'https://www.instagram.com/artaee.store'],
            ['📦', 'Pedidos', 'Inicia sesión para ver el estado de tu pedido', '/pedidos'],
            ['🚚', 'Envíos', 'Enviamos a toda la República Mexicana', null],
          ].map(([icon, title, desc, link]) => (
            <div key={title as string} style={{
              display: 'flex', gap: 16, padding: '20px 0',
              borderBottom: '1px solid var(--c-border)'
            }}>
              <span style={{ fontSize: '1.5rem' }}>{icon}</span>
              <div>
                <p style={{ fontWeight: 600, marginBottom: 4 }}>{title as string}</p>
                {link ? (
                  <a href={link as string} style={{ color: 'var(--c-green)', fontSize: '0.9rem' }}>{desc as string}</a>
                ) : (
                  <p style={{ color: 'var(--c-muted)', fontSize: '0.9rem' }}>{desc as string}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
