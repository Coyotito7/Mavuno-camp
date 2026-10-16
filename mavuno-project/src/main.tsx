import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"
import { RegistrationToastProvider } from "@/components/registration/RegistrationToastProvider"
import { router } from "./router"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RegistrationToastProvider>
      <RouterProvider router={router} />
    </RegistrationToastProvider>
  </StrictMode>,
)