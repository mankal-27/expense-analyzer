import { BrowserRouter, Routes, Route, Navigate, HashRouter } from "react-router-dom";
import UploadPage from "./pages/UploadPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
//import ReportPage from "./pages/ReportPage.jsx";

export default function App() {
  return (
   <HashRouter>
  <Routes>
    <Route path="/" element={<UploadPage />} />
    <Route path="/dashboard" element={<DashboardPage />} />
  </Routes>
</HashRouter>
  )
}