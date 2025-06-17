import { FormEvent, useState } from 'react'

import { Link } from 'react-router-dom'
import { Button } from 'src/components/common/Button'
import { PasswordInput } from 'src/components/form/PasswordInput'
import { routes } from 'src/constants/routes'
import { useAuth } from 'src/hooks/useAuth.hook'
import styles from 'src/pages/auth/Auth.module.css'
import { LoginParams } from 'tukibook-helper'

export const LoginPage = (): JSX.Element => {
  const [error, setError] = useState('')

  const { loginUser } = useAuth()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    const target = e.target as HTMLFormElement

    const email = target[0] as HTMLInputElement
    const password = target[1] as HTMLInputElement

    const loggedUser: LoginParams = { email: email.value, password: password.value }

    const response = (await loginUser(loggedUser))?.message
    if (response) return setError(response)

    target.reset()
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
