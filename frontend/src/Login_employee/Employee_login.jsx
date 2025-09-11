import React, { useState } from "react";
import { useNavigate } from "react-router";

export const Login_employee= () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.password) {
            setError('Por favor, ingresa todos los datos');
            return;
        }

        setError('');
        setMensaje('');

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/usuario/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMensaje('Inicio de sesión exitoso');
                localStorage.setItem('authToken', data.authToken); // Guardar token
                navigate("/Lobby")
            } else {
                setError(data.message || 'Error en el inicio de sesión');
            }
        } catch (error) {
            setError('No se pudo conectar con el servidor');
        }
    };

    return (
        <div className="flex items-start justify-center min-h-screen pt-20 bg-gray-100">
            <div className="max-w-md w-full bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">Iniciar sesión</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {mensaje && <p className="text-green-500 text-sm mb-4">{mensaje}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Usuario</label>
                        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded mt-2" placeholder="Ingresa tu username" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded mt-2" placeholder="Ingresa tu contraseña" />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                    >
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    );
};
