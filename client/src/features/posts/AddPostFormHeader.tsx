export const AddPostFormHeader = ({ isLoading }: { isLoading: boolean }): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <div
        style={{
          width: '2.5rem',
          height: '2.5rem',
          backgroundColor: 'CanvasText',
          borderRadius: '50%',
        }}
      />
      <input
        name="username"
        type="text"
        required
        disabled={isLoading}
        placeholder="📝 Tu nombre*"
        style={{ width: '40%', margin: '0' }}
      />
    </div>
  )
}
