import React from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import AdminPage from "./pages/Adminpage";
import RegisterPage from "./pages/Registerpage";
import Layout from './components/layout/Layout';
import LoginPage from './pages/auth/LoginPage';
import RolesPage from './pages/roles/RolesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={
          <Layout />
        } />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/roles" element={<RolesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
