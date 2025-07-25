// src/components/layout/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();

    const menuItems = [
        { path: '/', label: 'Dashboard', icon: '📊', exact: true },
        { path: '/clientes', label: 'Clientes', icon: '👥' },
        { path: '/articulos', label: 'Artículos', icon: '📦' },
        { path: '/cajas', label: 'Cajas', icon: '🧰' },
        { path: '/proveedores', label: 'Proveedores', icon: '🏭' },
    ];

    const adminItems = user?.role === 'ADMIN' ? [
        { path: '/usuarios', label: 'Usuarios', icon: '👤' },
        { path: '/configuracion', label: 'Configuración', icon: '⚙️' }
    ] : [];

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                className="md:hidden fixed top-4 right-4 z-50 bg-gray-800 p-2 rounded text-white"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? '✕' : '☰'}
            </button>

            {/* Sidebar */}
            <div className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                        <div>
                            <h3 className="font-bold">{user?.name || 'Usuario'}</h3>
                            <p className="text-sm text-gray-400">{user?.email || 'correo@ejemplo.com'}</p>
                        </div>
                    </div>
                </div>

                <nav className="mt-4">
                    <ul className="space-y-1">
                        {[...menuItems, ...adminItems].map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    end={item.exact}
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-3 transition ${isActive
                                            ? 'bg-blue-600 text-white'
                                            : 'hover:bg-gray-700'
                                        }`
                                    }
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className="mr-3 text-xl">{item.icon}</span>
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Overlay para móviles */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;