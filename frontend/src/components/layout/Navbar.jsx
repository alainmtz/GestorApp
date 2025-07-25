// src/components/layout/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="font-bold text-xl flex items-center">
                        <span className="mr-2">📦</span> Sistema de Inventarios
                    </Link>

                    <div className="hidden md:flex space-x-4">
                        <Link to="/clientes" className="hover:text-blue-300 transition">Clientes</Link>
                        <Link to="/articulos" className="hover:text-blue-300 transition">Artículos</Link>
                        <Link to="/cajas" className="hover:text-blue-300 transition">Cajas</Link>
                        <Link to="/proveedores" className="hover:text-blue-300 transition">Proveedores</Link>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <span className="text-sm hidden md:block">Bienvenido, {user.name || user.email}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition"
                            >
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded transition">
                            Iniciar Sesión
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;