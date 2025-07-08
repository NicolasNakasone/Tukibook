import { FormEvent, useState } from 'react'

import { PasswordInput } from 'src/components/form/PasswordInput'
import { SubmitButtons } from 'src/components/form/SubmitButtons'
import { useAuth } from 'src/hooks/useAuth.hook'
import { useIsLoading } from 'src/hooks/useIsLoading.hook'

interface ChangePasswordFormProps {
  onClose: () => void
}

export const ChangePasswordForm = ({ onClose }: ChangePasswordFormProps): JSX.Element => {
  const { isLoading, handleIsLoading } = useIsLoading()
  const [error, setError] = useState('')
  const { changePassword, logoutUser } = useAuth()

  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    handleIsLoading(true)

    const target = e.target as HTMLFormElement
    const password = (target.querySelector('input[name="password"]') as HTMLInputElement)?.value
    const newPassword = (target.querySelector('input[name="newPassword"]') as HTMLInputElement)
      ?.value
    const reNewPassword = (target.querySelector('input[name="reNewPassword"]') as HTMLInputElement)
      ?.value

    if (newPassword !== reNewPassword) {
      handleIsLoading(false)
      return setError('Las contraseñas no coinciden')
    }

    const response = await changePassword({ password, newPassword })

    handleIsLoading(false)

    if (response.error) return setError(response.error.message)

    target.reset()
    await logoutUser()
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
      <p>Modificá tu contraseña e inicia sesión de nuevo</p>
      <PasswordInput inputProps={{ placeholder: '🤫 Ingresá tu contraseña actual' }} />
      <PasswordInput
        inputProps={{ name: 'newPassword', placeholder: '🤫 Ingresá tu nueva contraseña' }}
      />
      <PasswordInput
        inputProps={{
          name: 'reNewPassword',
          placeholder: '🤫 Ingresá tu nueva contraseña de nuevo',
        }}
      />
      <SubmitButtons {...{ isLoading, onClose }} />
      {error && <p>{error}</p>}
    </form>
  )
}
