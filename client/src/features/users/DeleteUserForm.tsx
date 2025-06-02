import { FormEvent } from 'react'

import { useNavigate } from 'react-router-dom'
import { Button } from 'src/components/common/Button'
import { PasswordInput } from 'src/components/form/PasswordInput'
import { handleFetch } from 'src/constants/api'
import { routes } from 'src/constants/routes'
import { useAuth } from 'src/hooks/useAuth.hook'
import { handleLogout } from 'src/utils'

const { VITE_API_URL } = import.meta.env

export const DeleteUserForm = (): JSX.Element => {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  const handleDeleteUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const target = e.target as HTMLFormElement
    const password = target[0] as HTMLInputElement

    const deleteUser = await handleFetch(
      `${VITE_API_URL}${routes.deleteUser.replace(':id', user?.id || '')}`,
      {
        method: 'POST',
        body: JSON.stringify({ password: password.value }),
        credentials: 'include',
      }
    )

    const response = await deleteUser.json()

    if (response.user.id) {
      await handleLogout(setUser, navigate)
    }
  }

  return (
    <form
      style={{ margin: '1rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}
      onSubmit={handleDeleteUser}
    >
      <p>Ingresá tu contraseña para confirmar que eliminas tu cuenta</p>
      <PasswordInput inputProps={{ placeholder: '🤫 Confirmá con tu contraseña' }} />
      <Button>Confirmar</Button>
    </form>
  )
}
