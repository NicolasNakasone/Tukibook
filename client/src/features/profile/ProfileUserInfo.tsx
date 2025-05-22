import tukibookLogo from 'public/tuki.webp'
import styles from 'src/pages/profile/Profile.module.css'
import { User } from 'tukibook-helper'

interface ProfileUserInfoProps {
  user: User | null
  postCount: number
}

export const ProfileUserInfo = ({ user, postCount }: ProfileUserInfoProps) => {
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
    </div>
  )
}
