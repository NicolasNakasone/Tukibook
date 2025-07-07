import { FormEvent, useRef, useState } from 'react'

import { Button } from 'src/components/common/Button'
import { AvatarInput } from 'src/components/form/AvatarInput'
import { FileInputHandle } from 'src/components/form/FileInput'
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
  const formRef = useRef<FileInputHandle>(null)
  const [error, setError] = useState('')
  const { user, logoutUser } = useAuth()

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
    const avatarName = (target[0] as HTMLInputElement).files?.[0]?.name
    const username = (target[2] as HTMLInputElement).value
    const email = (target[3] as HTMLInputElement).value

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
        <Button disabled={isLoading} onClick={onClose}>
          Cancelar
        </Button>
      </div>
      {error && <p>{error}</p>}
    </form>
  )
}
