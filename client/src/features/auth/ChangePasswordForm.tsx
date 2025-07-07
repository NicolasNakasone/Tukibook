import { FormEvent } from 'react'

import { Button } from 'src/components/common/Button'
import { PasswordInput } from 'src/components/form/PasswordInput'
import { useIsLoading } from 'src/hooks/useIsLoading.hook'

export const ChangePasswordForm = (): JSX.Element => {
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
      <div style={{ margin: '1rem 0 0 auto', display: 'flex', gap: '0.75rem' }}>
        <Button
          variant="normal"
          // color="info"
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Confirmar
        </Button>
        <Button
          disabled={isLoading}
          // onClick={onClose}
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}
