// src/components/layout/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import { Route, Routes, Router } from 'react-router-dom';
import ClientesPage from '../../pages/clientes/ClientesPage';
import ArticulosPage from '../../pages/articulos/ArticulosPage';

const Layout = () => {

    return (

        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <Routes>
                <Route path='/clientes' element={<ClientesPage />} />
                <Route path='/articulos' element={<ArticulosPage />} />
            </Routes>
            <footer className="bg-gray-800 text-white py-4 text-center text-sm">
                Sistema de Inventarios © {new Date().getFullYear()}
            </footer>
        </div>
    );
};

export default Layout;