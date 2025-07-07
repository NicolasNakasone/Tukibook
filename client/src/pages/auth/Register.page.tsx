import { FormEvent, useState } from 'react'

import { Link } from 'react-router-dom'
import { Button } from 'src/components/common/Button'
import { PasswordInput } from 'src/components/form/PasswordInput'
import { routes } from 'src/constants/routes'
import { useAuth } from 'src/hooks/useAuth.hook'
import { useIsLoading } from 'src/hooks/useIsLoading.hook'
import styles from 'src/pages/auth/Auth.module.css'
import { RegisterParams } from 'tukibook-helper'

export const RegisterPage = (): JSX.Element => {
  const { isLoading, handleIsLoading } = useIsLoading()
  const [error, setError] = useState('')
  const { registerUser } = useAuth()

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleIsLoading(true)
    setError('')

    const target = e.target as HTMLFormElement

    const username = target[0] as HTMLInputElement
    const email = target[1] as HTMLInputElement
    const password = target[2] as HTMLInputElement

    const newUser: RegisterParams = {
      username: username.value,
      email: email.value,
      password: password.value,
    }

    const response = (await registerUser(newUser))?.message
    handleIsLoading(false)
    if (response) return setError(response)

    target.reset()
  }

  return (
    <main className={styles.mainContainer}>
      <h1 style={{ margin: '0 0 2rem' }}>Registrate en Tukibook 👍!</h1>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        onSubmit={handleRegister}
      >
        <input name="username" type="text" placeholder="👤 Ingresá tu nombre de usuario" />
        <input name="email" type="email" placeholder="✉️ Ingresá tu correo" />
        <PasswordInput />
        <Button
          size="md"
          width="xlarge"
          type="submit"
          disabled={isLoading}
          isLoading={isLoading}
          className={styles.submitButton}
        >
          Registrate
        </Button>
        {error && <p>{error}</p>}
        <p style={{ margin: '2rem 0 0', textAlign: 'center' }}>
          Ya tenés cuenta? <Link to={routes.login}>Inicia sesión</Link>
        </p>
      </form>
    </main>
  )
}
