import tukibookLogo from 'public/tuki.webp'
import { useNavigate } from 'react-router-dom'
import { Button } from 'src/components/common/Button'
import styles from 'src/components/common/Header.module.css'
import { routes } from 'src/constants/routes'
import { useAuth } from 'src/hooks/useAuth.hook'
import { handleLogout } from 'src/utils'

export const Header = (): JSX.Element => {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  return (
    <header>
      <div role="heading" className={styles.heading}>
        <h1>Tukibook!</h1>
        <img src={tukibookLogo} alt="Tukibook Logo" className={styles.appLogo} />
      </div>
      <p className={styles.appDescription}>Una red social, tuki 👍</p>
      <div className={styles.profile}>
        {user?.username && (
          <p>
            Hola <span>{user.username}</span>, disfruta de Tukibook!
          </p>
        )}
        <nav className={styles.navLinks}>
          <Button variant="link" size="md" to={routes.home} className={styles.navLink}>
            🏠 Inicio
          </Button>
          <Button variant="link" size="md" to={routes.profile} className={styles.navLink}>
            👤 Perfil
          </Button>
          <Button size="md" onClick={() => handleLogout(setUser, navigate)}>
            🚪 Cerrar sesión
          </Button>
        </nav>
      </div>
    </header>
  )
}
