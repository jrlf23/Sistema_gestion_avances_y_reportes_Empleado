import React, { useState } from "react";

const ReportExternalFailures = () => {
    const [formData, setFormData] = useState({
        placa: "",
        equipo: "",
        cd: "",
        fecha: "",
        horaInicio: "",
        horaFin: "",
        horasKm: "",
        sistema: "",
        detallesSistema: "",
        detallesFalla: "",
        fuenteReporte: [],
    });

    const [errors, setErrors] = useState({});

    const sistemas = [
        { value: "1", label: "Motor" },
        { value: "2", label: "Llantas" },
        { value: "3", label: "Frenos" },
        { value: "4", label: "Sistema hidráulico" },
        { value: "5", label: "Transmisión" },
        { value: "6", label: "Electrico" },
        { value: "7", label: "Imagen" },
        { value: "8", label: "Otros" }
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setFormData((prevState) => ({
                ...prevState,
                fuenteReporte: checked
                    ? [...prevState.fuenteReporte, value]
                    : prevState.fuenteReporte.filter((item) => item !== value)
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
        setErrors({ ...errors, [name]: "" });
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.placa.trim()) newErrors.placa = "La placa es obligatoria.";
        if (!formData.equipo.trim()) newErrors.equipo = "El equipo es obligatorio.";
        if (!formData.fecha) newErrors.fecha = "La fecha es obligatoria.";
        if (!formData.horaInicio) newErrors.horaInicio = "La hora de inicio es obligatoria.";
        if (!formData.horaFin) newErrors.horaFin = "La hora de fin es obligatoria.";
        if (!formData.horasKm.trim()) newErrors.horasKm = "Las horas/Km son obligatorias.";
        if (!formData.sistema) newErrors.sistema = "Debe seleccionar un sistema.";
        if (formData.sistema === "8" && !formData.detallesFalla.trim()) newErrors.detallesFalla = "Debe ingresar los detalles de la falla.";
        if (formData.fuenteReporte.length === 0) newErrors.fuenteReporte = "Debe seleccionar al menos una fuente de reporte.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reportes/externos`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json", },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error("Error al enviar el reporte");
            }

            const data = await response.json();
            console.log("Reporte guardado:", data);
            alert("Reporte enviado con éxito.");

            setFormData({
                placa: "",
                equipo: "",
                cd: "",
                fecha: "",
                horaInicio: "",
                horaFin: "",
                horasKm: "",
                sistema: "",
                detallesSistema: "",
                detallesFalla: "",
                fuenteReporte: [],
            });
        } catch (error) {
            console.error(error);
            alert("Hubo un problema al enviar el reporte.");
        }
    }

return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4">Reporte de Fallas</h2>
        <form onSubmit={handleSubmit}>
            {/* Placa */}
            <div className="mb-4">
                <label className="block text-gray-700">Placa *</label>
                <input type="text" name="placa" value={formData.placa} onChange={handleChange} className="w-full border p-2 rounded" />
                {errors.placa && <p className="text-red-500 text-sm">{errors.placa}</p>}
            </div>

            {/* Equipo */}
            <div className="mb-4">
                <label className="block text-gray-700">Equipo *</label>
                <input type="text" name="equipo" value={formData.equipo} onChange={handleChange} className="w-full border p-2 rounded" />
                {errors.equipo && <p className="text-red-500 text-sm">{errors.equipo}</p>}
            </div>

            {/* CD (Ubicacion) */}
            <div className="mb-4">
                <label className="block text-gray-700">CD *</label>
                <input type="text" name="cd" value={formData.cd} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            {/* Fecha */}
            <div className="mb-4">
                <label className="block text-gray-700">Fecha *</label>
                <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} className="w-full border p-2 rounded" />
                {errors.fecha && <p className="text-red-500 text-sm">{errors.fecha}</p>}
            </div>

            {/* Hora de Inicio */}
            <div className="mb-4">
                <label className="block text-gray-700">Hora de Inicio *</label>
                <input type="time" name="horaInicio" value={formData.horaInicio} onChange={handleChange} className="w-full border p-2 rounded" />
                {errors.horaInicio && <p className="text-red-500 text-sm">{errors.horaInicio}</p>}
            </div>

            {/* Hora de Fin */}
            <div className="mb-4">
                <label className="block text-gray-700">Hora de Fin *</label>
                <input type="time" name="horaFin" value={formData.horaFin} onChange={handleChange} className="w-full border p-2 rounded" />
                {errors.horaFin && <p className="text-red-500 text-sm">{errors.horaFin}</p>}
            </div>

            {/* Horas/Km */}
            <div className="mb-4">
                <label className="block text-gray-700">Horas/Km *</label>
                <input type="text" name="horasKm" value={formData.horasKm} onChange={handleChange} className="w-full border p-2 rounded" />
                {errors.horasKm && <p className="text-red-500 text-sm">{errors.horasKm}</p>}
            </div>

            {/* Sistema */}
            <div className="mb-4">
                <label className="block text-gray-700">Sistema *</label>
                <select name="sistema" value={formData.sistema} onChange={handleChange} className="w-full border p-2 rounded">
                    <option value="">Seleccione un sistema</option>
                    {sistemas.map((sistema) => (
                        <option key={sistema.value} value={sistema.value}>
                            {sistema.label}
                        </option>
                    ))}
                </select>
                {errors.sistema && <p className="text-red-500 text-sm">{errors.sistema}</p>}
            </div>

            {/* Detalles de la Falla - Solo aparece si el usuario elige "Otros" */}
            {formData.sistema === "8" && (
                <div className="mb-4">
                    <label className="block text-gray-700">Detalles de la Falla *</label>
                    <textarea name="detallesFalla" value={formData.detallesFalla} onChange={handleChange} className="w-full border p-2 rounded"></textarea>
                    {errors.detallesFalla && <p className="text-red-500 text-sm">{errors.detallesFalla}</p>}
                </div>
            )}

            {/* Fuente del Reporte */}
            <div className="mb-4">
                <label className="block text-gray-700">Fuente del Reporte *</label>
                <div className="flex flex-wrap gap-2">
                    {["Ticket", "Hoja de inspección", "Reporte de fallas", "En rutina de preventivo", "Inspección técnico", "Doble check distribución", "Falla en carretera", "Accidente", "Inspección coordinador flota"].map((item) => (
                        <label key={item} className="flex items-center gap-2">
                            <input type="checkbox" value={item} onChange={handleChange} />
                            {item}
                        </label>
                    ))}
                </div>
                {errors.fuenteReporte && <p className="text-red-500 text-sm">{errors.fuenteReporte}</p>}
            </div>

            {/* Botón de Enviar */}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Enviar Reporte
            </button>
        </form>
    </div>
);
};

export default ReportExternalFailures;
