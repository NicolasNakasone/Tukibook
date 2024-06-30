import tukibookLogo from 'public/tuki.webp'

export const Header = (): JSX.Element => {
  return (
    <header style={{ display: 'flex' }}>
      <h1>Tukibook!</h1>
      <img src={tukibookLogo} alt="Tukibook Logo" style={{ width: '2rem', height: '2rem' }} />
    </header>
  )
}