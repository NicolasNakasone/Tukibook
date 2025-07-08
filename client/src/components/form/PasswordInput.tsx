import { InputHTMLAttributes, useEffect, useRef, useState } from 'react'

import { Button } from 'src/components/common/Button'
import styles from 'src/components/form/PasswordInput.module.css'

interface PasswordInputProps {
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  showPassword?: boolean
  handleShowPassword?: () => void
}

export const PasswordInput = ({
  inputProps = { name: 'password', placeholder: '🤫 Ingresá tu contraseña' },
  showPassword,
  handleShowPassword,
}: PasswordInputProps): JSX.Element => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [buttonWidth, setButtonWidth] = useState(0)

  const [isPasswordLocal, setIsPasswordLocal] = useState(true)
  const isControlled = showPassword !== undefined
  const isPasswordVisible = isControlled ? !showPassword : !isPasswordLocal

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth)
    }
  }, [])

  const togglePassword = () => {
    if (handleShowPassword) return handleShowPassword()
    setIsPasswordLocal(prev => !prev)
  }

  return (
    <div className={styles.passwordInputContainer}>
      <input
        {...inputProps}
        type={isPasswordVisible ? 'text' : 'password'}
        style={{ paddingRight: `${buttonWidth + 24}px` }}
      />
      <Button ref={buttonRef} variant="normal" onClick={togglePassword}>
        {isPasswordVisible ? 'Ocultar 😴' : 'Mostrar 🧐'}
      </Button>
    </div>
  )
}
