import { useNavigate } from 'react-router-dom'
import { Button } from 'src/components/common/Button'
import styles from 'src/components/common/GoBackButton.module.css'

interface GoBackButtonProps {
  title?: string
}

export const GoBackButton = ({ title = '⬅️ Atrás' }: GoBackButtonProps): JSX.Element => {
  const navigate = useNavigate()

  return (
    <Button className={styles.goBackButton} onClick={() => navigate(-1)}>
      {title}
    </Button>
  )
}
