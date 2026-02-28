// src/pages/PortavosasSection.tsx
import React from 'react'
import ProductCard from '../components/ProductCard'
import { portavasos } from '../data/products'

export default function PortavosasSection() {
  return (
    <div className="page">
      <div className="page-hero fade-up">
        <h1>Portavasos artesanales</h1>
        <p>Hechos a mano, perfectos para tu escritorio o como regalo especial. Disponibles en múltiples colores.</p>
      </div>
      <div className="products-grid">
        {portavasos.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
