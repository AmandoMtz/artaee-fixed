// src/components/ProductCard.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { Product } from '../types'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

interface Props { product: Product }

export default function ProductCard({ product }: Props) {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { toast } = useToast()

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation()
    addToCart(product)
    toast(`${product.name} añadido al carrito ✓`, 'success')
  }

  return (
    <div className="product-card" onClick={() => navigate(`/producto/${product.id}`, { state: { product } })}>
      <div className="product-thumb">
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className="product-thumb-overlay">
          <button className="product-add-btn" onClick={handleAdd}>
            + Añadir al carrito
          </button>
        </div>
      </div>
      <div className="product-body">
        <p className="product-cat">{product.category}</p>
        <p className="product-name">{product.name}</p>
        {product.description && <p className="product-desc">{product.description}</p>}
        <p className="product-price">${product.price.toLocaleString('es-MX')} MXN</p>
      </div>
    </div>
  )
}
