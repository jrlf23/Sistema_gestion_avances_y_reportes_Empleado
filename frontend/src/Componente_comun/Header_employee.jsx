import React, { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { NavLink, useNavigate } from 'react-router-dom';


export const Header_employee = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Actualiza el estado de autenticación cuando cambia el token
    useEffect(() => {
    const token = localStorage.getItem("authToken");
        setIsLoggedIn(!!token);
    }, []);


    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
        setMenuOpen(false);
        navigate("/"); // Redirige al inicio tras cerrar sesión
    };

    return (
        <header className="flex justify-between items-center bg-white p-4 px-20 shadow-md relative">
            <NavLink to="/">
            <img src="/LogoInversionesMarin-1.png" alt="Logo" className="w-20 h-20 object-contain" />
            </NavLink>

            {/* Ícono del menú hamburguesa */}
            <input type="checkbox" id="menu-toggle" className="hidden peer" />
            <label htmlFor="menu-toggle" className="md:hidden cursor-pointer">
                <Bars3Icon className="w-8 h-8 text-black peer-checked:hidden" />
                <XMarkIcon className="w-8 h-8 text-black hidden peer-checked:block" />
            </label>

            {/* Menú de navegación */}
            <nav className="peer-checked:flex hidden absolute z-20 top-full left-0 w-full bg-white flex-col items-center space-y-4 shadow-lg md:relative md:top-0 md:flex md:flex-row md:w-auto md:space-x-4 md:bg-transparent md:shadow-none">
                <NavLink to="/ReportExternalFailures" className={({ isActive }) => isActive ? "text-primary font-bold" : "text-black"}>
                    Proyectos externos
                </NavLink>

                <NavLink to="/ReportInternalFailures" className={({ isActive }) => isActive ? "text-primary font-bold" : "text-black"}>
                    Proyectos internos en el taller
                </NavLink>

                {/* Menú en versión móvil */}
                <div className="flex flex-col items-center space-y-2 w-full h-[150px] md:hidden">
                    {isLoggedIn ? (
                        <UserCircleIcon className="w-10 h-10 text-primary cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} />
                    ) : (
                        <>
                            <NavLink to="/registro" className="bg-primary text-white px-4 py-2 rounded w-3/4 text-center">
                                Registrarse
                            </NavLink>
                            <NavLink to="/inicio" className="border border-primary text-primary px-4 py-2 rounded w-3/4 text-center">
                                Iniciar sesión
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>

            {/* Menú en versión escritorio */}
            <div className="hidden md:flex space-x-2">
                {isLoggedIn ? (
                    <div className="relative">
                        <UserCircleIcon className="w-10 h-10 text-primary cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} />

                        {/* Dropdown del usuario */}
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md p-2">
                                {/* <NavLink to="/perfil" className="block px-4 py-2 text-black hover:bg-gray-200">Mi Perfil</NavLink> */}
                                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200">
                                    Cerrar Sesión
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <NavLink to="/Signup_employee" className="border border-primary text-primary px-4 py-2 rounded">
                            Registrarse
                        </NavLink>
                        <NavLink to="/" className="border border-primary text-primary px-4 py-2 rounded">
                            Iniciar sesión
                        </NavLink>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header_employee;
