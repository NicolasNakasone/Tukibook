import { useRef, useState } from 'react'

import tukibookLogo from 'public/tuki.webp'
import styles from 'src/components/form/AvatarInput.module.css'
import { FileInput, FileInputHandle, FileInputProps } from 'src/components/form/FileInput'
import { useAuth } from 'src/hooks/useAuth.hook'

export const AvatarInput = ({
  inputName = 'avatar',
  buttonLabel = '+',
  ...rest
}: FileInputProps): JSX.Element => {
  const { user } = useAuth()
  const [previewUrl, setPreviewUrl] = useState('')
  const fileRef = useRef<FileInputHandle>(null)

  const handleFileSelect = (file: File) => {
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  return (
    <div className={styles.avatarInputContainer}>
      <img
        src={previewUrl || user?.avatar?.url || tukibookLogo}
        alt={`Foto de perfil de ${user?.username}`}
        className={styles.avatarImage}
        onClick={() => fileRef.current?.triggerFileSelect()}
      />
      <FileInput
        ref={fileRef}
        {...{ inputName, buttonLabel, ...rest }}
        onFileSelect={handleFileSelect}
      />
    </div>
  )
}
