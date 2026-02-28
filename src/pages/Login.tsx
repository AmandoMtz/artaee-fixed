// src/pages/Login.tsx
import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const { toast } = useToast()
  const redirectTo = (location.state as any)?.redirectTo ?? '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      await login(email, password)
      toast('¡Bienvenida de vuelta! 💚', 'success')
      navigate(redirectTo, { replace: true })
    } catch (err: any) {
      setError(err.message ?? 'Error al iniciar sesión')
    } finally { setLoading(false) }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card fade-up">
        <img src="/artaee.png" alt="Artaee" className="brand-logo" />
        <h1>Iniciar sesión</h1>
        <p className="subtitle">Accede para ver y gestionar tus pedidos.</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="form-label">Correo electrónico</label>
            <input className="form-input" type="email" placeholder="tucorreo@email.com"
              value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input className="form-input" type="password" placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button className="btn-primary mt-16" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
            type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Iniciar sesión →'}
          </button>
        </form>

        <p className="auth-footer">
          ¿No tienes cuenta? <Link to="/registro">Crear cuenta gratis</Link>
        </p>
      </div>
    </div>
  )
}
