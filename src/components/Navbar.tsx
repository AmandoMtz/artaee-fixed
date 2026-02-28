// src/components/Navbar.tsx
import React, { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { count } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const initials = user?.full_name
    ? user.full_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : ''

  return (
    <header className="topbar">
      <div className="topbar-inner">
        {/* Brand */}
        <div className="topbar-brand" onClick={() => navigate('/')}>
          <img src="/artaee.png" alt="Artaee" className="logo" />
          <div className="brand-block">
            <span className="brand-title">Artaee</span>
            <span className="brand-sub">Moda & accesorios</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="topbar-nav">
          <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Inicio</NavLink>
          <NavLink to="/productos" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Productos</NavLink>
          <NavLink to="/mochilas" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Bolsas</NavLink>
          <NavLink to="/portavasos" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Portavasos</NavLink>
          <NavLink to="/nosotros" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Nosotros</NavLink>
          <NavLink to="/contacto" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Contacto</NavLink>
        </nav>

        {/* Actions */}
        <div className="topbar-actions">
          {!user ? (
            <button className="btn-login" onClick={() => navigate('/login')}>
              Iniciar sesión
            </button>
          ) : (
            <div className="account-wrap" ref={menuRef}>
              <button className="account-btn" onClick={() => setMenuOpen(o => !o)}>
                <div className="account-avatar">{initials}</div>
                <span>{user.full_name.split(' ')[0]}</span>
                <span style={{ fontSize: '0.7rem', opacity: .6 }}>▾</span>
              </button>
              {menuOpen && (
                <div className="account-menu">
                  <div style={{ padding: '10px 14px 6px', fontSize: '0.78rem', color: 'var(--c-muted)' }}>
                    {user.email}
                  </div>
                  <div className="account-menu-divider" />
                  <NavLink to="/pedidos" onClick={() => setMenuOpen(false)}>
                    📦 Mis pedidos
                  </NavLink>
                  <div className="account-menu-divider" />
                  <button className="logout" onClick={() => { logout(); setMenuOpen(false); navigate('/') }}>
                    ← Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}

          <button className="btn-icon" onClick={() => navigate('/carrito')} aria-label="Carrito">
            🛒
            {count > 0 && <span className="cart-badge">{count}</span>}
          </button>
        </div>
      </div>
    </header>
  )
}
