// src/pages/Register.tsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const { toast } = useToast()

  const [form, setForm] = useState({ full_name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(''); setLoading(true)
    if (form.password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres.'); setLoading(false); return }
    try {
      await register(form.full_name, form.email, form.password)
      toast('¡Cuenta creada exitosamente! Bienvenida 💚', 'success')
      navigate('/', { replace: true })
    } catch (err: any) {
      setError(err.message ?? 'Error al crear cuenta')
    } finally { setLoading(false) }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card fade-up">
        <img src="/artaee.png" alt="Artaee" className="brand-logo" />
        <h1>Crear cuenta</h1>
        <p className="subtitle">Únete a Artaee y gestiona tus pedidos fácilmente.</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="form-label">Nombre completo</label>
            <input className="form-input" name="full_name" placeholder="Tu nombre"
              value={form.full_name} onChange={onChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Correo electrónico</label>
            <input className="form-input" type="email" name="email" placeholder="tucorreo@email.com"
              value={form.email} onChange={onChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input className="form-input" type="password" name="password" placeholder="Mínimo 6 caracteres"
              value={form.password} onChange={onChange} required />
          </div>
          <button className="btn-primary mt-16" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
            type="submit" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Crear cuenta →'}
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}
