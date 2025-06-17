import { FormEvent, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'src/components/common/Button'
import { PasswordInput } from 'src/components/form/PasswordInput'
import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import { useAuth } from 'src/hooks/useAuth.hook'
import styles from 'src/pages/auth/Auth.module.css'
import { LoginParams, LoginResponse } from 'tukibook-helper'

const { VITE_API_URL } = import.meta.env

export const LoginPage = (): JSX.Element => {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const { setUser } = useAuth()

  const loginUser = async (loginParams: LoginParams) =>
    await handleFetch<LoginResponse>(`${VITE_API_URL}${routes.login}`, {
      method: 'POST',
      body: JSON.stringify(loginParams),
      credentials: 'include',
    })

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const target = e.target as HTMLFormElement

    const email = target[0] as HTMLInputElement
    const password = target[1] as HTMLInputElement

    const loggedUser: LoginParams = { email: email.value, password: password.value }

    const { data, error } = await loginUser(loggedUser)
    if (!data) return setError(error?.message || '')

    target.reset()
    setError('')
    localStorage.setItem('accessToken', data.token)
    setUser(data.user)
    navigate(routes.home)
  }

  return (
    <main className={styles.mainContainer}>
      <h1 style={{ margin: '0 0 2rem' }}>Bienvenido a Tukibook 👍!</h1>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        onSubmit={handleLogin}
      >
        <input name="email" type="email" placeholder="✉️ Ingresa tu correo" />
        <PasswordInput />
        <Button size="md" width="xlarge" type="submit" className={styles.submitButton}>
          Inicia sesión
        </Button>
        {error && <p>{error}</p>}
        <p style={{ margin: '2rem 0 0', textAlign: 'center' }}>
          No tenés cuenta? <Link to={routes.register}>Registrate</Link>
        </p>
      </form>
    </main>
  )
}
