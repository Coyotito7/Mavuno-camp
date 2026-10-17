/* Format a Kenyan phone number for display. */
export function formatPhone(input: string | null | undefined): string {
  if (!input) return ""
  const digits = input.replace(/\D/g, "")

  // 0712 345 678  (local, 10 digits starting with 0)
  if (digits.length === 10 && digits.startsWith("0")) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`
  }

  // 254712345678  (international, 12 digits starting with 254)
  if (digits.length === 12 && digits.startsWith("254")) {
    return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`
  }

  // 712345678  (9 digits, no country code)
  if (digits.length === 9 && digits.startsWith("7")) {
    return `0${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
  }

  // Anything else — return as-is so we don't hide the truth
  return input
}

/* Normalize a phone number to +2547XXXXXXXX format for storage.
   Returns null if the input doesn't look like a valid Kenyan number. */
export function normalizePhone(input: string | null | undefined): string | null {
  if (!input) return null
  const digits = input.replace(/\D/g, "")

  if (digits.length === 10 && digits.startsWith("0")) {
    return `+254${digits.slice(1)}`
  }
  if (digits.length === 12 && digits.startsWith("254")) {
    return `+${digits}`
  }
  if (digits.length === 9 && digits.startsWith("7")) {
    return `+254${digits}`
  }

  return null
}