import tukibookLogo from 'public/tuki.webp'
import { useLocation, useNavigate } from 'react-router-dom'
import { routes } from 'src/constants/routes'
import styles from 'src/features/users/UserCard.module.css'
import { User } from 'tukibook-helper'

interface UserCardProps {
  user: User
}

export const UserCard = ({ user }: UserCardProps): JSX.Element => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleCardClick = (e: React.MouseEvent) => {
    if (pathname === routes.userDetail.replace(':id', user.id)) return

    const target = e.target as HTMLElement

    if (target.closest('button') || target.closest('input')) return

    navigate(routes.userDetail.replace(':id', user.id))
  }

  return (
    <div key={user.id} className={styles.userCardContainer} onClick={handleCardClick}>
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
