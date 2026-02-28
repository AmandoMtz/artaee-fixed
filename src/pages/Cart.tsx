// src/pages/Cart.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Cart() {
  const { items, removeFromCart, updateQty, clearCart, total } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [notes, setNotes] = useState('')

  if (items.length === 0) return (
    <div className="page">
      <div className="cart-empty">
        <div style={{ fontSize: '4rem', marginBottom: 16 }}>🛒</div>
        <h2>Tu carrito está vacío</h2>
        <p>Añade algunos productos para continuar</p>
        <button className="btn-primary" onClick={() => navigate('/productos')}>Ver productos</button>
      </div>
    </div>
  )

  const handleCheckout = () => {
    if (!user) {
      navigate('/login', { state: { redirectTo: '/pago' } })
      return
    }
    navigate('/pago', { state: { cartItems: items, totalAmount: total, notes } })
  }

  return (
    <div className="page">
      <div className="page-hero fade-up">
        <h1>Tu carrito</h1>
        <p>{items.length} producto{items.length !== 1 ? 's' : ''} · ${total.toLocaleString('es-MX')} MXN</p>
      </div>

      <div className="cart-layout">
        {/* Items */}
        <div className="cart-items">
          {items.map(item => (
            <div key={`${item.id}-${item.size}`} className="cart-item">
              <img className="cart-item-img" src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-meta">Talla: {item.size} · ${item.price.toLocaleString('es-MX')} MXN c/u</p>
                <div className="qty-ctrl">
                  <button className="qty-btn" onClick={() => updateQty(item.id, item.size, item.quantity - 1)}>−</button>
                  <span className="qty-num">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.id, item.size, item.quantity + 1)}>+</button>
                </div>
                <button className="cart-remove" onClick={() => removeFromCart(item.id, item.size)}>
                  Eliminar
                </button>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <p className="cart-item-price">${(item.price * item.quantity).toLocaleString('es-MX')}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <h3>Resumen del pedido</h3>
          {items.map(item => (
            <div key={`${item.id}-${item.size}`} className="summary-row">
              <span>{item.name} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toLocaleString('es-MX')}</span>
            </div>
          ))}
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toLocaleString('es-MX')} MXN</span>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--c-muted)', marginTop: 16, marginBottom: 6 }}>
            Notas del pedido (opcional)
          </p>
          <textarea
            className="cart-notes"
            rows={3}
            placeholder="Dirección, instrucciones especiales..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />

          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleCheckout}>
            Proceder al pago →
          </button>
          <button
            className="btn-ghost"
            style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}
            onClick={clearCart}
          >
            Vaciar carrito
          </button>

          {!user && (
            <p style={{ fontSize: '0.8rem', color: 'var(--c-muted)', marginTop: 12, textAlign: 'center' }}>
              Necesitas <a href="/login" style={{ color: 'var(--c-green)' }}>iniciar sesión</a> para finalizar tu compra
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
