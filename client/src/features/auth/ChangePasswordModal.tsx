import { useState } from 'react'

import { Button } from 'src/components/common/Button'
import { Dialog } from 'src/components/common/Dialog'
import { ChangePasswordForm } from 'src/features/auth/ChangePasswordForm'

export const ChangePasswordModal = (): JSX.Element => {
  const [openChangePassword, setOpenChangePassword] = useState(false)

  const closeOpenChangePassword = () => setOpenChangePassword(false)

  return (
    <>
      <Button
        size="md"
        width="full"
        color="info"
        variant="normal"
        onClick={() => setOpenChangePassword(true)}
      >
        Cambiar contraseña
      </Button>
      <Dialog
        open={openChangePassword}
        allowBackdropClose={false}
        onClose={closeOpenChangePassword}
      >
        <ChangePasswordForm onClose={closeOpenChangePassword} />
      </Dialog>
    </>
  )
}
