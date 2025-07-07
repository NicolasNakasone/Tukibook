import { FormEvent } from 'react'

import { PasswordInput } from 'src/components/form/PasswordInput'
import { SubmitButtons } from 'src/components/form/SubmitButtons'
import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import { useAuth } from 'src/hooks/useAuth.hook'
import { useIsLoading } from 'src/hooks/useIsLoading.hook'
import { DeleteUserParams, DeleteUserResponse } from 'tukibook-helper'

const { VITE_API_URL } = import.meta.env

interface DeleteUserFormProps {
  onClose: () => void
}

export const DeleteUserForm = ({ onClose }: DeleteUserFormProps): JSX.Element => {
  const { isLoading, handleIsLoading } = useIsLoading()
  const { user, logoutUser } = useAuth()

  const deleteUser = async ({ userId, password }: DeleteUserParams) =>
    await handleFetch<DeleteUserResponse>(
      `${VITE_API_URL}${routes.deleteUser.replace(':id', userId)}`,
      {
        method: 'POST',
        body: JSON.stringify({ password }),
        credentials: 'include',
      }
    )

  const handleDeleteUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleIsLoading(true)

    const target = e.target as HTMLFormElement
    const password = target[0] as HTMLInputElement

    const { data } = await deleteUser({ userId: user?.id || '', password: password.value })

    handleIsLoading(false)

    if (data) await logoutUser()
  }

  return (
    <form
      style={{ margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '2rem' }}
      onSubmit={handleDeleteUser}
    >
      <p>Ingresá tu contraseña para confirmar que eliminas tu cuenta</p>
      <PasswordInput inputProps={{ placeholder: '🤫 Confirmá con tu contraseña' }} />
      <SubmitButtons {...{ isLoading, onClose }} color="error" />
    </form>
  )
}
