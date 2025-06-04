import { forwardRef, ButtonHTMLAttributes, Ref } from 'react'

import { Link, LinkProps } from 'react-router-dom'
import styles from 'src/components/common/Button.module.css'

type ButtonVariant = 'normal' | 'outline' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonColor = 'primary' | 'success' | 'error' | 'warning' | 'info'

interface ButtonCommonProps {
  size?: ButtonSize
  color?: ButtonColor
}

interface ButtonAsButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Exclude<ButtonVariant, 'link'>
}

interface ButtonAsLink extends LinkProps {
  variant: Extract<ButtonVariant, 'link'>
}

type ButtonProps = (ButtonAsButton | ButtonAsLink) & ButtonCommonProps

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    { children, className = '', variant = 'outline', size = 'sm', color = 'primary', ...rest },
    ref
  ) => {
    const classes = `${styles[variant]} ${styles[size]} ${styles[color]} ${className}`

    if (variant === 'link') {
      const linkProps = rest as LinkProps
      return (
        <Link ref={ref as Ref<HTMLAnchorElement>} className={classes} {...linkProps}>
          {children}
        </Link>
      )
    }

    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        type="button"
        className={classes}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
