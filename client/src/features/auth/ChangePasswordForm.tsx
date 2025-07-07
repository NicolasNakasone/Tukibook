import { FormEvent } from 'react'

import { PasswordInput } from 'src/components/form/PasswordInput'
import { SubmitButtons } from 'src/components/form/SubmitButtons'
import { useIsLoading } from 'src/hooks/useIsLoading.hook'

interface ChangePasswordFormProps {
  onClose: () => void
}

export const ChangePasswordForm = ({ onClose }: ChangePasswordFormProps): JSX.Element => {
  const { isLoading, handleIsLoading } = useIsLoading()

  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleIsLoading(true)

    // ...
  }

  return (
    <form
      style={{
        margin: '1rem 0',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: '0',
        gap: '2rem',
      }}
      onSubmit={handleChangePassword}
    >
      <PasswordInput />
      <PasswordInput
        inputProps={{
          name: 'repassword',
          placeholder: '🤫 Ingresá tu contraseña nuevamente',
        }}
      />
      <SubmitButtons {...{ isLoading, onClose }} />
    </form>
  )
}
