import { forwardRef, ButtonHTMLAttributes } from 'react'

import styles from 'src/components/common/Button.module.css'

type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize
}

type ButtonStyles = {
  [size in ButtonSize]: string
}

const buttonStyles: ButtonStyles = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = '', size = 'sm', ...rest }, ref) => {
    const currentSize = buttonStyles[size]

    return (
      <button
        ref={ref}
        className={`${styles.button} ${styles[currentSize]} ${className}`}
        {...rest}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
