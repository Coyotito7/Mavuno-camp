export function scrollToRegistrationField(elementId: string) {
  requestAnimationFrame(() => {
    const el = document.getElementById(elementId)
    if (!el) return

    el.scrollIntoView({ behavior: "smooth", block: "center" })

    const focusTarget =
      el instanceof HTMLInputElement ||
      el instanceof HTMLSelectElement ||
      el instanceof HTMLTextAreaElement
        ? el
        : el.querySelector<HTMLElement>(
            "input, select, textarea, button[type='button']"
          )

    focusTarget?.focus({ preventScroll: true })
  })
}
