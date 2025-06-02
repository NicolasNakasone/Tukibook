import { forwardRef, ButtonHTMLAttributes } from 'react'

import styles from 'src/components/common/Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = '', ...rest }, ref) => {
    return (
      <button ref={ref} className={`${styles.button} ${className}`} {...rest}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
