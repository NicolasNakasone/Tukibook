import { Button, ButtonCommonProps } from 'src/components/common/Button'

interface SubmitButtonsProps {
  isLoading: boolean
  onClose: () => void
  color?: ButtonCommonProps['color']
}

export const SubmitButtons = ({
  isLoading,
  onClose,
  color = 'primary',
}: SubmitButtonsProps): JSX.Element => {
  return (
    <div style={{ margin: '1rem 0 0 auto', display: 'flex', gap: '0.75rem' }}>
      <Button color={color} type="submit" isLoading={isLoading} disabled={isLoading}>
        Confirmar
      </Button>
      <Button variant="normal" disabled={isLoading} onClick={onClose}>
        Cancelar
      </Button>
    </div>
  )
}
