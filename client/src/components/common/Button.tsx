import { forwardRef, ButtonHTMLAttributes } from 'react'

import styles from 'src/components/common/Button.module.css'

type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonColor = 'primary' | 'success' | 'error' | 'warning' | 'info'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize
  color?: ButtonColor
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = '', size = 'sm', color = 'primary', ...rest }, ref) => {
    return (
      <button ref={ref} className={`${styles[size]} ${styles[color]} ${className}`} {...rest}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
