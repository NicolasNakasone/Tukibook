import { useState } from 'react'
import { Button } from 'src/components/common/Button'

export const PasswordInput = (): JSX.Element => {
  const [isPassword, setIsPassword] = useState(false)

  const togglePassword = () => {
    setIsPassword(prevPassword => !prevPassword)
  }

  return (
    <>
      <input
        name="password"
        type={isPassword ? 'password' : 'text'}
        placeholder="🤫 Ingresa tu contraseña"
      />
      <Button type="button" onClick={togglePassword}>
        {isPassword ? `Mostrar 🧐` : `Ocultar 😴`}
      </Button>
    </>
  )
}
