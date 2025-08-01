// src/components/layout/Layout.jsx
import MenuAppBar from './Navbar';

const Layout = ({ children }) => {

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div><MenuAppBar /></div>
            <footer className="bg-gray-800 text-white py-4 text-center text-sm">
                Sistema de Inventarios © {new Date().getFullYear()}
            </footer>
        </div>
    );
};

export default Layout;