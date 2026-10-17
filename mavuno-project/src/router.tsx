import { createBrowserRouter } from "react-router"
import CampSelectionPage from "@/pages/CampSelectionPage"
import MyfRegisterPage from "@/pages/MyfRegisterPage"
import MyaRegisterPage from "@/pages/MyaRegisterPage"
import RegisterFacilitatorPage from "@/pages/RegisterFacilitatorPage"
import LoginPage from "@/pages/LoginPage"
import DashboardPage from "@/pages/DashboardPage"
import ReportsPage from "@/pages/ReportsPage"

export const router = createBrowserRouter([
  { path: "/", element: <CampSelectionPage /> },
  { path: "/register/myf", element: <MyfRegisterPage /> },
  { path: "/register/mya", element: <MyaRegisterPage /> },
  { path: "/register-facilitator", element: <RegisterFacilitatorPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/reports", element: <ReportsPage /> },
])
