import { ButtonHTMLAttributes } from 'react'

import styles from 'src/components/common/Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ ...props }: ButtonProps): JSX.Element => {
  return (
    <button {...props} className={`${styles.button} ${props.className || ''}`}>
      {props.children}
    </button>
  )
}
