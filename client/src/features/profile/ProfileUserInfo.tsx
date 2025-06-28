import tukibookLogo from 'public/tuki.webp'
import { Button } from 'src/components/common/Button'
import styles from 'src/features/profile/ProfileUserInfo.module.css'
import { DeleteUserModal } from 'src/features/users/DeleteUserModal'
import { useAuth } from 'src/hooks/useAuth.hook'
import { usePosts } from 'src/hooks/usePosts.hook'
import { User } from 'tukibook-helper'

interface ProfileUserInfoProps {
  user: User | null
}

export const ProfileUserInfo = ({ user }: ProfileUserInfoProps) => {
  const { user: loggedUser } = useAuth()
  const { totalItems } = usePosts()

  const isLoggedUser = user?.id === loggedUser?.id

  return (
    <div className={styles.profileUserInfo}>
      <img
        src={user?.avatar?.url || tukibookLogo}
        alt={`Foto de perfil de ${user?.username}`}
        className={styles.profileUserAvatar}
      />
      <h2>{user?.username}</h2>
      <h2>{user?.email}</h2>
      <p>Posts realizados: {totalItems}</p>
      <p>Seguidores: 0</p>
      {/* <p>Total de likes recibidos: 0</p>
      <p>Posts mas relevantes</p>
      <p>Primer post</p>
      <p>Fecha de registro</p> */}
      {isLoggedUser && (
        <>
          <Button
            size="md"
            width="full"
            color="info"
            variant="normal"
            className={styles.deleteUserButton}
          >
            Editar perfil
          </Button>
          <DeleteUserModal />
        </>
      )}
    </div>
  )
}
