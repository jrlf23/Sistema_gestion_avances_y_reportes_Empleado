import React, { useState } from "react";

export const Signup_employee = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        dui: ""
    });

    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación básica
        for (const key in formData) {
            if (!formData[key]) {
                setError(`Por favor, completa el campo ${key}`);
                return;
            }
        }

        setError("");
        setMensaje("");

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/usuario/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMensaje("Registro exitoso.");
                setFormData({
                    username: "",
                    email: "",
                    password: "",
                    firstName: "",
                    lastName: "",
                    address: "",
                    phoneNumber: "",
                    dui: ""
                });
            } else {
                setError(data.message || "Error en el registro.");
            }
        } catch (error) {
            setError("No se pudo conectar con el servidor.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">Registro de empleado</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {mensaje && <p className="text-green-500 text-sm mb-4">{mensaje}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700">Usuario</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded mt-2" placeholder="Nombre de usuario" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Correo</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded mt-2" placeholder="Correo electrónico" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Contraseña</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded mt-2" placeholder="Contraseña" />
                </div>
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-gray-700">Nombre</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded mt-2" placeholder="Nombre" />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-gray-700">Apellido</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded mt-2" placeholder="Apellido" />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700">Dirección</label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded mt-2" placeholder="Dirección" />
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-gray-700">Teléfono</label>
                    <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded mt-2" placeholder="Teléfono" />
                </div>
                <div className="mb-4">
                    <label htmlFor="dui" className="block text-gray-700">DUI</label>
                    <input type="text" id="dui" name="dui" value={formData.dui} onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded mt-2" placeholder="DUI" />
                </div>
                <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                >
                    Registrar
                </button>
            </form>
        </div>
    );
};
