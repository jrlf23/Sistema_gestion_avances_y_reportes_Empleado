import React, { useState } from "react";
import InteractiveTruck from "./Interactive_truck";
import { useNavigate } from "react-router-dom";


const ReportInternalFailures2 = () => {
    const [formData, setFormData] = useState({
        fecha: "",
        equipo: "",
        placa: "",
        tipo: "",
        marca: "",
        depto: "",
        kilometraje: "",
        combustible: "1/4",
        trabajoSolicitado: "",
        observaciones: "",
        supervisorRecibe: "",
        mecanicoAsignado: "",
        supervisorEntrega: "",
        fechaTentativaEntrega: "",
        fechaRealEntrega: "",
        personaEntrega: "",
        personaRecibe: "",
        costos: {
            manoObra: "",
            repuestos: "",
            trabajosFuera: "",
            combustiblesLubricantes: "",
            llantas: "",
            totalGeneral: ""
        },
        inspeccion: [],
        accesorios: [],
        herramientas: []
    });

    const navigate = useNavigate();



    const handleChange = (e) => {
        const { name, value } = e.target;

        // Si el campo pertenece a "costos"
        if (Object.keys(formData.costos).includes(name)) {
            const updatedCostos = {
                ...formData.costos,
                [name]: value
            };

            // Calcular nuevo total general sumando todos menos el totalGeneral
            const total = Object.entries(updatedCostos)
                .filter(([key]) => key !== "totalGeneral")
                .reduce((acc, [_, val]) => acc + parseFloat(val || 0), 0);

            updatedCostos.totalGeneral = total.toFixed(2);

            setFormData({
                ...formData,
                costos: updatedCostos
            });
        } else {
            // Campos generales
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que el formulario se recargue

        const errors = validateForm();
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        // 🚀 Aquí va la lógica de envío (futura)
        // Ejemplo:
        // fetch("/api/guardar", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(formData)
        // }).then(...)

        // Por ahora: solo navegar si todo está bien
        navigate("/ReportInternalFailures3");
    };

    const validateForm = () => {
        const requiredFields = ["fecha", "equipo", "placa", "tipo", "marca", "depto", "kilometraje", "combustible"];
        const emptyFields = requiredFields.filter(field => !formData[field]);
        const errors = [];
        //const isEmptyInspeccion = Object.values(formData.inspeccion || {}).every(arr => arr.length === 0);

        //if (isEmptyInspeccion) {
        //    errors.push("Debes seleccionar al menos un área en la inspección del camión.");
        //}

        if (emptyFields.length > 0) {
            errors.push("Completa todos los campos obligatorios: " + emptyFields.join(", "));
        }

        if (!formData.trabajoSolicitado.trim()) {
            errors.push("El campo 'Trabajo Solicitado' es obligatorio.");
        }

        if (formData.accesorios.length === 0) {
            errors.push("Debes seleccionar al menos un accesorio.");
        }

        if (formData.herramientas.length === 0) {
            errors.push("Debes seleccionar al menos una herramienta.");
        }

        return errors;
    };


    const handleAccessoryChange = (e) => {
        const { value, checked } = e.target;
        let updatedAccesorios = [...formData.accesorios];

        if (checked) {
            updatedAccesorios.push(value);
        } else {
            updatedAccesorios = updatedAccesorios.filter(item => item !== value);
        }

        setFormData({
            ...formData,
            accesorios: updatedAccesorios
        });
    };

    const accesoriosList = [
        "Extintor", "Brazos", "Escobillas", "Radio", "Antena", "Espejos",
        "Tapon Gas", "Llanta Rep", "Encendedor", "LLaves", "LLavero",
        "Aire Acon", "Copas", "Alfombras"
    ];

    const handleToolChange = (e) => {
        const { value, checked } = e.target;
        let updatedTools = [...formData.herramientas];

        if (checked) {
            updatedTools.push(value);
        } else {
            updatedTools = updatedTools.filter(item => item !== value);
        }

        setFormData({
            ...formData,
            herramientas: updatedTools
        });
    };

    const herramientasList = [
        "Mica", "LLave de ruedas", "Palanca de mica", "LLave cangreja 10",
        "Destornillador philips", "Destornillador Plano", "LLaves fijas",
        "Tenazas", "Cubo de bujias", "LLaves corona", "2 cables fuerza"
    ];


    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">Hoja de Recepción de Vehículos</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Datos generales */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {Object.keys(formData).slice(0, 8).map((key) => (
                        <div key={key} className="mb-4">
                            <label className="block text-gray-700">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </label>
                            {key === "fecha" ? (
                                <input
                                    type="date"
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />
                            ) : key === "combustible" ? (
                                <select
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="1/4">1/4</option>
                                    <option value="1/2">1/2</option>
                                    <option value="3/4">3/4</option>
                                    <option value="F">F</option>
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Nuevos campos adicionales */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="mb-4">
                        <label className="block text-gray-700">Supervisor de turno que recibe</label>
                        <input
                            type="text"
                            name="supervisorRecibe"
                            value={formData.supervisorRecibe}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Mecánico asignado</label>
                        <input
                            type="text"
                            name="mecanicoAsignado"
                            value={formData.mecanicoAsignado}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Supervisor de turno que entrega</label>
                        <input
                            type="text"
                            name="supervisorEntrega"
                            value={formData.supervisorEntrega}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Fecha tentativa de entrega</label>
                        <input
                            type="date"
                            name="fechaTentativaEntrega"
                            value={formData.fechaTentativaEntrega}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Fecha real de entrega</label>
                        <input
                            type="date"
                            name="fechaRealEntrega"
                            value={formData.fechaRealEntrega}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Persona que entrega</label>
                        <input
                            type="text"
                            name="personaEntrega"
                            value={formData.personaEntrega}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Persona que recibe</label>
                        <input
                            type="text"
                            name="personaRecibe"
                            value={formData.personaRecibe}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </div>


                {/* Inspección del camión */}
                <h3 className="text-xl font-semibold text-center mt-4">Inspección del Camión</h3>
                <div className="flex justify-center">
                    <InteractiveTruck
                        selectedAreas={formData.inspeccion}
                        setSelectedAreas={(newState) =>
                            setFormData((prevData) => ({
                                ...prevData,
                                inspeccion: newState.inspeccion,
                            }))
                        }
                    />

                </div>

                {/* Trabajo solicitado y observaciones */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="mb-4">
                        <label className="block text-gray-700">Trabajo Solicitado</label>
                        <textarea name="trabajoSolicitado" value={formData.trabajoSolicitado} onChange={handleChange} className="w-full border p-2 rounded"></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Observaciones</label>
                        <textarea name="observaciones" value={formData.observaciones} onChange={handleChange} className="w-full border p-2 rounded"></textarea>
                    </div>
                </div>

                {/* Accesorios */}
                <h3 className="text-xl font-semibold text-center mt-4">Accesorios</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {accesoriosList.map((item) => (
                        <label key={item} className="inline-flex items-center">
                            <input
                                type="checkbox"
                                value={item}
                                checked={formData.accesorios.includes(item)}
                                onChange={handleAccessoryChange}
                                className="mr-2"
                            />
                            {item}
                        </label>
                    ))}
                </div>

                {/* Herramientas */}
                <h3 className="text-xl font-semibold text-center mt-4">Herramientas</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {herramientasList.map((item) => (
                        <label key={item} className="inline-flex items-center">
                            <input
                                type="checkbox"
                                value={item}
                                checked={formData.herramientas.includes(item)}
                                onChange={handleToolChange}
                                className="mr-2"
                            />
                            {item}
                        </label>
                    ))}
                </div>

                {/* Costos */}
                <h3 className="text-xl font-semibold text-center mt-4">Costos</h3>
                {Object.keys(formData.costos).map((key) => (
                    <div key={key} className="mb-4">
                        <label className="block text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, ' $1')}
                        </label>
                        <input
                            type="number"
                            name={key}
                            step="0.01"
                            value={formData.costos[key]}
                            onChange={handleChange}
                            className="w-full border p-2 rounded bg-white"
                            readOnly={key === "totalGeneral"} // Evita que el usuario lo edite manualmente
                        />
                    </div>
                ))}


                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Reporte de trabajo realizado
                </button>

            </form>
        </div>
    );
};

export default ReportInternalFailures2;
