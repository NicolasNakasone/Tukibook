import { useState } from 'react'

import tukibookLogo from 'public/tuki.webp'
import { Button } from 'src/components/common/Button'
import { Dialog } from 'src/components/common/Dialog'
import styles from 'src/features/profile/ProfileUserInfo.module.css'
import { DeleteUserForm } from 'src/features/users/DeleteUserForm'
import { useAuth } from 'src/hooks/useAuth.hook'
import { usePosts } from 'src/hooks/usePosts.hook'

export const ProfileUserInfo = () => {
  const { user } = useAuth()
  const { totalItems } = usePosts()

  const [openDeleteUser, setOpenDeleteUser] = useState(false)

  const closeOpenDeleteUser = () => setOpenDeleteUser(false)

  return (
    <div className={styles.profileUserInfo}>
      <img src={tukibookLogo} alt="Foto de perfil" className={styles.profileUserAvatar} />
      <h2>{user?.username}</h2>
      <h2>{user?.email}</h2>
      <p>Posts realizados: {totalItems}</p>
      <p>Seguidores: 0</p>
      {/* <p>Total de likes recibidos: 0</p>
      <p>Posts mas relevantes</p>
      <p>Primer post</p>
      <p>Fecha de registro</p> */}
      <Button
        size="md"
        width="full"
        color="error"
        variant="normal"
        className={styles.deleteUserButton}
        onClick={() => setOpenDeleteUser(true)}
      >
        Borrar cuenta
      </Button>
      <Dialog open={openDeleteUser} allowBackdropClose={false} onClose={closeOpenDeleteUser}>
        <DeleteUserForm onClose={closeOpenDeleteUser} />
      </Dialog>
    </div>
  )
}
