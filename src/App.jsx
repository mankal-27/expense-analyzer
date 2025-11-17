import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UploadPage from "./pages/UploadPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
//import ReportPage from "./pages/ReportPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to = "/upload" replace />}/>
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  )
}