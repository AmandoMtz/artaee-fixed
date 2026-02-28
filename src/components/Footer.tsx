// src/components/Footer.tsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="brand-title">Artaee Store</div>
          <p>Bolsas, llaveros, playeras y accesorios únicos inspirados en BTS. Diseñados con amor para los fans. 🐻💚</p>
        </div>
        <div className="footer-col">
          <h4>Navegación</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/productos">Todos los productos</Link></li>
            <li><Link to="/mochilas">Bolsas</Link></li>
            <li><Link to="/portavasos">Portavasos</Link></li>
            <li><Link to="/nosotros">Sobre la marca</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Mi cuenta</h4>
          <ul>
            <li><Link to="/login">Iniciar sesión</Link></li>
            <li><Link to="/registro">Crear cuenta</Link></li>
            <li><Link to="/pedidos">Mis pedidos</Link></li>
            <li><Link to="/carrito">Carrito</Link></li>
            <li><a href="https://www.instagram.com/artaee.store" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Artaee Store. Todos los derechos reservados.</span>
        <span>Diseñado con mucho 💚</span>
      </div>
    </footer>
  )
}
