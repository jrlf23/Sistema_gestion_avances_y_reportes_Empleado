import React, { useState } from "react";

export default function ReportInternalFailures1({ formData = {}, onSave, onNext }) {

  console.log("Props en ReportInternalFailures1:", { formData, onSave, onNext });


  const [localData, setLocalData] = useState({
    placa: formData.placa || "",
    equipo: formData.equipo || "",
    fecha: formData.fecha || "",
    hora_inicio: formData.hora_inicio || "",
    hora_fin: formData.hora_fin || "",
    horas_km: formData.horas_km || "",
    sistema: formData.sistema || "",
    detalles_falla: formData.detalles_falla || "",
    fuente_reporte: formData.fuente_reporte || [],
  });

  const [errors, setErrors] = useState({});

  const sistemas = [
    { value: "1", label: "Motor" },
    { value: "2", label: "Llantas" },
    { value: "3", label: "Frenos" },
    { value: "4", label: "Sistema hidráulico" },
    { value: "5", label: "Transmisión" },
    { value: "6", label: "Eléctrico" },
    { value: "7", label: "Imagen" },
    { value: "8", label: "Otros" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setLocalData((prev) => ({
        ...prev,
        fuente_reporte: checked
          ? [...prev.fuente_reporte, value]
          : prev.fuente_reporte.filter((item) => item !== value),
      }));
    } else {
      setLocalData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!localData.placa.trim()) newErrors.placa = "La placa es obligatoria.";
    if (localData.equipo === "" || localData.equipo === null || localData.equipo === 0) {
      newErrors.equipo = "El equipo es obligatorio.";
    }
    if (!localData.fecha) newErrors.fecha = "La fecha es obligatoria.";
    if (!localData.hora_inicio) newErrors.hora_inicio = "La hora de inicio es obligatoria.";
    if (!localData.hora_fin) newErrors.hora_fin = "La hora de fin es obligatoria.";
    if (localData.horas_km === "" || localData.horas_km === null || localData.horas_km <= 0) {
      newErrors.horas_km = "Las horas/Km son obligatorias.";
    }
    if (!localData.sistema) newErrors.sistema = "Debe seleccionar un sistema.";
    if (localData.sistema === "8" && !localData.detalles_falla.trim())
      newErrors.detalles_falla = "Debe ingresar los detalles de la falla.";
    if (localData.fuente_reporte.length === 0)
      newErrors.fuente_reporte = "Debe seleccionar al menos una fuente de reporte.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSave(localData);

    onNext();
  };



  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4">Reporte de Fallas</h2>
      <form onSubmit={handleSubmit}>
        {/* Placa */}
        <div className="mb-4">
          <label className="block text-gray-700">Placa *</label>
          <input
            type="text"
            name="placa"
            value={localData.placa}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.placa && <p className="text-red-500 text-sm">{errors.placa}</p>}
        </div>

        {/* Equipo */}
        <div className="mb-4">
          <label className="block text-gray-700">Equipo *</label>
          <input
            type="text"
            name="equipo"
            value={localData.equipo}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.equipo && <p className="text-red-500 text-sm">{errors.equipo}</p>}
        </div>

        {/* CD (Ubicacion) */}
        <div className="mb-4">
          <label className="block text-gray-700">CD *</label>
          <input type="text" name="CD" value={formData.placa} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        {/* Fecha */}
        <div className="mb-4">
          <label className="block text-gray-700">Fecha *</label>
          <input
            type="date"
            name="fecha"
            value={localData.fecha}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.fecha && <p className="text-red-500 text-sm">{errors.fecha}</p>}
        </div>

        {/* Hora de Inicio */}
        <div className="mb-4">
          <label className="block text-gray-700">Hora de Inicio *</label>
          <input
            type="time"
            name="hora_inicio"
            value={localData.hora_inicio}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.hora_inicio && <p className="text-red-500 text-sm">{errors.hora_inicio}</p>}
        </div>

        {/* Hora de Fin */}
        <div className="mb-4">
          <label className="block text-gray-700">Hora de Fin *</label>
          <input
            type="time"
            name="hora_fin"
            value={localData.hora_fin}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.hora_fin && <p className="text-red-500 text-sm">{errors.hora_fin}</p>}
        </div>

        {/* Horas/Km */}
        <div className="mb-4">
          <label className="block text-gray-700">Horas/Km *</label>
          <input
            type="text"
            name="horas_km"
            value={localData.horas_km}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.horas_km && <p className="text-red-500 text-sm">{errors.horas_km}</p>}
        </div>

        {/* Sistema */}
        <div className="mb-4">
          <label className="block text-gray-700">Sistema *</label>
          <select
            name="sistema"
            value={localData.sistema}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Seleccione un sistema</option>
            {sistemas.map((sistema) => (
              <option key={sistema.value} value={sistema.value}>
                {sistema.label}
              </option>
            ))}
          </select>
          {errors.sistema && <p className="text-red-500 text-sm">{errors.sistema}</p>}
        </div>

        {/* Detalles de la Falla */}
        {localData.sistema === "8" && (
          <div className="mb-4">
            <label className="block text-gray-700">Detalles de la Falla *</label>
            <textarea
              name="detalles_falla"
              value={localData.detalles_falla}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.detalles_falla && (
              <p className="text-red-500 text-sm">{errors.detalles_falla}</p>
            )}
          </div>
        )}

        {/* Fuente del Reporte */}
        <div className="mb-4">
          <label className="block text-gray-700">Fuente del Reporte *</label>
          <div className="flex flex-wrap gap-2">
            {[
              "Ticket",
              "Hoja de inspección",
              "Reporte de fallas",
              "En rutina de preventivo",
              "Inspección técnico",
              "Doble check distribución",
              "Falla en carretera",
              "Accidente",
              "Inspección coordinador flota",
            ].map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={item}
                  checked={localData.fuente_reporte.includes(item)}
                  onChange={handleChange}
                />
                {item}
              </label>
            ))}
          </div>
          {errors.fuente_reporte && (
            <p className="text-red-500 text-sm">{errors.fuente_reporte}</p>
          )}
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Siguiente
        </button>
      </form>
    </div>
  );
}
