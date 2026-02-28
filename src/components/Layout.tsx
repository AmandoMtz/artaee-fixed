// src/components/Layout.tsx
import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <div className="green-band">🐻 Nueva colección 2026 — Envíos a todo México</div>
      <Navbar />
      <main className="main">{children}</main>
      <Footer />
    </div>
  )
}
