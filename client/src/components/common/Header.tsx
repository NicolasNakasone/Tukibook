import tukibookLogo from 'public/tuki.webp'
import { useNavigate } from 'react-router-dom'
import { Button } from 'src/components/common/Button'
import styles from 'src/components/common/Header.module.css'
import { routes } from 'src/constants/routes'
import { useAuth } from 'src/hooks/useAuth.hook'

export const Header = (): JSX.Element => {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    setUser(null)
    navigate(routes.login)
  }

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
        <Button onClick={handleLogout}>Cerrar sesión</Button>
      </div>
    </header>
  )
}
