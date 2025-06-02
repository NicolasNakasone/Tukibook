import { forwardRef, ButtonHTMLAttributes } from 'react'

import styles from 'src/components/common/Button.module.css'

type ButtonVariant = 'normal' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonColor = 'primary' | 'success' | 'error' | 'warning' | 'info'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  color?: ButtonColor
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className = '', variant = 'outline', size = 'sm', color = 'primary', ...rest },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`${styles[variant]} ${styles[size]} ${styles[color]} ${className}`}
        {...rest}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
