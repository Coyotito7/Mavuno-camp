import type { CamperFieldErrors } from "@/components/registration/CamperDetailsFrame"
import type { CamperFormState } from "@/components/registration/CamperDetailsFrame"
import {
  countWords,
  isValidKenyaPhone,
  MEDICAL_MAX_WORDS,
} from "@/lib/registrationFormat"

export type EmergencyContactState = {
  guardianFirstName: string
  guardianLastName: string
  guardianPhone: string
  relationship: string
}

export function createEmptyEmergencyContact(): EmergencyContactState {
  return {
    guardianFirstName: "",
    guardianLastName: "",
    guardianPhone: "",
    relationship: "",
  }
}

export type EmergencyFieldErrors = Partial<
  Record<
    keyof EmergencyContactState | "mpesaCode",
    boolean
  >
>

function isBlank(value: string) {
  return value.trim().length === 0
}

export function validateCamper(camper: CamperFormState): CamperFieldErrors {
  const errors: CamperFieldErrors = {}

  if (isBlank(camper.firstName)) errors.firstName = true
  if (isBlank(camper.lastName)) errors.lastName = true
  if (isBlank(camper.age)) errors.age = true
  if (camper.gender === null) errors.gender = true
  if (isBlank(camper.phone) || !isValidKenyaPhone(camper.phone)) {
    errors.phone = true
  }
  if (camper.wantsBaptism === null) errors.wantsBaptism = true

  if (camper.fromMavuno) {
    if (isBlank(camper.campus)) errors.campusOrChurch = true
  } else if (isBlank(camper.otherChurch)) {
    errors.campusOrChurch = true
  }

  if (camper.hasMedicalCondition) {
    if (
      isBlank(camper.medicalConditionDetails) ||
      countWords(camper.medicalConditionDetails) > MEDICAL_MAX_WORDS
    ) {
      errors.medicalConditionDetails = true
    }
  }

  if (camper.hasSpecialNeeds) {
    if (
      isBlank(camper.specialNeedsDetails) ||
      countWords(camper.specialNeedsDetails) > MEDICAL_MAX_WORDS
    ) {
      errors.specialNeedsDetails = true
    }
  }

  return errors
}

export function validateEmergency(
  emergency: EmergencyContactState,
  mpesaCode: string
): EmergencyFieldErrors {
  const errors: EmergencyFieldErrors = {}

  if (isBlank(emergency.guardianFirstName)) errors.guardianFirstName = true
  if (isBlank(emergency.guardianLastName)) errors.guardianLastName = true
  if (
    isBlank(emergency.guardianPhone) ||
    !isValidKenyaPhone(emergency.guardianPhone)
  ) {
    errors.guardianPhone = true
  }
  if (isBlank(emergency.relationship)) errors.relationship = true
  if (isBlank(mpesaCode)) errors.mpesaCode = true

  return errors
}

export function hasCamperErrors(errors: CamperFieldErrors) {
  return Object.keys(errors).length > 0
}

export function hasEmergencyErrors(errors: EmergencyFieldErrors) {
  return Object.keys(errors).length > 0
}

const CAMPER_FIELD_ORDER = [
  "firstName",
  "lastName",
  "age",
  "gender",
  "phone",
  "wantsBaptism",
  "campusOrChurch",
  "medicalConditionDetails",
  "specialNeedsDetails",
] as const satisfies readonly (keyof CamperFieldErrors)[]

const EMERGENCY_FIELD_ORDER = [
  "guardianFirstName",
  "guardianLastName",
  "guardianPhone",
  "relationship",
  "mpesaCode",
] as const satisfies readonly (keyof EmergencyFieldErrors)[]

export function myfRegistrationFieldId(
  camperId: string,
  field: keyof CamperFieldErrors
) {
  return `myf-field-${camperId}-${field}`
}

export function myfEmergencyFieldId(field: keyof EmergencyFieldErrors) {
  return `myf-field-emergency-${field}`
}

export function findFirstInvalidFieldId(
  campers: CamperFormState[],
  emergency: EmergencyContactState,
  mpesaCode: string
): string | null {
  for (const camper of campers) {
    const errors = validateCamper(camper)
    for (const field of CAMPER_FIELD_ORDER) {
      if (errors[field]) {
        return myfRegistrationFieldId(camper.id, field)
      }
    }
  }

  const emergencyErrors = validateEmergency(emergency, mpesaCode)
  for (const field of EMERGENCY_FIELD_ORDER) {
    if (emergencyErrors[field]) {
      return myfEmergencyFieldId(field)
    }
  }

  return null
}

export function validateMyfRegistration(
  campers: CamperFormState[],
  emergency: EmergencyContactState,
  mpesaCode: string
) {
  const camperErrorsById: Record<string, CamperFieldErrors> = {}
  for (const camper of campers) {
    const errors = validateCamper(camper)
    if (hasCamperErrors(errors)) {
      camperErrorsById[camper.id] = errors
    }
  }

  const emergencyErrors = validateEmergency(emergency, mpesaCode)

  const isValid =
    Object.keys(camperErrorsById).length === 0 &&
    !hasEmergencyErrors(emergencyErrors)

  const firstInvalidFieldId = isValid
    ? null
    : findFirstInvalidFieldId(campers, emergency, mpesaCode)

  return { camperErrorsById, emergencyErrors, isValid, firstInvalidFieldId }
}
