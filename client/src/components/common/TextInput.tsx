import { useState } from 'react'

interface TextInputProps {
  placeholder?: string | undefined
}

// Test para probar si podia lograr el efecto del label en la esquina como los inputs de MUI
// PD: Se logro, faltan detalles pero funciona
export const TextInput = ({ placeholder }: TextInputProps): JSX.Element => {
  const [isClicked, setIsClicked] = useState(false)

  return (
    <div
      style={{
        width: '40%',
        height: 'max-content',
        position: 'relative',
      }}
      onClick={() => setIsClicked(true)}
      onBlur={() => setIsClicked(false)}
    >
      {isClicked && (
        <label
          style={{
            padding: '0.25rem',
            // border: '1px solid red',
            position: 'absolute',
            top: '-40%',
            left: '2%',
            backgroundColor: 'Canvas',
            fontSize: '0.875rem',
          }}
        >
          {placeholder}
        </label>
      )}
      <input
        type="text"
        placeholder={!isClicked ? placeholder : ''}
        style={{ width: '100%', margin: '0' }}
      />
    </div>
  )
}
