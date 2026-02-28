// src/pages/Orders.tsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { api } from '../api/client'
import type { Order } from '../types'

const STATUS_MAP: Record<string, string> = {
  pendiente: 'status-pendiente',
  procesando: 'status-procesando',
  enviado: 'status-enviado',
  entregado: 'status-entregado',
}
const STATUS_LABEL: Record<string, string> = {
  pendiente: 'Pendiente',
  procesando: 'En proceso',
  enviado: 'Enviado',
  entregado: 'Entregado',
}

export default function Orders() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) { navigate('/login', { state: { redirectTo: '/pedidos' } }); return }
    api.getOrders()
      .then(setOrders)
      .catch(err => setError(err.message ?? 'Error al cargar pedidos'))
      .finally(() => setLoading(false))
  }, [user, navigate])

  if (loading) return <div className="page"><div className="spinner" /></div>

  return (
    <div className="page">
      <div className="page-hero fade-up">
        <h1>Mis pedidos</h1>
        <p>Hola, {user?.full_name?.split(' ')[0]}. Aquí están todos tus pedidos.</p>
      </div>

      {error && (
        <div className="error-msg">
          {error}
          <button
            style={{ marginLeft: 12, fontSize: '0.8rem', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
            onClick={() => { setError(''); setLoading(true); api.getOrders().then(setOrders).catch(e => setError(e.message)).finally(() => setLoading(false)) }}
          >
            Reintentar
          </button>
        </div>
      )}

      {!error && orders.length === 0 ? (
        <div className="cart-empty">
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>📦</div>
          <h2>Todavía no tienes pedidos</h2>
          <p>Cuando realices tu primera compra, aparecerá aquí.</p>
          <button className="btn-primary mt-24" onClick={() => navigate('/productos')}>
            Ver productos
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card fade-up">
              <div className="order-header">
                <div>
                  {/* FIX: id es número (INT), se convierte a string antes de operar */}
                  <p className="order-id">Pedido #{String(order.id).padStart(6, '0')}</p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--c-muted)', marginTop: 2 }}>
                    {new Date(order.created_at).toLocaleDateString('es-MX', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </p>
                </div>
                <span className={`order-status ${STATUS_MAP[order.status] ?? 'status-pendiente'}`}>
                  {STATUS_LABEL[order.status] ?? order.status}
                </span>
              </div>

              <p className="order-total">${Number(order.total).toLocaleString('es-MX')} MXN</p>

              <div className="order-items-list">
                {order.items?.length ? order.items.map((item, i) => (
                  <span key={i}>
                    {item.product_name} (x{item.quantity})
                    {item.size ? ` — Talla: ${item.size}` : ''}
                    {i < order.items.length - 1 ? ', ' : ''}
                  </span>
                )) : <span style={{ color: 'var(--c-muted)' }}>Sin productos registrados</span>}
              </div>

              {order.notes && (
                <p style={{ fontSize: '0.8rem', color: 'var(--c-muted)', marginTop: 8 }}>
                  📝 {order.notes}
                </p>
              )}

              <div style={{ marginTop: 12, padding: '10px 14px', background: 'var(--c-bg2)', borderRadius: 'var(--r-sm)', fontSize: '0.82rem', color: 'var(--c-muted)' }}>
                ⚠️ Recuerda enviar tu comprobante de transferencia a @artaee.store en Instagram
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

