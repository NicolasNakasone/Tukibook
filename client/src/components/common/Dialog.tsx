import { useEffect, useRef, useState } from 'react'

import { createPortal } from 'react-dom'
import { Button } from 'src/components/common/Button'

const DIALOG_ROOT_ID = 'dialog-root'

interface DialogProps {
  children?: JSX.Element | JSX.Element[]
  open: boolean
  onClose: () => void
}

export const Dialog = ({ children, open, onClose }: DialogProps): JSX.Element | null => {
  const [isMounted, setIsMounted] = useState(false)
  const dialogRootRef = useRef<HTMLElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let dialogRoot = document.getElementById(DIALOG_ROOT_ID)

    if (!dialogRoot) {
      dialogRoot = document.createElement('div')
      dialogRoot.setAttribute('id', DIALOG_ROOT_ID)
      document.body.appendChild(dialogRoot)
    }

    dialogRootRef.current = dialogRoot
    setIsMounted(true)

    return () => setIsMounted(false)
  }, [])

  // Focus trap: evita que el foco salga de Dialog al tabular
  useEffect(() => {
    if (!open || !containerRef.current) return

    document.body.style.overflow = 'hidden'

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
        onClose()
      }
    }

    first?.focus()
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!isMounted || !open || !dialogRootRef.current) return null

  return createPortal(
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#00000080',
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        ref={containerRef}
        style={{
          minWidth: '300px',
          padding: '1.5rem',
          backgroundColor: 'Canvas',
          border: '1px solid CanvasText',
          borderRadius: '0.25rem',
        }}
        onClick={e => e.stopPropagation()}
      >
        <Button style={{ margin: '1rem 0 0 auto', display: 'flex' }} onClick={onClose}>
          {/* Cerrar */}❌
        </Button>
        {children}
      </div>
    </div>,
    dialogRootRef.current
  )
}
