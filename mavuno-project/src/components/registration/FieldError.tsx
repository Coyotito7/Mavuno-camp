export const FIELD_ERROR_MESSAGE = "This field needs to be filled"

type FieldErrorProps = {
  show?: boolean
  message?: string
}

export function FieldError({ show, message }: FieldErrorProps) {
  if (!show) return null
  return (
    <p
      className="text-xs font-normal leading-4 text-[#DC2626]"
      role="alert"
    >
      {message ?? FIELD_ERROR_MESSAGE}
    </p>
  )
}
