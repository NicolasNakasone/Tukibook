import { useState } from 'react'

import { Button } from 'src/components/common/Button'
import { Dialog } from 'src/components/common/Dialog'
import { DeleteUserForm } from 'src/features/users/DeleteUserForm'

export const DeleteUserModal = (): JSX.Element => {
  const [openDeleteUser, setOpenDeleteUser] = useState(false)

  const closeOpenDeleteUser = () => setOpenDeleteUser(false)

  return (
    <>
      <Button
        size="md"
        width="full"
        color="error"
        variant="normal"
        onClick={() => setOpenDeleteUser(true)}
      >
        Borrar cuenta
      </Button>
      <Dialog open={openDeleteUser} allowBackdropClose={false} onClose={closeOpenDeleteUser}>
        <DeleteUserForm onClose={closeOpenDeleteUser} />
      </Dialog>
    </>
  )
}
