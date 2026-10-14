import { createBrowserRouter } from "react-router"
import CampSelectionPage from "@/pages/CampSelectionPage"
import RegisterPage from "@/pages/RegisterPage"
import RegisterFacilitatorPage from "@/pages/RegisterFacilitatorPage"
import LoginPage from "@/pages/LoginPage"
import DashboardPage from "@/pages/DashboardPage"
import ReportsPage from "@/pages/ReportsPage"

export const router = createBrowserRouter([
  { path: "/", element: <CampSelectionPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/register-facilitator", element: <RegisterFacilitatorPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/reports", element: <ReportsPage /> },
])