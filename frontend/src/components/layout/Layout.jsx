// src/components/layout/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar />

                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>

            <footer className="bg-gray-800 text-white py-4 text-center text-sm">
                Sistema de Inventarios © {new Date().getFullYear()}
            </footer>
        </div>
    );
};

export default Layout;