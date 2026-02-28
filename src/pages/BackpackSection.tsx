// src/pages/BackpackSection.tsx
import React from 'react'
import ProductCard from '../components/ProductCard'
import { backpacks } from '../data/products'

export default function BackpackSection() {
  return (
    <div className="page">
      <div className="page-hero fade-up">
        <h1>Colección de Bolsas</h1>
        <p>8 diseños exclusivos inspirados en los álbumes de BTS. Cada mochila es única y hecha con materiales de calidad.</p>
      </div>
      <div className="products-grid">
        {backpacks.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
