// src/pages/About.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function About() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <div className="about-grid fade-up">
        <div>
          <img src="/mochilastanding.png" alt="Artaee" className="about-img" />
        </div>
        <div className="about-text">
          <h2>Artaee Store,<br /><em style={{ fontStyle: 'italic', color: 'var(--c-green)' }}>hecho con amor</em></h2>
          <p>
            Somos una tienda independiente dedicada a crear piezas únicas para los fans de BTS.
            Cada producto es diseñado y elaborado artesanalmente, con mucha atención al detalle
            y cariño para la comunidad ARMY.
          </p>
          <p>
            Nuestra misión es que cada fan pueda expresar su identidad a través de accesorios
            que van más allá de los típicos productos de merch. Queremos que cada pieza cuente
            una historia y sea especial para quien la lleva.
          </p>
          <p>
            Todos nuestros productos son enviados con empaques especiales y personalizados.
            Trabajamos para que tu experiencia de compra sea tan especial como el producto mismo.
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 28, flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => navigate('/productos')}>
              Ver colección
            </button>
            <a href="https://www.instagram.com/artaee.store" target="_blank" rel="noopener noreferrer">
              <button className="btn-ghost">📸 Instagram</button>
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
        marginTop: 80, padding: '40px 0', borderTop: '1px solid var(--c-border)'
      }}>
        {[
          ['100%', 'Hecho a mano'],
          ['💚', 'Con amor por BTS'],
          ['🇲🇽', 'Envíos a todo México'],
        ].map(([num, label]) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--ff-display)', fontSize: '2.5rem', marginBottom: 8 }}>{num}</div>
            <div style={{ color: 'var(--c-muted)', fontSize: '0.9rem' }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
