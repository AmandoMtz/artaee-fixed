// src/App.tsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import PaymentPage from './pages/PaymentPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Orders from './pages/Orders'
import About from './pages/About'
import Contact from './pages/Contact'
import BackpackSection from './pages/BackpackSection'
import PortavosasSection from './pages/PortavosasSection'

export default function App() {
  return (
    <ToastProvider>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/pago" element={<PaymentPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/pedidos" element={<Orders />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/mochilas" element={<BackpackSection />} />
          <Route path="/portavasos" element={<PortavosasSection />} />
        </Routes>
      </Layout>
    </ToastProvider>
  )
}
