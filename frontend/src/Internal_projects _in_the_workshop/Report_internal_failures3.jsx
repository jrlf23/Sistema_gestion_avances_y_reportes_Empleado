import React, { useState } from "react";
import InteractiveTruck2 from "./Interactive_truck2";

export default function ReportInternalFailures3({ formData, onSubmit, onSave }) {
    const accesoriosList = [
        "Pescantes", "Plataformas", "Porta cono", "Tapon tanque",
        "Porta llanta", "Aparta cable"
    ];

    const itemsRevision = [
        "Cincha", "Empaque", "Cortina Fondo", "Cortina 2\"",
        "Cortina 3\"", "Cortina 5\"", "Cable", "Cortina Tope",
        "Pelusa", "Rodos", "Topes Hule", "Cañuela Negra",
        "Resorte", "Estabilizador"
    ];

    const [localData, setLocalData] = useState({
        cliente: formData.cliente || "",
        direccion: formData.direccion || "",
        color: formData.color || "",
        logo: formData.logo || "",
        placa: formData.placa || "",
        marca: formData.marca || "",
        tipo: formData.tipo || "",
        equipo: formData.equipo || "",
        fechaIngreso: formData.fechaIngreso || "",
        fechaSalida: formData.fechaSalida || "",
        kilInicial: formData.kilInicial || "",
        kilFinal: formData.kilFinal || "",
        falla: formData.falla || "",
        trabajoRealizado: formData.trabajoRealizado || "",
        accesorios: formData.accesorios || [],
        repuestos: formData.repuestos || [{ nombre: "", cantidad: "", precio: "" }],
        revisionData: formData.revisionData || [1, 2, 3, 4, 5].map(() => ({
            izquierdo: itemsRevision.reduce((acc, item) => ({ ...acc, [item]: false }), {}),
            derecho: itemsRevision.reduce((acc, item) => ({ ...acc, [item]: false }), {})
        })),
        observacion: formData.observacion || "",
        enderezar: formData.enderezar || ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setLocalData((prev) => {
        // Si es un checkbox de accesorios → manejar array
        if (name === "accesorios") {
            if (checked) {
                return {
                    ...prev,
                    accesorios: [...prev.accesorios, value],
                };
            } else {
                return {
                    ...prev,
                    accesorios: prev.accesorios.filter((item) => item !== value),
                };
            }
        }

        // Si es un checkbox individual (boolean)
        if (type === "checkbox") {
            return {
                ...prev,
                [name]: checked,
            };
        }

        // Si es un campo numérico → convertir a número (solo si no está vacío)
        if (["kilometraje", "precio", "cantidad", "tiempo_estimado"].includes(name)) {
            return {
                ...prev,
                [name]: value === "" ? "" : Number(value),
            };
        }

        // Cualquier otro campo (texto, select, etc.)
        return {
            ...prev,
            [name]: value,
        };
    });
};


    const handleRepuestoChange = (index, field, value) => {
        const newRepuestos = [...localData.repuestos];
        newRepuestos[index][field] = value;
        setLocalData({ ...localData, repuestos: newRepuestos });
    };

    const agregarRepuesto = () => {
        setLocalData((prev) => ({
            ...prev,
            repuestos: [...prev.repuestos, { nombre: "", cantidad: "", precio: "" }],
        }));
    };

    const toggleRevisionItem = (bahiaIndex, lado, item) => {
        const newData = [...localData.revisionData];
        newData[bahiaIndex][lado][item] = !newData[bahiaIndex][lado][item];
        setLocalData({ ...localData, revisionData: newData });
    };

    const validarCampos = () => {
        const nuevosErrores = {};
        const camposObligatorios = [
            "cliente", "placa", "marca", "tipo", "equipo", "kilInicial", "kilFinal", "falla", "trabajoRealizado"
        ];
        camposObligatorios.forEach((campo) => {
            if (!localData[campo] || localData[campo].trim() === "") {
                nuevosErrores[campo] = "Este campo es obligatorio.";
            }
        });
        if (localData.accesorios.length === 0) {
            nuevosErrores.accesorios = "Seleccione al menos un accesorio.";
        }
        setErrors(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    //const handleSubmit = (e) => {
    //e.preventDefault();
    //if (!validarCampos()) return;

    //onSubmit(localData);
    //};

    const handleSubmit = async (e) => {
    e.preventDefault();

    // Si viene onSubmit del wizard, asegura guardar antes en el estado global y delega
    if (typeof onSubmit === "function") {
        if (typeof onSave === "function") {
            onSave(localData);
        }
        return onSubmit();
    }

    // Fallback: envío directo (modo independiente)
    try {
        const normalizedData = normalizeFormData(localData);
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reportes-internos/full`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(normalizedData),
        });

        const data = await res.json();
        if (!res.ok) {
            console.error("Errores de validación:", data.message);
            console.error("Body enviado:", normalizedData);
            throw new Error("Error al enviar el reporte");
        }
        console.log("Respuesta del backend:", data);
        alert("Reporte enviado correctamente");
    } catch (error) {
        console.error(error);
        alert("Hubo un error al enviar el reporte");
    }
};


    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-6xl mx-auto space-y-6 bg-white shadow rounded">
            <h1 className="text-2xl font-bold text-center text-gray-800">REPORTE DE TRABAJO REALIZADO</h1>

            {/* Datos generales */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    "cliente", "direccion", "color", "logo", "placa",
                    "marca", "tipo", "equipo", "fechaIngreso", "fechaSalida",
                    "kilInicial", "kilFinal"
                ].map((field) => (
                    <div key={field}>
                        <input
                            type={field.includes("fecha") ? "date" : "text"}
                            name={field}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={localData[field]}
                            onChange={handleChange}
                            className={`border p-2 rounded w-full ${errors[field] ? "border-red-500" : ""}`}
                        />
                        {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                    </div>
                ))}
            </section>

            {/* Falla y trabajo */}
            <section>
                <textarea
                    name="falla"
                    value={localData.falla}
                    onChange={handleChange}
                    placeholder="Falla reportada"
                    className={`w-full p-2 border rounded mb-2 ${errors.falla ? "border-red-500" : ""}`}
                />
                {errors.falla && <p className="text-red-500 text-sm mb-2">{errors.falla}</p>}

                <textarea
                    name="trabajoRealizado"
                    value={localData.trabajoRealizado}
                    onChange={handleChange}
                    placeholder="Trabajo realizado"
                    className={`w-full p-2 border rounded ${errors.trabajoRealizado ? "border-red-500" : ""}`}
                />
                {errors.trabajoRealizado && <p className="text-red-500 text-sm">{errors.trabajoRealizado}</p>}
            </section>

            {/* Accesorios */}
            <section>
                <h2 className="font-semibold mb-2">Accesorios:</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {accesoriosList.map((item) => (
                        <label key={item} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="accesorios"
                                value={item}
                                checked={localData.accesorios.includes(item)}
                                onChange={handleChange}
                            />
                            <span>{item}</span>
                        </label>
                    ))}
                </div>
                {errors.accesorios && <p className="text-red-500 text-sm mt-1">{errors.accesorios}</p>}
            </section>

            {/* Repuestos */}
            <section>
                <h2 className="font-semibold mb-2">Detalle de Repuestos</h2>
                {localData.repuestos.map((repuesto, index) => (
                    <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                        <input
                            type="text"
                            placeholder="Repuesto"
                            value={repuesto.nombre}
                            onChange={(e) => handleRepuestoChange(index, "nombre", e.target.value)}
                            className="border p-2 rounded"
                        />
                        <input
                            type="number"
                            placeholder="Cantidad"
                            value={repuesto.cantidad}
                            onChange={(e) => handleRepuestoChange(index, "cantidad", e.target.value)}
                            className="border p-2 rounded"
                        />
                        <input
                            type="number"
                            placeholder="Precio"
                            value={repuesto.precio}
                            onChange={(e) => handleRepuestoChange(index, "precio", e.target.value)}
                            className="border p-2 rounded"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={agregarRepuesto}
                    className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    + Agregar Repuesto
                </button>
            </section>

            {/* Camión */}
            <section className="flex justify-center">
                <div className="w-full max-w-4xl flex justify-center">
                    <InteractiveTruck2 />
                </div>
            </section>

            {/* Revisión de Bahías */}
            <section>
                <h2 className="text-xl font-semibold my-4 text-gray-700">Revisión de Bahías</h2>
                {[1, 2, 3, 4, 5].map((bahia, i) => (
                    <div key={i} className="mb-6 border p-4 rounded shadow-sm">
                        <h3 className="font-bold mb-2">Bahía #{bahia}</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {["izquierdo", "derecho"].map((lado) => (
                                <div key={lado}>
                                    <h4 className="font-semibold text-gray-600 capitalize">Lado {lado}</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {itemsRevision.map((item) => (
                                            <label key={item} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={localData.revisionData[i][lado][item]}
                                                    onChange={() => toggleRevisionItem(i, lado, item)}
                                                />
                                                <span>{item}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <textarea
                        placeholder="Observación"
                        value={localData.observacion}
                        onChange={(e) => setLocalData(prev => ({ ...prev, observacion: e.target.value }))}
                        className="border rounded p-2 w-full"
                    />
                    <textarea
                        placeholder="Enderezar"
                        value={localData.enderezar}
                        onChange={(e) => setLocalData(prev => ({ ...prev, enderezar: e.target.value }))}
                        className="border rounded p-2 w-full"
                    />
                </div>
            </section>

            <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700"
            >
                Finalizar
            </button>
        </form>
    );
}
