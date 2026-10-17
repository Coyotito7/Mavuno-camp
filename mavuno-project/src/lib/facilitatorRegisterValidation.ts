import type { FacilitatorFieldErrors } from "@/components/registration/FacilitatorDetailsFrame"
import type { FacilitatorFormState } from "@/components/registration/FacilitatorDetailsFrame"
import {
  countWords,
  isValidEmail,
  isValidKenyaPhone,
  MEDICAL_MAX_WORDS,
} from "@/lib/registrationFormat"
import {
  createEmptyEmergencyContact,
  type EmergencyContactState,
  type EmergencyFieldErrors,
  validateEmergency,
} from "@/lib/myfRegisterValidation"

export {
  createEmptyEmergencyContact,
  type EmergencyContactState,
  type EmergencyFieldErrors,
}

const FACILITATOR_FORM_ID = "facilitator"

function isBlank(value: string) {
  return value.trim().length === 0
}

export function validateFacilitator(
  facilitator: FacilitatorFormState
): FacilitatorFieldErrors {
  const errors: FacilitatorFieldErrors = {}

  if (isBlank(facilitator.firstName)) errors.firstName = true
  if (isBlank(facilitator.lastName)) errors.lastName = true
  if (isBlank(facilitator.age)) errors.age = true
  if (facilitator.gender === null) errors.gender = true
  if (isBlank(facilitator.phone) || !isValidKenyaPhone(facilitator.phone)) {
    errors.phone = true
  }
  if (isBlank(facilitator.email) || !isValidEmail(facilitator.email)) {
    errors.email = true
  }
  if (facilitator.wantsBaptism === null) errors.wantsBaptism = true
  if (isBlank(facilitator.campus)) errors.campus = true
  if (isBlank(facilitator.role)) errors.role = true

  if (facilitator.hasMedicalCondition) {
    if (
      isBlank(facilitator.medicalConditionDetails) ||
      countWords(facilitator.medicalConditionDetails) > MEDICAL_MAX_WORDS
    ) {
      errors.medicalConditionDetails = true
    }
  }

  if (facilitator.hasSpecialNeeds) {
    if (
      isBlank(facilitator.specialNeedsDetails) ||
      countWords(facilitator.specialNeedsDetails) > MEDICAL_MAX_WORDS
    ) {
      errors.specialNeedsDetails = true
    }
  }

  return errors
}

function hasFacilitatorErrors(errors: FacilitatorFieldErrors) {
  return Object.keys(errors).length > 0
}

const FACILITATOR_FIELD_ORDER = [
  "firstName",
  "lastName",
  "age",
  "gender",
  "phone",
  "email",
  "wantsBaptism",
  "campus",
  "role",
  "medicalConditionDetails",
  "specialNeedsDetails",
] as const satisfies readonly (keyof FacilitatorFieldErrors)[]

const EMERGENCY_FIELD_ORDER = [
  "guardianFirstName",
  "guardianLastName",
  "guardianPhone",
  "relationship",
  "mpesaCode",
] as const satisfies readonly (keyof EmergencyFieldErrors)[]

export function facilitatorRegistrationFieldId(
  field: keyof FacilitatorFieldErrors
) {
  return `facilitator-field-${FACILITATOR_FORM_ID}-${field}`
}

export function facilitatorEmergencyFieldId(field: keyof EmergencyFieldErrors) {
  return `facilitator-field-emergency-${field}`
}

function findFirstInvalidFieldId(
  facilitator: FacilitatorFormState,
  emergency: EmergencyContactState,
  mpesaCode: string
): string | null {
  const facilitatorErrors = validateFacilitator(facilitator)
  for (const field of FACILITATOR_FIELD_ORDER) {
    if (facilitatorErrors[field]) {
      return facilitatorRegistrationFieldId(field)
    }
  }

  const emergencyErrors = validateEmergency(emergency, mpesaCode)
  for (const field of EMERGENCY_FIELD_ORDER) {
    if (emergencyErrors[field]) {
      return facilitatorEmergencyFieldId(field)
    }
  }

  return null
}

export function validateFacilitatorRegistration(
  facilitator: FacilitatorFormState,
  emergency: EmergencyContactState,
  mpesaCode: string
) {
  const facilitatorErrors = validateFacilitator(facilitator)
  const emergencyErrors = validateEmergency(emergency, mpesaCode)

  const isValid =
    !hasFacilitatorErrors(facilitatorErrors) &&
    Object.keys(emergencyErrors).length === 0

  const firstInvalidFieldId = isValid
    ? null
    : findFirstInvalidFieldId(facilitator, emergency, mpesaCode)

  return {
    facilitatorErrors,
    emergencyErrors,
    isValid,
    firstInvalidFieldId,
  }
}
