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
  const dialogRootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let dialogRoot = document.getElementById(DIALOG_ROOT_ID) as HTMLDivElement | null

    if (!dialogRoot) {
      dialogRoot = document.createElement('div')
      dialogRoot.setAttribute('id', DIALOG_ROOT_ID)
      document.body.appendChild(dialogRoot)
    }

    dialogRootRef.current = dialogRoot
    setIsMounted(true)

    return () => {
      setIsMounted(false)
    }
  }, [])

  if (!isMounted || !dialogRootRef.current || !open) return null

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 999,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#00000080',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '1rem',
          minWidth: '300px',
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
