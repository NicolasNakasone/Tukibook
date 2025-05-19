import { useRef } from 'react'

import { Button } from 'src/components/common/Button'

interface CustomFileInputProps {
  inputName?: string
  buttonLabel?: string
  showOptional?: boolean
}

export const FileInput = ({
  buttonLabel = '📷 Agrega una imagen',
  inputName = 'image',
  showOptional,
}: CustomFileInputProps): JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {}

  const triggerFileSelect = () => fileInputRef.current?.click()

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        name={inputName}
        accept="image/*"
        style={{ display: 'none' }}
        // onChange={handleFileChange}
      />
      <Button type="button" onClick={triggerFileSelect}>
        {buttonLabel}
      </Button>
      {showOptional && (
        <span> {`${fileInputRef.current?.value ? '✅ Imagen subida' : '(Opcional)'}`}</span>
      )}
    </div>
  )
}
