import { useState } from 'react'

import { Button } from 'src/components/common/Button'
import { Dialog } from 'src/components/common/Dialog'
import styles from 'src/features/profile/ProfileUserInfo.module.css'
import { EditUserForm } from 'src/features/users/EditUserForm'

export const EditUserModal = (): JSX.Element => {
  const [openEditUser, setOpenEditUser] = useState(false)

  const closeOpenEditUser = () => setOpenEditUser(false)

  return (
    <>
      <Button
        size="md"
        width="full"
        color="info"
        variant="normal"
        className={styles.deleteUserButton}
        onClick={() => setOpenEditUser(true)}
      >
        Editar perfil
      </Button>
      <Dialog open={openEditUser} allowBackdropClose={false} onClose={closeOpenEditUser}>
        <EditUserForm onClose={closeOpenEditUser} />
      </Dialog>
    </>
  )
}
