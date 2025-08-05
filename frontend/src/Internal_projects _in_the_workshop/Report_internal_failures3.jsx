import React, { useState } from "react";
import InteractiveTruck2 from "./Interactive_truck2";
import axios from 'axios';

const ReportInternalFailures3 = () => {
    const [formData, setFormData] = useState({
        cliente: "",
        direccion: "",
        color: "",
        logo: "",
        placa: "",
        marca: "",
        tipo: "",
        equipo: "",
        fechaIngreso: "",
        fechaSalida: "",
        kilInicial: "",
        kilFinal: "",
        falla: "",
        trabajoRealizado: "",
        accesorios: [],
        repuestos: [{ nombre: "", cantidad: "", precio: "" }],
    });

    const [errors, setErrors] = useState({});
    const [revisionData, setRevisionData] = useState(
        [1, 2, 3, 4, 5].map(() => ({
            izquierdo: itemsRevision.reduce((acc, item) => ({ ...acc, [item]: false }), {}),
            derecho: itemsRevision.reduce((acc, item) => ({ ...acc, [item]: false }), {})
        }))
    );
    const [observacion, setObservacion] = useState("");
    const [enderezar, setEnderezar] = useState("");

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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "accesorios") {
            if (checked) {
                setFormData((prev) => ({
                    ...prev,
                    accesorios: [...prev.accesorios, value],
                }));
            } else {
                setFormData((prev) => ({
                    ...prev,
                    accesorios: prev.accesorios.filter((item) => item !== value),
                }));
            }
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleRepuestoChange = (index, field, value) => {
        const newRepuestos = [...formData.repuestos];
        newRepuestos[index][field] = value;
        setFormData({ ...formData, repuestos: newRepuestos });
    };

    const agregarRepuesto = () => {
        setFormData((prev) => ({
            ...prev,
            repuestos: [...prev.repuestos, { nombre: "", cantidad: "", precio: "" }],
        }));
    };

    const validarCampos = () => {
        const nuevosErrores = {};
        const camposObligatorios = [
            "cliente", "placa", "marca", "tipo", "equipo", "kilInicial", "kilFinal", "falla", "trabajoRealizado"
        ];

        camposObligatorios.forEach((campo) => {
            if (!formData[campo] || formData[campo].trim() === "") {
                nuevosErrores[campo] = "Este campo es obligatorio.";
            }
        });

        if (formData.accesorios.length === 0) {
            nuevosErrores.accesorios = "Seleccione al menos un accesorio.";
        }

        setErrors(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const toggleRevisionItem = (bahiaIndex, lado, item) => {
        const newData = [...revisionData];
        newData[bahiaIndex][lado][item] = !newData[bahiaIndex][lado][item];
        setRevisionData(newData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarCampos()) return;

        try {
            const response = await axios.post('http://localhost:3000/reportes-internos', {
                ...formData,
                revisionData,
                observacion,
                enderezar
            });

            if (response.status === 201 || response.status === 200) {
                alert('¡Reporte enviado con éxito!');
                console.log('Respuesta del backend:', response.data);
            } else {
                alert('Hubo un error al enviar el reporte.');
            }
        } catch (error) {
            console.error('Error al enviar el reporte:', error);
            alert('Error al conectar con el backend.');
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
                            value={formData[field]}
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
                    value={formData.falla}
                    onChange={handleChange}
                    placeholder="Falla reportada"
                    className={`w-full p-2 border rounded mb-2 ${errors.falla ? "border-red-500" : ""}`}
                />
                {errors.falla && <p className="text-red-500 text-sm mb-2">{errors.falla}</p>}

                <textarea
                    name="trabajoRealizado"
                    value={formData.trabajoRealizado}
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
                                checked={formData.accesorios.includes(item)}
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
                {formData.repuestos.map((repuesto, index) => (
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
                                                    checked={revisionData[i][lado][item]}
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
                        value={observacion}
                        onChange={(e) => setObservacion(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                    <textarea
                        placeholder="Enderezar"
                        value={enderezar}
                        onChange={(e) => setEnderezar(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                </div>
            </section>

            <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700"
            >
                Enviar Reporte
            </button>
        </form>
    );
};

export default ReportInternalFailures3;
