import { FormEvent, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'src/components/common/Button'
import { PasswordInput } from 'src/components/form/PasswordInput'
import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'

const { VITE_API_URL } = import.meta.env

export const RegisterPage = (): JSX.Element => {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const target = e.target as HTMLFormElement

    const username = target[0] as HTMLInputElement
    const email = target[1] as HTMLInputElement
    const password = target[2] as HTMLInputElement

    const newUser = {
      username: username.value,
      email: email.value,
      password: password.value,
    }

    const registerUser = await handleFetch(`${VITE_API_URL}${routes.register}`, {
      method: 'POST',
      body: JSON.stringify(newUser),
    })

    const response = await registerUser?.json()

    if (response.message) {
      setError(response.message)
      return
    }

    target.reset()
    setError('')
    navigate(routes.login)
  }

  return (
    <main
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ margin: '0 0 2rem' }}>Registrate en Tukibook 👍!</h1>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        onSubmit={handleRegister}
      >
        <input name="username" type="text" placeholder="👤 Ingresa tu nombre de usuario" />
        <input name="email" type="email" placeholder="✉️ Ingresa tu correo" />
        <PasswordInput />
        <Button style={{ margin: '0 0 0 auto' }}>Registrate</Button>
        {error && <p>{error}</p>}
        <p style={{ margin: '2rem 0 0', textAlign: 'center' }}>
          Ya tenés cuenta? <Link to={routes.login}>Inicia sesión</Link>
        </p>
      </form>
    </main>
  )
}
