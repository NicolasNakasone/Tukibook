import { FormEvent, useState } from 'react'

import { AvatarInput } from 'src/components/form/AvatarInput'
import { SubmitButtons } from 'src/components/form/SubmitButtons'
import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import { useAuth } from 'src/hooks/useAuth.hook'
import { useIsLoading } from 'src/hooks/useIsLoading.hook'
import { User } from 'tukibook-helper'

const { VITE_API_URL } = import.meta.env

interface EditUserFormProps {
  onClose: () => void
}

export const EditUserForm = ({ onClose }: EditUserFormProps): JSX.Element => {
  const { isLoading, handleIsLoading } = useIsLoading()
  const [error, setError] = useState('')
  const { user, logoutUser, setUser } = useAuth()

  const editUser = async (id: string, payload: FormData) =>
    await handleFetch<User>(`${VITE_API_URL}${routes.editUser.replace(':id', id)}`, {
      method: 'PUT',
      body: payload,
    })

  const handleEditUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    handleIsLoading(true)

    const target = e.target as HTMLFormElement

    const avatarName = (target.querySelector('input[name="avatar"]') as HTMLInputElement)
      .files?.[0]?.name
    const username = (target.querySelector('input[name="username"]') as HTMLInputElement).value
    const email = (target.querySelector('input[name="email"]') as HTMLInputElement).value

    // No hay value o los valores no se modificaron

    const areValuesUnchanged = username === user?.username && email === user?.email

    if (!avatarName && ((!username && !email) || areValuesUnchanged)) {
      handleIsLoading(false)
      return setError('No hay datos para actualizar')
    }

    const formData = new FormData(e.currentTarget)
    const { data, error } = await editUser(user?.id || '', formData)

    handleIsLoading(false)

    if (error) return setError(error.message)

    target.reset()

    if (!(avatarName && areValuesUnchanged)) {
      await logoutUser()
      return
    }
    setUser(data)
    onClose()
  }

  return (
    <form
      style={{ margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '2rem' }}
      onSubmit={handleEditUser}
    >
      <p>Modificá tus datos e inicia sesión nuevamente</p>
      <AvatarInput />
      <input
        name="username"
        type="text"
        defaultValue={user?.username}
        placeholder="👤 Ingresa tu nombre de usuario"
      />
      <input
        name="email"
        type="email"
        defaultValue={user?.email}
        placeholder="✉️ Ingresa tu correo"
      />
      <SubmitButtons {...{ isLoading, onClose }} />
      {error && <p>{error}</p>}
    </form>
  )
}
