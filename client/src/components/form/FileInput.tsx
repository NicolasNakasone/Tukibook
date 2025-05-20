import { ChangeEvent, forwardRef, useRef, useState, useImperativeHandle } from 'react'

import { Button } from 'src/components/common/Button'

interface CustomFileInputProps {
  inputName?: string
  buttonLabel?: string
  showOptional?: boolean
}

export interface FileInputHandle {
  resetFileInput: () => void
}

export const FileInput = forwardRef<FileInputHandle, CustomFileInputProps>(
  ({ buttonLabel = '📷 Agrega una imagen', inputName = 'image', showOptional }, ref) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isFileSelected, setIsFileSelected] = useState(false)

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) =>
      setIsFileSelected(!!e.target.files?.[0])

    const triggerFileSelect = () => fileInputRef.current?.click()

    useImperativeHandle(ref, () => ({
      resetFileInput: () => {
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
          setIsFileSelected(false)
        }
      },
    }))

    return (
      <div>
        <input
          ref={fileInputRef}
          type="file"
          name={inputName}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <Button type="button" onClick={triggerFileSelect}>
          {buttonLabel}
        </Button>
        {showOptional && <span>{isFileSelected ? '✅ Imagen subida' : '(Opcional)'}</span>}
      </div>
    )
  }
)

FileInput.displayName = 'FileInput'
