// src/pages/Home.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { featuredProducts, CATEGORIES, allProducts, portavasos } from '../data/products'

export default function Home() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content fade-up">
          <span className="hero-badge">✨ Colección 2025</span>
          <h1>
            Tu estilo,<br />
            <em>tu identidad</em>
          </h1>
          <p className="hero-sub">
            Bolsas, portavasos, llaveros y accesorios únicos inspirados en BTS.
            Piezas de colección para fans con estilo propio.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate('/productos')}>
              Ver productos →
            </button>
            <button className="btn-ghost" onClick={() => setSidebarOpen(true)}>
              Categorías
            </button>
          </div>
        </div>

        <div className="hero-visual fade-up fade-up-2">
          <div className="hero-img-main">
            <img src="/mochilavante.png" alt="Artaee Collection" />
          </div>
          <div className="hero-tag">
            <span>Piezas disponibles</span>
            <strong>{allProducts.length}+</strong>
          </div>
        </div>
      </section>

      {/* Sidebar de categorías */}
      {sidebarOpen && (
        <>
          <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
          <div className="cat-sidebar">
            <div className="cat-sidebar-header">
              <h2>Categorías</h2>
              <button className="close-btn" onClick={() => setSidebarOpen(false)}>×</button>
            </div>
            <ul className="cat-sidebar-list">
              {[
                { label: 'Todos los productos', path: '/productos' },
                { label: 'Bolsas', path: '/mochilas' },
                { label: 'Portavasos', path: '/portavasos' },
                { label: 'Llaveros', path: '/productos' },
                { label: 'Playeras', path: '/productos' },
                { label: 'Accesorios', path: '/productos' },
              ].map(cat => (
                <li key={cat.label} onClick={() => { navigate(cat.path); setSidebarOpen(false) }}>
                  {cat.label}
                  <span className="arrow">→</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Destacados */}
      <section className="section">
        <div className="section-head">
          <h2>Productos destacados</h2>
          <a className="section-link" onClick={() => navigate('/productos')} style={{ cursor: 'pointer' }}>
            Ver todos →
          </a>
        </div>
        <div className="products-grid">
          {featuredProducts.map((p, i) => (
            <div key={p.id} className={`fade-up fade-up-${i + 1}`}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Banner bolsas */}
      <div style={{
        background: 'linear-gradient(135deg, var(--c-green) 0%, var(--c-green-dk) 100%)',
        padding: '80px 24px', textAlign: 'center', color: 'white'
      }}>
        <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, marginBottom: 16 }}>
          Colección de Bolsas
        </h2>
        <p style={{ opacity: .8, marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
          8 diseños exclusivos inspirados en los álbumes y etapas más icónicas de BTS.
        </p>
        <button className="btn-ghost" style={{ borderColor: 'rgba(255,255,255,.5)', color: 'white' }}
          onClick={() => navigate('/mochilas')}>
          Explorar bolsas →
        </button>
      </div>

      {/* Portavasos preview */}
      <section className="section">
        <div className="section-head">
          <h2>Portavasos artesanales</h2>
          <a className="section-link" onClick={() => navigate('/portavasos')} style={{ cursor: 'pointer' }}>
            Ver todos →
          </a>
        </div>
        <p style={{ color: 'var(--c-muted)', marginBottom: 36, maxWidth: 560 }}>
          Hechos a mano con materiales de calidad. Perfectos para tu escritorio o como regalo.
        </p>
        <div className="products-grid">
          {portavasos.slice(0, 4).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
