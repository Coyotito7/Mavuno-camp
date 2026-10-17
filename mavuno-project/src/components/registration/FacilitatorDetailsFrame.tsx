import { useState } from "react"
import { ChevronDown } from "lucide-react"
import {
  FIELD_ERROR_MESSAGE,
  FieldError,
} from "@/components/registration/FieldError"
import {
  registerFieldInputClasses,
  registerFieldInvalidBorderClass,
  registerMedicalTextareaClasses,
} from "@/components/registration/registerFieldStyles"
import {
  limitToMaxWords,
  MAX_WORDS_ERROR_MESSAGE,
  MEDICAL_MAX_WORDS,
  PHONE_FORMAT_ERROR_MESSAGE,
} from "@/lib/registrationFormat"
import { facilitatorRegistrationFieldId } from "@/lib/facilitatorRegisterValidation"
import { cn } from "@/lib/utils"

const STUB_CAMPUS_OPTIONS = [
  { value: "hillcity-multipliers", label: "HillCity (Multipliers Network)" },
] as const

const STUB_ROLE_OPTIONS = [{ value: "production", label: "Production" }] as const

const genderToggleClass =
  "inline-flex h-9 items-center justify-center rounded-[6px] border border-[#E4E4E7] bg-white px-4 py-2 text-sm font-medium leading-5 text-[#18181B] transition-transform hover:scale-[1.03] active:scale-100"

const toggleSelectedClass =
  "border-[#18181B] bg-[#18181B] text-white"

const selectChevronClass =
  "pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#71717A]"

const medicalOptionTileClass =
  "flex w-full flex-col gap-4 rounded-2xl border border-[#E4E4E7] bg-[#F9FAFB] p-2 transition-transform transition-colors hover:scale-[1.01] active:scale-100"

const medicalRadioClass =
  "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-[#E4E4E7] bg-white shadow-[0px_1px_2px_0px_#0000000F,0px_1px_3px_0px_#0000001A]"

export type FacilitatorFormState = {
  firstName: string
  lastName: string
  age: string
  phone: string
  email: string
  gender: "male" | "female" | null
  wantsBaptism: boolean | null
  campus: string
  role: string
  hasMedicalCondition: boolean
  medicalConditionDetails: string
  hasSpecialNeeds: boolean
  specialNeedsDetails: string
}

export type FacilitatorFieldErrors = Partial<
  Record<
    | "firstName"
    | "lastName"
    | "age"
    | "gender"
    | "phone"
    | "email"
    | "wantsBaptism"
    | "campus"
    | "role"
    | "medicalConditionDetails"
    | "specialNeedsDetails",
    boolean
  >
>

export function createEmptyFacilitator(): FacilitatorFormState {
  return {
    firstName: "",
    lastName: "",
    age: "",
    phone: "",
    email: "",
    gender: null,
    wantsBaptism: null,
    campus: "",
    role: "",
    hasMedicalCondition: false,
    medicalConditionDetails: "",
    hasSpecialNeeds: false,
    specialNeedsDetails: "",
  }
}

type FacilitatorDetailsFrameProps = {
  facilitator: FacilitatorFormState
  onUpdate: (patch: Partial<FacilitatorFormState>) => void
  showFieldErrors?: boolean
  fieldErrors?: FacilitatorFieldErrors
}

