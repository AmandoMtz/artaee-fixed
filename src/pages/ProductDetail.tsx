// src/pages/ProductDetail.tsx
import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { allProducts } from '../data/products'
import ProductCard from '../components/ProductCard'
import { api } from '../api/client'
import type { Product } from '../types'

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'Único']

export default function ProductDetail() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { toast } = useToast()

  const product: Product | undefined = location.state?.product
    ?? allProducts.find(p => String(p.id) === id)

  const [size, setSize] = useState('Único')
  const [qty, setQty] = useState(1)
  const [enStock, setEnStock] = useState<boolean | null>(null)

  useEffect(() => {
    api.getStock().then((stockMap: Record<string, boolean>) => {
      if (product) setEnStock(stockMap[product.id] ?? true)
    }).catch(() => setEnStock(true))
  }, [product])

  if (!product) return (
    <div className="page text-center">
      <h2>Producto no encontrado</h2>
      <button className="btn-primary mt-24" onClick={() => navigate('/productos')}>Volver</button>
    </div>
  )

  const suggestions = allProducts.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4)

  function handleAdd() {
    if (!product || !enStock) return;
    for (let i = 0; i < qty; i++) addToCart(product, size)
    toast(`${product.name} (x${qty}) añadido al carrito ✓`, 'success')
  }

  const isClothing = product.category === 'Ropa' || product.category === 'Playeras'
  const displaySizes = isClothing ? SIZES.slice(0, 5) : ['Único']

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px' }} className="fade-up">

      <div style={{ display: 'flex', gap: 60, alignItems: 'flex-start' }}>

        {/* Imagen sticky */}
        <div style={{ flex: '0 0 480px', position: 'sticky', top: 90, alignSelf: 'flex-start' }}>
          <div style={{ position: 'relative' }}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-md)',
                aspectRatio: '1', objectFit: 'cover', display: 'block',
                filter: enStock === false ? 'grayscale(60%)' : 'none',
                transition: 'filter 0.3s ease'
              }}
            />
            {enStock === false && (
              <div style={{
                position: 'absolute', top: 16, left: 16,
                background: '#C0392B', color: 'white',
                padding: '6px 14px', borderRadius: 100,
                fontSize: '0.82rem', fontWeight: 600,
              }}>
                Sin stock
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--c-muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>
            {product.category}
          </p>
          <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, marginBottom: 12, letterSpacing: '-0.02em' }}>
            {product.name}
          </h1>
          <p style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--c-green-dk)', marginBottom: 12 }}>
            ${product.price.toLocaleString('es-MX')} MXN
          </p>

          {enStock === false ? (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#FEF2F2', color: '#C0392B',
              border: '1px solid #FECACA', borderRadius: 100,
              padding: '4px 14px', fontSize: '0.82rem', fontWeight: 600, marginBottom: 20
            }}>
              ❌ Sin stock por el momento
            </div>
          ) : enStock === true ? (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#F0FDF4', color: 'var(--c-green-dk)',
              border: '1px solid var(--c-green-lt)', borderRadius: 100,
              padding: '4px 14px', fontSize: '0.82rem', fontWeight: 600, marginBottom: 20
            }}>
              ✅ Disponible
            </div>
          ) : null}

          <p style={{ color: 'var(--c-muted)', lineHeight: 1.8, marginBottom: 28, fontSize: '0.95rem' }}>
            {product.description ?? 'Pieza artesanal con diseño exclusivo, elaborada con materiales de alta calidad.'}
          </p>

          <span className="detail-size-label">Talla</span>
          <div className="size-opts">
            {displaySizes.map(s => (
              <button key={s} className={`size-opt${size === s ? ' active' : ''}`} onClick={() => setSize(s)}>
                {s}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: 24 }}>
            <span className="detail-size-label">Cantidad</span>
            <div className="qty-ctrl">
              <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span className="qty-num">{qty}</span>
              <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
            </div>
          </div>

          <div className="detail-actions">
            <button
              className="btn-primary"
              onClick={handleAdd}
              disabled={enStock === false}
              style={{ opacity: enStock === false ? 0.5 : 1, cursor: enStock === false ? 'not-allowed' : 'pointer', flex: 1, justifyContent: 'center', padding: 14, fontSize: '0.95rem' }}
            >
              {enStock === false ? '🚫 Sin stock' : '🛒 Añadir al carrito'}
            </button>
            <button
              className="btn-ghost"
              onClick={() => { handleAdd(); navigate('/carrito') }}
              disabled={enStock === false}
              style={{ opacity: enStock === false ? 0.5 : 1, cursor: enStock === false ? 'not-allowed' : 'pointer' }}
            >
              Comprar ahora
            </button>
          </div>

          <div style={{ marginTop: 36, paddingTop: 24, borderTop: '1px solid var(--c-border)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                ['🚚', 'Envíos a todo México'],
                ['✋', 'Piezas artesanales únicas'],
                ['💬', 'Coordinación por Instagram'],
                ['🔒', 'Compra segura y transparente'],
              ].map(([icon, text]) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.88rem', color: 'var(--c-muted)' }}>
                  <span style={{ fontSize: '1rem' }}>{icon}</span> {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div style={{ marginTop: 60, paddingTop: 40, borderTop: '1px solid var(--c-border)' }}>
          <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: '2rem', fontWeight: 400, marginBottom: 28 }}>
            También te puede interesar
          </h2>
          <div className="products-grid">
            {suggestions.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}
