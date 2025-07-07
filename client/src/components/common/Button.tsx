import { forwardRef, ButtonHTMLAttributes, Ref } from 'react'

import { Link, LinkProps } from 'react-router-dom'
import styles from 'src/components/common/Button.module.css'
import { ButtonLoader } from 'src/components/common/ButtonLoader'

type ButtonVariant = 'normal' | 'outline' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonColor = 'primary' | 'success' | 'error' | 'warning' | 'info'
type ButtonWidth = 'mxcontent' | 'large' | 'xlarge' | 'full'

export interface ButtonCommonProps {
  size?: ButtonSize
  color?: ButtonColor
  width?: ButtonWidth
  isLoading?: boolean
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
    {
      children,
      className = '',
      variant = 'outline',
      size = 'sm',
      color = 'primary',
      width = 'mxcontent',
      isLoading = false,
      ...rest
    },
    ref
  ) => {
    const classes = `${styles[variant]} ${styles[size]} ${styles[width]} ${styles[color]} ${className}`

    if (variant === 'link') {
      const linkProps = rest as ButtonAsLink
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
        {...(rest as ButtonAsButton)}
      >
        {children} {isLoading && <ButtonLoader />}
      </button>
    )
  }
)

Button.displayName = 'Button'
