import { ChangeEvent, forwardRef, useRef, useState, useImperativeHandle } from 'react'

import { Button } from 'src/components/common/Button'

interface FileInputProps {
  inputName?: string
  buttonLabel?: string
  showOptional?: boolean
  isDisabled?: boolean
}

export interface FileInputHandle {
  resetFileInput: () => void
}

export const FileInput = forwardRef<FileInputHandle, FileInputProps>(
  (
    { buttonLabel = '📷 Agrega una imagen', inputName = 'image', showOptional, isDisabled },
    ref
  ) => {
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
          disabled={isDisabled}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <Button disabled={isDisabled} onClick={triggerFileSelect}>
          {buttonLabel}
        </Button>
        {showOptional && <span>{isFileSelected ? '✅ Imagen subida' : '(Opcional)'}</span>}
      </div>
    )
  }
)

FileInput.displayName = 'FileInput'
