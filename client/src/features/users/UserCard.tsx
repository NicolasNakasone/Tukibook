import tukibookLogo from 'public/tuki.webp'
import styles from 'src/features/users/UserCard.module.css'
import { UserPayload } from 'tukibook-helper'

interface UserCardProps {
  user: UserPayload
}

export const UserCard = ({ user }: UserCardProps): JSX.Element => {
  return (
    <div key={user.id} className={styles.userCardContainer}>
      <img
        src={tukibookLogo}
        alt={`Foto de perfil de ${user.username}`}
        className={styles.userCardAvatar}
      />
      <div className={styles.userCardInfo}>
        <p>Nombre: {user.username}</p>
        <p>Correo: {user.email}</p>
      </div>
    </div>
  )
}
