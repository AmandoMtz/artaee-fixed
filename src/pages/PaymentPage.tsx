// src/pages/PaymentPage.tsx
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { api } from '../api/client'
import { useToast } from '../context/ToastContext'
import type { CartItem } from '../types'
import { jsPDF } from 'jspdf'

export default function PaymentPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { clearCart } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()

  const cartItems: CartItem[] = state?.cartItems ?? []
  const totalAmount: number = state?.totalAmount ?? 0
  const notes: string = state?.notes ?? ''

  const [loading, setLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [orderId, setOrderId] = useState<number | string | null>(null)
  if (!cartItems.length) {
    navigate('/carrito')
    return null
  }

  async function handleConfirm() {
  setLoading(true)
  try {
    const order = await api.createOrder({ items: cartItems, notes })
    setOrderId(order.id)   // ← solo esta línea
    setConfirmed(true)
    clearCart()
    toast('¡Pedido registrado exitosamente! 🎉', 'success')
  } catch (err: any) {
    toast(err.message ?? 'Error al registrar pedido', 'error')
  } finally {
    setLoading(false)
  }
}

  function generateTicket() {
    const doc = new jsPDF({ unit: 'mm', format: [80, 200] }) // Formato ticket térmico

    const green: [number, number, number] = [61, 122, 79]
    const dark: [number, number, number]  = [26, 25, 22]
    const gray: [number, number, number]  = [120, 112, 104]

    let y = 10

    // --- Logo / Encabezado ---
    doc.setFillColor(...green)
    doc.roundedRect(5, y, 70, 18, 3, 3, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.text('ARTAEE STORE', 40, y + 8, { align: 'center' })
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.text('Moda & accesorios únicos 🐻', 40, y + 14, { align: 'center' })
    y += 24

    // --- Folio y fecha ---
    doc.setTextColor(...dark)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.text(`Pedido #${orderId ?? '—'}`, 5, y)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...gray)
    doc.text(new Date().toLocaleString('es-MX'), 5, y + 5)
    y += 12

    // --- Línea separadora ---
    doc.setDrawColor(...green)
    doc.setLineWidth(0.4)
    doc.line(5, y, 75, y)
    y += 5

    // --- Productos ---
    doc.setTextColor(...dark)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7)
    doc.text('PRODUCTOS', 5, y)
    y += 5

    cartItems.forEach((item) => {
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(...dark)
      doc.setFontSize(8)

      // Nombre del producto (puede ser largo, lo recortamos)
      const nombre = item.name.length > 28 ? item.name.slice(0, 25) + '...' : item.name
      doc.text(nombre, 5, y)
      y += 4

      doc.setTextColor(...gray)
      doc.setFontSize(7)
      doc.text(`Talla: ${item.size ?? 'Único'}  x${item.quantity}`, 5, y)
      doc.setTextColor(...green)
      doc.setFont('helvetica', 'bold')
      doc.text(`$${(item.price * item.quantity).toLocaleString('es-MX')} MXN`, 75, y, { align: 'right' })
      doc.setFont('helvetica', 'normal')
      y += 6
    })

    // --- Línea separadora ---
    doc.setDrawColor(...gray)
    doc.setLineWidth(0.2)
    doc.line(5, y, 75, y)
    y += 5

    // --- Total ---
    doc.setFillColor(240, 250, 244)
    doc.roundedRect(5, y, 70, 12, 2, 2, 'F')
    doc.setTextColor(...gray)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text('TOTAL A PAGAR', 8, y + 5)
    doc.setTextColor(...green)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.text(`$${totalAmount.toLocaleString('es-MX')} MXN`, 72, y + 7, { align: 'right' })
    y += 18

    // --- Datos bancarios ---
    doc.setFillColor(...green)
    doc.roundedRect(5, y, 70, 6, 2, 2, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7)
    doc.text('DATOS DE TRANSFERENCIA', 40, y + 4, { align: 'center' })
    y += 10

    const bancoDatos = [
      ['Banco', 'Banco Azteca'],
      ['Beneficiario', 'Fernanda Victoria '],
      ['Cuenta', '4027 6657 7785 9670'],
    ]

    bancoDatos.forEach(([label, value]) => {
      doc.setTextColor(...gray)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(7)
      doc.text(label + ':', 5, y)
      doc.setTextColor(...dark)
      doc.setFont('helvetica', 'bold')
      doc.text(value, 75, y, { align: 'right' })
      y += 6
    })

    y += 2
    doc.setDrawColor(...green)
    doc.setLineWidth(0.4)
    doc.line(5, y, 75, y)
    y += 6

    // --- Notas ---
    if (notes) {
      doc.setTextColor(...gray)
      doc.setFont('helvetica', 'italic')
      doc.setFontSize(7)
      doc.text(`Notas: ${notes}`, 5, y, { maxWidth: 68 })
      y += 10
    }

    // --- Pie de página ---
    doc.setTextColor(...gray)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.text('Envía tu comprobante a:', 40, y, { align: 'center' })
    y += 5
    doc.setTextColor(...green)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.text('@artaee.store', 40, y, { align: 'center' })
    y += 6
    doc.setTextColor(...gray)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(6)
    doc.text('¡Gracias por tu compra! 💚', 40, y, { align: 'center' })

    doc.save(`ticket-artaee-${orderId ?? 'pedido'}.pdf`)
  }

  if (confirmed) {
    return (
      <div className="payment-wrapper">
        <div className="payment-card text-center">
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>✅</div>
          <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: '2.5rem', fontWeight: 300, marginBottom: 12 }}>
            ¡Pedido registrado!
          </h2>
          <p style={{ color: 'var(--c-muted)', marginBottom: 8 }}>
            Tu pedido ha sido guardado. Recuerda realizar la transferencia para procesarlo.
          </p>
          {orderId && (
            <p style={{ fontSize: '0.8rem', color: 'var(--c-muted)', marginBottom: 28 }}>
              Pedido #{orderId}
            </p>
          )}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={generateTicket}>📄 Descargar ticket en PDF</button>
            <button className="btn-ghost" onClick={() => navigate('/pedidos')}>Ver mis pedidos</button>
            <button className="btn-ghost" onClick={() => navigate('/productos')}>Seguir comprando</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="payment-wrapper">
      <div className="payment-card fade-up">
        <h2>Finalizar compra</h2>

        {/* Resumen */}
        <div style={{ marginBottom: 28 }}>
          <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.2rem', marginBottom: 16 }}>Tu pedido</h3>
          {cartItems.map((item, i) => (
            <div key={i} className="summary-row" style={{ fontSize: '0.9rem', padding: '8px 0', borderTop: '1px solid var(--c-border)' }}>
              <span>{item.name} · Talla {item.size} · x{item.quantity}</span>
              <span style={{ fontWeight: 600 }}>${(item.price * item.quantity).toLocaleString('es-MX')}</span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="total-highlight">
          <p style={{ fontSize: '0.82rem', color: 'var(--c-green-dk)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.06em' }}>
            Total del pedido
          </p>
          <div className="amount">${totalAmount.toLocaleString('es-MX')} MXN</div>
        </div>

        {/* Pasos */}
        <div style={{ marginBottom: 24 }}>
          {[
            ['1', 'Confirma tu pedido', 'Haz clic en "Confirmar pedido" para registrarlo'],
            ['2', 'Realiza la transferencia', 'Usa los datos bancarios de abajo'],
            ['3', 'Envía tu comprobante', 'Mándalo por Instagram @artaee.store'],
          ].map(([num, title, desc]) => (
            <div key={num} className="payment-step">
              <div className="payment-step-num">{num}</div>
              <div className="payment-step-text">
                <strong>{title}</strong>
                <span>{desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Datos bancarios */}
        <div className="bank-info">
          <h3>Datos de transferencia</h3>
          {[
            ['Banco', 'Banco Azteca'],
            ['Beneficiario', 'Fernanda Victoria'],
            ['Cuenta', '4027 6657 7785'],
            ['Monto exacto', `$${totalAmount.toLocaleString('es-MX')} MXN`],
          ].map(([label, value]) => (
            <div key={label} className="bank-row">
              <span>{label}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>

        {notes && (
          <div style={{ background: 'var(--c-bg2)', borderRadius: 'var(--r-sm)', padding: '12px 16px', marginBottom: 20, fontSize: '0.88rem', color: 'var(--c-muted)' }}>
            <strong>Notas:</strong> {notes}
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            className="btn-primary"
            style={{ flex: 1, justifyContent: 'center', padding: '14px' }}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? 'Guardando...' : '✓ Confirmar pedido'}
          </button>
          <button className="btn-ghost" onClick={() => navigate('/carrito')}>
            ← Volver
          </button>
        </div>
      </div>
    </div>
  )
}
