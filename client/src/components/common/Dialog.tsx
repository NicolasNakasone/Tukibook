import { useEffect, useRef, useState } from 'react'

import { createPortal } from 'react-dom'

const DIALOG_ROOT_ID = 'dialog-root'

interface DialogProps {
  children?: JSX.Element | JSX.Element[]
  open: boolean
  onClose: () => void
}

export const Dialog = ({ children, open, onClose }: DialogProps): JSX.Element | null => {
  const [isMounted, setIsMounted] = useState(false)
  const dialogRootRef = useRef<HTMLElement | null>(null)

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
      onClick={onClose}
    >
      <div
        style={{
          minWidth: '300px',
          padding: '1rem',
          backgroundColor: '#fff',
          borderRadius: '8px',
        }}
        onClick={e => e.stopPropagation()}
      >
        {children}
        <button style={{ marginTop: '1rem' }} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>,
    dialogRootRef.current
  )
}
