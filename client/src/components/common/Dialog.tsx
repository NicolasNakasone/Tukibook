import { useEffect, useRef } from 'react'

import { createPortal } from 'react-dom'

const DIALOG_ROOT_ID = 'dialog-root'

interface INewDialog {
  children?: JSX.Element | JSX.Element[]
  open: boolean
  onClose: () => void
}

export const Dialog = ({ children, open, onClose }: INewDialog) => {
  const dialogRootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const dialogRoot = document.getElementById(DIALOG_ROOT_ID)

    if (!dialogRoot) {
      const newDialogRoot = document.createElement('div')
      newDialogRoot.setAttribute('id', DIALOG_ROOT_ID)
      newDialogRoot.style.position = 'fixed'
      newDialogRoot.style.top = '0'
      newDialogRoot.style.width = '100%'
      newDialogRoot.style.height = '100%'
      newDialogRoot.style.display = 'flex'
      newDialogRoot.style.justifyContent = 'center'
      newDialogRoot.style.alignItems = 'center'
      newDialogRoot.style.backgroundColor = '#00000080'
      document.body.appendChild(newDialogRoot)
    }

    return () => {
      dialogRootRef.current = null
    }
  }, [])

  useEffect(() => {
    if (dialogRootRef.current) {
      dialogRootRef.current.style.display = open ? 'flex' : 'none'
    }
  }, [open])

  const handleClose = () => {
    onClose()
  }

  return createPortal(
    <div ref={dialogRootRef}>
      <div
        style={{
          backgroundColor: '#fff',
          width: '30vw',
          minHeight: '20vh',
        }}
      >
        {children}
        <button onClick={handleClose}>Cerrar</button>
      </div>
    </div>,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dialogRootRef.current!
  )
}
