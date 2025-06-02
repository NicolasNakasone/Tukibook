import { useEffect, useRef, useState } from 'react'

import { createPortal } from 'react-dom'
import { Button } from 'src/components/common/Button'
import { useFocusTrap } from 'src/hooks/useFocusTrap.hook'

const DIALOG_ROOT_ID = 'dialog-root'

interface DialogProps {
  children?: JSX.Element | JSX.Element[]
  open: boolean
  onClose: () => void
  allowBackdropClose?: boolean
}

export const Dialog = ({
  children,
  open,
  onClose,
  allowBackdropClose = true,
}: DialogProps): JSX.Element | null => {
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
  useFocusTrap({ open, containerRef, onClose })

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
        zIndex: 1000,
      }}
      {...(allowBackdropClose && { onClick: onClose })}
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
        <Button style={{ margin: '1rem 0 1rem auto', display: 'flex' }} onClick={onClose}>
          {/* Cerrar  */}❌
        </Button>
        {children}
      </div>
    </div>,
    dialogRootRef.current
  )
}
