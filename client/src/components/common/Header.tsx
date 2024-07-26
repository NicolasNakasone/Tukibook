import tukibookLogo from 'public/tuki.webp'
import styles from 'src/components/common/Header.module.css'

export const Header = (): JSX.Element => {
  return (
    <header>
      <div role="heading" className={styles.heading}>
        <h1>Tukibook!</h1>
        <img src={tukibookLogo} alt="Tukibook Logo" className={styles.appLogo} />
      </div>
      <p className={styles.appDescription}>Una red social, tuki 👍</p>
    </header>
  )
}
