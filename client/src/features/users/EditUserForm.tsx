import { FormEvent, useRef, useState } from 'react'

import { Button } from 'src/components/common/Button'
import { AvatarInput } from 'src/components/form/AvatarInput'
import { FileInputHandle } from 'src/components/form/FileInput'
import { SubmitButtons } from 'src/components/form/SubmitButtons'
import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import { ChangePasswordForm } from 'src/features/auth/ChangePasswordForm'
import { useAuth } from 'src/hooks/useAuth.hook'
import { useIsLoading } from 'src/hooks/useIsLoading.hook'
import { User } from 'tukibook-helper'

const { VITE_API_URL } = import.meta.env

interface EditUserFormProps {
  onClose: () => void
}

export const EditUserForm = ({ onClose }: EditUserFormProps): JSX.Element => {
  const { isLoading, handleIsLoading } = useIsLoading()
  const formRef = useRef<FileInputHandle>(null)
  const [error, setError] = useState('')
  const { user, logoutUser } = useAuth()

  const [showChangePassword, setShowChangePassword] = useState(false)

  const editUser = async (id: string, payload: FormData) =>
    await handleFetch<User>(`${VITE_API_URL}${routes.editUser.replace(':id', id)}`, {
      method: 'PUT',
      body: payload,
    })

  const handleEditUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setShowChangePassword(false)
    handleIsLoading(true)

    const target = e.target as HTMLFormElement

    const avatarName = (target.querySelector('input[name="avatar"]') as HTMLInputElement)
      .files?.[0]?.name
    const username = (target.querySelector('input[name="username"]') as HTMLInputElement).value
    const email = (target.querySelector('input[name="email"]') as HTMLInputElement).value

    // No hay value o los valores no se modificaron
    if (
      !avatarName &&
      ((!username && !email) || (username === user?.username && email === user?.email))
    ) {
      handleIsLoading(false)
      return setError('No hay datos para actualizar')
    }

    const formData = new FormData(e.currentTarget)
    const { data, error } = await editUser(user?.id || '', formData)

    handleIsLoading(false)

    if (error) return setError(error.message)

    if (data) {
      target.reset()
      formRef.current?.resetFileInput()

      await logoutUser()
    }
  }

  return (
    <form
      style={{ margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '2rem' }}
      onSubmit={handleEditUser}
    >
      <p>Modificá tus datos e inicia sesión nuevamente</p>
      <AvatarInput ref={formRef} />
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
      <hr style={{ opacity: '0.5' }} />
      <Button
        onClick={() => setShowChangePassword(prev => !prev)}
      >{`${showChangePassword ? 'Ocultar' : 'Mostrar'} cambiar contraseña`}</Button>
      {showChangePassword && <ChangePasswordForm {...{ onClose }} />}
    </form>
  )
}
