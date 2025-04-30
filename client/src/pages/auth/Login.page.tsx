import { Link } from 'react-router-dom'
import { Button } from 'src/components/common/Button'

export const LoginPage = (): JSX.Element => {
  return (
    <main
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ margin: '0 0 2rem' }}>Bienvenido a Tukibook 👍!</h1>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input name="email" type="email" placeholder="✉️ Ingresa tu correo" />
        <input name="password" type="password" placeholder="🤫 Ingresa tu contraseña" />
        <Button style={{ margin: '0 0 0 auto' }}>Iniciar sesión</Button>
        <p style={{ margin: '2rem 0 0', textAlign: 'center' }}>
          No tenés cuenta? <Link to="#">Registrate</Link>
        </p>
      </form>
    </main>
  )
}
