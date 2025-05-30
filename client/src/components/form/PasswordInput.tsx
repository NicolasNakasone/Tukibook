import { InputHTMLAttributes, useState } from 'react'

import { Button } from 'src/components/common/Button'

interface PasswordInputProps {
  inputProps?: InputHTMLAttributes<HTMLInputElement>
}

export const PasswordInput = ({
  inputProps = { name: 'password', placeholder: '🤫 Ingresa tu contraseña' },
}: PasswordInputProps): JSX.Element => {
  const [isPassword, setIsPassword] = useState(true)

  const togglePassword = () => {
    setIsPassword(prevPassword => !prevPassword)
  }

  return (
    <>
      <input
        name={inputProps.name}
        type={isPassword ? 'password' : 'text'}
        placeholder={inputProps.placeholder}
      />
      <Button type="button" onClick={togglePassword}>
        {isPassword ? `Mostrar 🧐` : `Ocultar 😴`}
      </Button>
    </>
  )
}
