// src/components/layout/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import ClientesPage from '../../pages/clientes/ClientesPage';
import ArticulosPage from '../../pages/articulos/ArticulosPage';
import ClienteDetail from '../../pages/clientes/ClienteDetail';
import NotFoundPage from '../../pages/NotFoundPage';

const Layout = () => {

    return (

        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <Routes>
                <Route path='/clientes' element={<ClientesPage />} />
                <Route path='/articulos' element={<ArticulosPage />} />
                <Route path="/clientes" element={<ClientesPage />} />
                <Route path="/clientes/new" element={<ClienteDetail />} />
                <Route path="/clientes/:id" element={<ClienteDetail />} />
                <Route path="/not-found" element={<NotFoundPage />} />
            </Routes>
            <footer className="bg-gray-800 text-white py-4 text-center text-sm">
                Sistema de Gestores © {new Date().getFullYear()}
            </footer>
        </div>
    );
};

export default Layout;