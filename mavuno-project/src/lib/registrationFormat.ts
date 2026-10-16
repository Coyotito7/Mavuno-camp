export const MEDICAL_MAX_WORDS = 15

export const PHONE_FORMAT_ERROR_MESSAGE = "Enter a valid phone number"

export const MAX_WORDS_ERROR_MESSAGE = "Maximum 15 words"

export function countWords(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length
}

/** Keeps at most `maxWords` word tokens; preserves partial typing within the limit. */
export function limitToMaxWords(value: string, maxWords: number): string {
  const tokens = [...value.matchAll(/\S+/g)]
  if (tokens.length <= maxWords) return value
  const last = tokens[maxWords - 1]
  if (!last) return value
  return value.slice(0, last.index! + last[0].length)
}

export function isValidKenyaPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "")
  if (digits.length === 0) return false

  if (digits.startsWith("254")) {
    return digits.length === 12 && /^254[17]\d{8}$/.test(digits)
  }

  if (digits.startsWith("0")) {
    return digits.length === 10 && /^0[17]\d{8}$/.test(digits)
  }

  return digits.length === 9 && /^[17]\d{8}$/.test(digits)
}