export function FacilitatorDetailsFrame({
  facilitator,
  onUpdate,
  showFieldErrors = false,
  fieldErrors = {},
}: FacilitatorDetailsFrameProps) {
  const show = (key: keyof FacilitatorFieldErrors) =>
    showFieldErrors && Boolean(fieldErrors[key])

  const [medicalOverWordLimit, setMedicalOverWordLimit] = useState(false)
  const [specialNeedsOverWordLimit, setSpecialNeedsOverWordLimit] =
    useState(false)

  function handleMedicalDetailsChange(raw: string) {
    const limited = limitToMaxWords(raw, MEDICAL_MAX_WORDS)
    if (limited !== raw) setMedicalOverWordLimit(true)
    else setMedicalOverWordLimit(false)
    onUpdate({ medicalConditionDetails: limited })
  }

  function handleSpecialNeedsDetailsChange(raw: string) {
    const limited = limitToMaxWords(raw, MEDICAL_MAX_WORDS)
    if (limited !== raw) setSpecialNeedsOverWordLimit(true)
    else setSpecialNeedsOverWordLimit(false)
    onUpdate({ specialNeedsDetails: limited })
  }

  const medicalDetailsInvalid =
    show("medicalConditionDetails") || medicalOverWordLimit
  const specialNeedsDetailsInvalid =
    show("specialNeedsDetails") || specialNeedsOverWordLimit

  const genderInvalid = show("gender")
  const baptismInvalid = show("wantsBaptism")

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-[14px]">
        <div>
          <h2 className="text-lg font-bold leading-7 text-[#18181B]">
            Facilitator details
          </h2>
          <p className="text-sm font-normal leading-5 text-[#71717A]">
            Fill in your details as per your legal documents
          </p>
        </div>

        <div className="flex w-full flex-col gap-4 desktop:max-w-[645px]">
          <div className="grid w-full grid-cols-2 gap-4 tablet:grid-cols-6">
            <label
              id={facilitatorRegistrationFieldId("firstName")}
              className="flex min-w-0 flex-col gap-2 tablet:col-span-2 tablet:col-start-1 tablet:row-start-1"
            >
              <span className="text-sm font-medium leading-5 text-[#18181B]">
                First name
              </span>
              <input
                type="text"
                className={registerFieldInputClasses(show("firstName"))}
                value={facilitator.firstName}
                onChange={(e) => onUpdate({ firstName: e.target.value })}
              />
              <FieldError show={show("firstName")} />
            </label>
            <label
              id={facilitatorRegistrationFieldId("lastName")}
              className="flex min-w-0 flex-col gap-2 tablet:col-span-2 tablet:col-start-3 tablet:row-start-1"
            >
              <span className="text-sm font-medium leading-5 text-[#18181B]">
                Last name
              </span>
              <input
                type="text"
                className={registerFieldInputClasses(show("lastName"))}
                value={facilitator.lastName}
                onChange={(e) => onUpdate({ lastName: e.target.value })}
              />
              <FieldError show={show("lastName")} />
            </label>
            <label
              id={facilitatorRegistrationFieldId("age")}
              className="flex min-w-0 flex-col gap-2 tablet:col-span-2 tablet:col-start-5 tablet:row-start-1"
            >
              <span className="text-sm font-medium leading-5 text-[#18181B]">
                Age
              </span>
              <input
                type="text"
                inputMode="numeric"
                className={registerFieldInputClasses(show("age"))}
                value={facilitator.age}
                onChange={(e) => onUpdate({ age: e.target.value })}
              />
              <FieldError show={show("age")} />
            </label>
            <label
              id={facilitatorRegistrationFieldId("phone")}
              className="flex min-w-0 flex-col gap-2 tablet:col-span-3 tablet:col-start-1 tablet:row-start-2"
            >
              <span className="text-sm font-medium leading-5 text-[#18181B]">
                Phone number
              </span>
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className={registerFieldInputClasses(show("phone"))}
                value={facilitator.phone}
                onChange={(e) => onUpdate({ phone: e.target.value })}
              />
              <FieldError
                show={show("phone")}
                message={
                  show("phone")
                    ? facilitator.phone.trim()
                      ? PHONE_FORMAT_ERROR_MESSAGE
                      : FIELD_ERROR_MESSAGE
                    : undefined
                }
              />
            </label>
            <label
              id={facilitatorRegistrationFieldId("email")}
              className="flex min-w-0 flex-col gap-2 tablet:col-span-3 tablet:col-start-4 tablet:row-start-2"
            >
              <span className="text-sm font-medium leading-5 text-[#18181B]">
                Email address
              </span>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                className={registerFieldInputClasses(show("email"))}
                value={facilitator.email}
                onChange={(e) => onUpdate({ email: e.target.value })}
              />
              <FieldError show={show("email")} />
            </label>
            <div
              id={facilitatorRegistrationFieldId("gender")}
              className="flex min-w-0 flex-col gap-2 tablet:col-span-3 tablet:col-start-1 tablet:row-start-3"
            >
              <span className="text-sm font-medium leading-5 text-[#18181B]">
                Gender
              </span>
              <div className="flex h-9 min-w-0 gap-2">
                <button
                  type="button"
                  aria-pressed={facilitator.gender === "male"}
                  onClick={() => onUpdate({ gender: "male" })}
                  className={cn(
                    genderToggleClass,
                    "w-[65px] shrink-0",
                    facilitator.gender === "male" && toggleSelectedClass,
                    genderInvalid &&
                      facilitator.gender !== "male" &&
                      registerFieldInvalidBorderClass
                  )}
                >
                  Male
                </button>
                <button
                  type="button"
                  aria-pressed={facilitator.gender === "female"}
                  onClick={() => onUpdate({ gender: "female" })}
                  className={cn(
                    genderToggleClass,
                    "w-20 shrink-0",
                    facilitator.gender === "female" && toggleSelectedClass,
                    genderInvalid &&
                      facilitator.gender !== "female" &&
                      registerFieldInvalidBorderClass
                  )}
                >
                  Female
                </button>
              </div>
              <FieldError show={show("gender")} />
            </div>
            <div
              id={facilitatorRegistrationFieldId("wantsBaptism")}
              className="flex min-w-0 flex-col gap-2 tablet:col-span-3 tablet:col-start-4 tablet:row-start-3"
            >
              <span className="text-sm font-medium leading-5 text-[#18181B]">
                Want to be baptised?
              </span>
              <div className="flex h-9 min-w-0 gap-2">
                <button
                  type="button"
                  aria-pressed={facilitator.wantsBaptism === true}
                  onClick={() => onUpdate({ wantsBaptism: true })}
                  className={cn(
                    genderToggleClass,
                    "w-[55px] shrink-0",
                    facilitator.wantsBaptism === true && toggleSelectedClass,
                    baptismInvalid &&
                      facilitator.wantsBaptism !== true &&
                      registerFieldInvalidBorderClass
                  )}
                >
                  Yes
                </button>
                <button
                  type="button"
                  aria-pressed={facilitator.wantsBaptism === false}
                  onClick={() => onUpdate({ wantsBaptism: false })}
                  className={cn(
                    genderToggleClass,
                    "w-[51px] shrink-0",
                    facilitator.wantsBaptism === false && toggleSelectedClass,
                    baptismInvalid &&
                      facilitator.wantsBaptism !== false &&
                      registerFieldInvalidBorderClass
                  )}
                >
                  No
                </button>
              </div>
              <FieldError show={show("wantsBaptism")} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 desktop:max-w-[679px]">
        <div className="flex flex-col gap-1 desktop:max-w-[647px]">
          <h2 className="text-lg font-bold leading-7 text-[#18181B]">
            Church and campus
          </h2>
          <p className="text-sm font-normal leading-5 text-[#71717A]">
            Drives the campus and network breakdowns
          </p>
        </div>

        <label
          id={facilitatorRegistrationFieldId("campus")}
          className="flex w-full flex-col gap-2 desktop:max-w-[647px]"
        >
          <span className="text-sm font-medium leading-5 text-[#18181B]">
            Select campus
          </span>
          <div className="relative">
            <select
              className={cn(
                registerFieldInputClasses(show("campus")),
                "appearance-none pr-11"
              )}
              value={facilitator.campus}
              onChange={(e) => onUpdate({ campus: e.target.value })}
            >
              <option value="" disabled />
              {STUB_CAMPUS_OPTIONS.map((campus) => (
                <option key={campus.value} value={campus.value}>
                  {campus.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className={selectChevronClass}
              strokeWidth={2}
              aria-hidden
            />
          </div>
          <FieldError show={show("campus")} />
        </label>
      </div>

      <div className="flex w-full flex-col gap-4 desktop:max-w-[679px]">
        <div className="flex flex-col gap-1 desktop:max-w-[647px]">
          <h2 className="text-lg font-bold leading-7 text-[#18181B]">
            Facilitator role
          </h2>
          <p className="text-sm font-normal leading-5 text-[#71717A]">
            Input the role you have been assigned
          </p>
        </div>

        <label
          id={facilitatorRegistrationFieldId("role")}
          className="flex w-full flex-col gap-2 desktop:max-w-[647px]"
        >
          <span className="text-sm font-medium leading-5 text-[#18181B]">
            Select role
          </span>
          <div className="relative">
            <select
              className={cn(
                registerFieldInputClasses(show("role")),
                "appearance-none pr-11"
              )}
              value={facilitator.role}
              onChange={(e) => onUpdate({ role: e.target.value })}
            >
              <option value="" disabled />
              {STUB_ROLE_OPTIONS.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className={selectChevronClass}
              strokeWidth={2}
              aria-hidden
            />
          </div>
          <FieldError show={show("role")} />
        </label>
      </div>

      <div className="flex w-full flex-col gap-4">
        <h2 className="text-lg font-bold leading-7 text-[#18181B]">
          Medical and special needs
        </h2>

        <div
          className={cn(
            medicalOptionTileClass,
            facilitator.hasMedicalCondition && "border-[#18181B]"
          )}
        >
          <button
            type="button"
            aria-pressed={facilitator.hasMedicalCondition}
            onClick={() => {
              const next = !facilitator.hasMedicalCondition
              onUpdate({
                hasMedicalCondition: next,
                ...(next ? {} : { medicalConditionDetails: "" }),
              })
              if (!next) setMedicalOverWordLimit(false)
            }}
            className="flex w-full items-start gap-6 text-left"
          >
            <span
              className={cn(
                medicalRadioClass,
                facilitator.hasMedicalCondition && "border-[#18181B]"
              )}
              aria-hidden
            >
              {facilitator.hasMedicalCondition ? (
                <span className="size-2 rounded-full bg-[#18181B]" />
              ) : null}
            </span>
            <span className="flex min-w-0 flex-col gap-1">
              <span className="text-sm font-medium leading-5 text-[#18181B]">
                Medical condition / Severe allergies
              </span>
              <span className="text-sm font-normal leading-5 text-[#71717A]">
                Check if you have acute health conditions requiring medical
                staff awareness.
              </span>
            </span>
          </button>
          {facilitator.hasMedicalCondition ? (
            <label
              id={facilitatorRegistrationFieldId("medicalConditionDetails")}
              className="flex w-full flex-col gap-2"
            >
              <span className="text-sm font-medium leading-5 text-[#18181B]">
                Specify medical condition (15 words)
              </span>
              <textarea
                className={registerMedicalTextareaClasses(medicalDetailsInvalid)}
                placeholder="e.g Asthma, Peanuts allergy, Epilepsy, Diabetes"
                rows={3}
                value={facilitator.medicalConditionDetails}
                onChange={(e) => handleMedicalDetailsChange(e.target.value)}
              />
              <FieldError
                show={medicalDetailsInvalid}
                message={
                  medicalOverWordLimit
                    ? MAX_WORDS_ERROR_MESSAGE
                    : show("medicalConditionDetails")
                      ? FIELD_ERROR_MESSAGE
                      : undefined
                }
              />
            </label>
          ) : null}
        </div>

        <div
          className={cn(
            medicalOptionTileClass,
            facilitator.hasSpecialNeeds && "border-[#18181B]"
          )}
        >
          <button
            type="button"
            aria-pressed={facilitator.hasSpecialNeeds}
            onClick={() => {
              const next = !facilitator.hasSpecialNeeds
              onUpdate({
                hasSpecialNeeds: next,
                ...(next ? {} : { specialNeedsDetails: "" }),
              })
              if (!next) setSpecialNeedsOverWordLimit(false)
            }}
            className="flex w-full items-start gap-6 text-left"
          >
            <span
              className={cn(
                medicalRadioClass,
                facilitator.hasSpecialNeeds && "border-[#18181B]"
              )}
              aria-hidden
            >
              {facilitator.hasSpecialNeeds ? (
                <span className="size-2 rounded-full bg-[#18181B]" />
              ) : null}
            </span>
            <span className="flex min-w-0 flex-col gap-1">
              <span className="text-sm font-medium leading-5 text-[#18181B]">
                Special needs / Accessibility support
              </span>
              <span className="text-sm font-normal leading-5 text-[#71717A]">
                Check if you require physical, sensory, or mobility
                accommodations.
              </span>
            </span>
          </button>
          {facilitator.hasSpecialNeeds ? (
            <label
              id={facilitatorRegistrationFieldId("specialNeedsDetails")}
              className="flex w-full flex-col gap-2"
            >
              <span className="text-sm font-medium leading-5 text-[#18181B]">
                Specify special needs and accommodations (15 words)
              </span>
              <textarea
                className={registerMedicalTextareaClasses(
                  specialNeedsDetailsInvalid
                )}
                placeholder="e.g Deaf, Autism spectrum, Anxiety"
                rows={3}
                value={facilitator.specialNeedsDetails}
                onChange={(e) =>
                  handleSpecialNeedsDetailsChange(e.target.value)
                }
              />
              <FieldError
                show={specialNeedsDetailsInvalid}
                message={
                  specialNeedsOverWordLimit
                    ? MAX_WORDS_ERROR_MESSAGE
                    : show("specialNeedsDetails")
                      ? FIELD_ERROR_MESSAGE
                      : undefined
                }
              />
            </label>
          ) : null}
        </div>
      </div>
    </div>
  )
}
