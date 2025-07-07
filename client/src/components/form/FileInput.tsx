import { ChangeEvent, forwardRef, useRef, useState, useImperativeHandle } from 'react'

import { Button } from 'src/components/common/Button'

export interface FileInputProps {
  inputName?: string
  buttonLabel?: string
  showOptional?: boolean
  isDisabled?: boolean
  onFileSelect?: (file: File) => void
}

export interface FileInputHandle {
  resetFileInput: () => void
}

export const FileInput = forwardRef<FileInputHandle, FileInputProps>(
  (
    {
      buttonLabel = '📷 Agrega una imagen',
      inputName = 'image',
      showOptional,
      isDisabled,
      onFileSelect,
    },
    ref
  ) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isFileSelected, setIsFileSelected] = useState(false)

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      setIsFileSelected(!!file)
      if (file && onFileSelect) onFileSelect(file)
    }

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
