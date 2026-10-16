import { cn } from "@/lib/utils"

export const registerFieldInputClass =
  "h-9 w-full rounded-[6px] border border-[#E4E4E7] bg-[#F9FAFB] px-4 py-2 text-sm text-[#18181B] outline-none transition-colors hover:border-[#18181B] focus-visible:border-[#18181B] focus-visible:ring-1 focus-visible:ring-[#18181B]"

export const registerFieldInvalidBorderClass =
  "border-[var(--Colour-destructive,#DC2626)] hover:border-[var(--Colour-destructive,#DC2626)] focus-visible:border-[var(--Colour-destructive,#DC2626)] focus-visible:ring-[var(--Colour-destructive,#DC2626)]"

const registerFieldInputInvalidClass = registerFieldInvalidBorderClass

export function registerFieldInputClasses(invalid?: boolean) {
  return cn(
    registerFieldInputClass,
    invalid && registerFieldInputInvalidClass
  )
}

export const registerMedicalTextareaClass =
  "min-h-[72px] w-full resize-none rounded-[6px] border border-[#E4E4E7] bg-white px-4 py-2 text-sm text-[#18181B] outline-none transition-colors placeholder:text-[#71717A] hover:border-[#18181B] focus-visible:border-[#18181B] focus-visible:ring-1 focus-visible:ring-[#18181B]"

export function registerMedicalTextareaClasses(invalid?: boolean) {
  return cn(
    registerMedicalTextareaClass,
    invalid && registerFieldInputInvalidClass
  )
}
