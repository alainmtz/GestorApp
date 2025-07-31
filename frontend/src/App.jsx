import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/Adminpage";
import RegisterPage from "./pages/Registerpage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from './components/layout/Layout';
import LoginPage from './pages/auth/LoginPage';
import ClientesPage from './pages/clientes/ClientesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Layout />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/register" element={<RegisterPage />} />
              {/*<Route path="/layout" element={<Layout />} />*/}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/clientes" element={<ClientesPage />} />
              {/* Puedes agregar más rutas aquí */}
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
