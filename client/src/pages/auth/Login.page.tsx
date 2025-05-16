import { FormEvent, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'src/components/common/Button'
import { PasswordInput } from 'src/components/form/PasswordInput'
import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import { useAuth } from 'src/hooks/useAuth.hook'
import styles from 'src/pages/auth/Auth.module.css'

const { VITE_API_URL } = import.meta.env

export const LoginPage = (): JSX.Element => {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const { setUser } = useAuth()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const target = e.target as HTMLFormElement

    const email = target[0] as HTMLInputElement
    const password = target[1] as HTMLInputElement

    const loggedUser = {
      email: email.value,
      password: password.value,
    }

    const loginUser = await handleFetch(`${VITE_API_URL}${routes.login}`, {
      method: 'POST',
      body: JSON.stringify(loggedUser),
      credentials: 'include',
    })

    const response = await loginUser?.json()

    if (response.message) {
      setError(response.message)
      return
    }

    target.reset()
    setError('')
    localStorage.setItem('accessToken', response.token)
    setUser(response.user)
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
        <Button style={{ margin: '0 0 0 auto' }}>Inicia sesión</Button>
        {error && <p>{error}</p>}
        <p style={{ margin: '2rem 0 0', textAlign: 'center' }}>
          No tenés cuenta? <Link to={routes.register}>Registrate</Link>
        </p>
      </form>
    </main>
  )
}
