import { useState } from 'react'

import tukibookLogo from 'public/tuki.webp'
import { Button } from 'src/components/common/Button'
import { Dialog } from 'src/components/common/Dialog'
import { DeleteUserForm } from 'src/features/users/DeleteUserForm'
import styles from 'src/pages/profile/Profile.module.css'
import { User } from 'tukibook-helper'

interface ProfileUserInfoProps {
  user: User | null
  postCount: number
}

export const ProfileUserInfo = ({ user, postCount }: ProfileUserInfoProps) => {
  const [openDeleteUser, setOpenDeleteUser] = useState(false)

  return (
    <div className={styles.profileUserInfo}>
      <img src={tukibookLogo} alt="Foto de perfil" className={styles.profileUserAvatar} />
      <h2>{user?.username}</h2>
      <p>Posts realizados: {postCount}</p>
      <p>Seguidores: 0</p>
      {/* <p>Total de likes recibidos: 0</p>
      <p>Posts mas relevantes</p>
      <p>Primer post</p>
      <p>Fecha de registro</p> */}
      <Button onClick={() => setOpenDeleteUser(true)}>Borrar cuenta</Button>
      <Dialog open={openDeleteUser} onClose={() => setOpenDeleteUser(false)}>
        <DeleteUserForm />
      </Dialog>
    </div>
  )
}
