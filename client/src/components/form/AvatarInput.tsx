import { forwardRef } from 'react'

import tukibookLogo from 'public/tuki.webp'
import styles from 'src/components/form/AvatarInput.module.css'
import { FileInput, FileInputHandle, FileInputProps } from 'src/components/form/FileInput'
import { useAuth } from 'src/hooks/useAuth.hook'

export const AvatarInput = forwardRef<FileInputHandle, FileInputProps>(
  ({ inputName = 'avatar', buttonLabel = '+', ...rest }, ref): JSX.Element => {
    const { user } = useAuth()

    return (
      <div className={styles.avatarInputContainer}>
        <img
          src={user?.avatar?.url || tukibookLogo}
          alt={`Foto de perfil de ${user?.username}`}
          className={styles.avatarImage}
        />
        <FileInput ref={ref} {...{ inputName, buttonLabel, rest }} />
      </div>
    )
  }
)

AvatarInput.displayName = 'AvatarInput'
