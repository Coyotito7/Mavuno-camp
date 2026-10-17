"use client"

/**
 * Form Field Label Primitive (`app/components/ui/label.tsx`)
 *
 * Full-Stack UI Architecture:
 * Provides an accessible `<label>` element that links with form inputs, radio items,
 * and checkboxes. Supports disabled peer styling (`peer-disabled`) and unselectable text.
 */

import * as React from "react"
import { cn } from "cn"

/**
 * Form Label Component (`Label`)
 *
 * @param {React.ComponentProps<"label">} props - Standard HTML label attributes (`htmlFor`, etc.).
 * @returns {JSX.Element} Accessible form label element.
 */
function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }

