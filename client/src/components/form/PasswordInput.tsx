import { InputHTMLAttributes, useEffect, useRef, useState } from 'react'

import { Button } from 'src/components/common/Button'
import styles from 'src/components/form/PasswordInput.module.css'

interface PasswordInputProps {
  inputProps?: InputHTMLAttributes<HTMLInputElement>
}

export const PasswordInput = ({
  inputProps = { name: 'password', placeholder: '🤫 Ingresa tu contraseña' },
}: PasswordInputProps): JSX.Element => {
  const [isPassword, setIsPassword] = useState(true)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [buttonWidth, setButtonWidth] = useState(0)

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth)
    }
  }, [])

  const togglePassword = () => {
    setIsPassword(prevPassword => !prevPassword)
  }

  return (
    <div className={styles.passwordInputContainer}>
      <input
        name={inputProps.name}
        type={isPassword ? 'password' : 'text'}
        placeholder={inputProps.placeholder}
        style={{ paddingRight: `${buttonWidth + 24}px` }}
      />
      <Button ref={buttonRef} type="button" onClick={togglePassword}>
        {isPassword ? `Mostrar 🧐` : `Ocultar 😴`}
      </Button>
    </div>
  )
}
