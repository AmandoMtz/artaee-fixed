// src/pages/Products.tsx
import React, { useState, useMemo } from 'react'
import ProductCard from '../components/ProductCard'
import { allProducts, CATEGORIES } from '../data/products'

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<'default' | 'asc' | 'desc'>('default')

  const filtered = useMemo(() => {
    let list = allProducts
    if (activeCategory !== 'Todos') list = list.filter(p => p.category === activeCategory)
    if (search.trim()) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    if (sort === 'asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'desc') list = [...list].sort((a, b) => b.price - a.price)
    return list
  }, [activeCategory, search, sort])

  return (
    <div className="page">
      <div className="page-hero fade-up">
        <h1>Todos los productos</h1>
        <p>Explora nuestra colección completa. Cada pieza hecha con amor para ti. 🐻</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
        <input
          className="form-input"
          style={{ maxWidth: 260, height: 40, padding: '8px 14px' }}
          placeholder="Buscar productos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="form-input"
          style={{ maxWidth: 180, height: 40, padding: '8px 14px' }}
          value={sort}
          onChange={e => setSort(e.target.value as typeof sort)}
        >
          <option value="default">Ordenar</option>
          <option value="asc">Precio: menor a mayor</option>
          <option value="desc">Precio: mayor a menor</option>
        </select>
      </div>

      <div className="cat-pills fade-up fade-up-1">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`cat-pill${activeCategory === cat ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center" style={{ padding: '60px 0', color: 'var(--c-muted)' }}>
          No hay productos que coincidan con tu búsqueda.
        </div>
      ) : (
        <>
          <p className="text-muted mb-24" style={{ fontSize: '0.85rem' }}>{filtered.length} producto{filtered.length !== 1 ? 's' : ''}</p>
          <div className="products-grid">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </>
      )}
    </div>
  )
}
