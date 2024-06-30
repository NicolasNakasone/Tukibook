import tukibookLogo from 'public/tuki.webp'

export const Header = (): JSX.Element => {
  return (
    <header
      style={{
        width: '100%',
        // margin: '0 0 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderBottom: '1px solid CanvasText',
      }}
    >
      <div
        role="heading"
        style={{ margin: '1rem 0 0', display: 'flex', alignItems: 'center', gap: '1rem' }}
      >
        <h1>Tukibook!</h1>
        <img
          src={tukibookLogo}
          alt="Tukibook Logo"
          style={{ width: '2rem', height: '2rem', borderRadius: '0.25rem' }}
        />
      </div>
      <p style={{ margin: '0 0 2rem' }}>Una red social, tuki 👍</p>
    </header>
  )
}
