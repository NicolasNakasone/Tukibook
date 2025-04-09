import { ButtonHTMLAttributes } from 'react'

import styles from 'src/components/common/Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ children, className = '', ...rest }: ButtonProps): JSX.Element => {
  return (
    <button className={`${styles.button} ${className}`} {...rest}>
      {children}
    </button>
  )
}
