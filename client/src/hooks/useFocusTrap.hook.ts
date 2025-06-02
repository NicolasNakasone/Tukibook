import { MutableRefObject, useEffect } from 'react'

interface UseFocusTrapProps {
  open: boolean
  containerRef: MutableRefObject<HTMLElement | null>
  onClose?: () => void
  avoidScroll?: boolean
}

export const useFocusTrap = ({ open, containerRef, onClose, avoidScroll }: UseFocusTrapProps) => {
  useEffect(() => {
    if (!open || !containerRef.current) return

    avoidScroll && (document.body.style.overflow = 'hidden')

    const focusableSelectors =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

    const focusableElements = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
    )

    const first = focusableElements[0]
    const last = focusableElements[focusableElements.length - 1]

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last?.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first?.focus()
          }
        }
      } else if (e.key === 'Escape') {
        onClose?.()
      }
    }

    first?.focus()
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      avoidScroll && (document.body.style.overflow = '')
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])
}
