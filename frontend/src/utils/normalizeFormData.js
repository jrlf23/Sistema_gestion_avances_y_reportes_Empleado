export function normalizeFormData(formData) {
  const isValidDate = (date) => {
    if (!date) return false;
    const d = new Date(date);
    return !isNaN(d.getTime());
  };

  // ✅ Repuestos → guardar como JSON
  const repuestos = Array.isArray(formData.repuestos)
    ? formData.repuestos.map((r) => ({
        nombre: r.nombre || "",
        cantidad: Number(r.cantidad) || 0,
        precio: Number(r.precio) || 0,
      }))
    : [];

  // ✅ Bahías → JSON (desde revisionData)
  const revision_bahias = Array.isArray(formData.revisionData)
    ? formData.revisionData.map((bahia, index) => ({
        numero: index + 1,
        izquierdo: bahia.izquierdo || {},
        derecho: bahia.derecho || {},
      }))
    : [];

  return {
    cliente: formData.cliente,
    direccion: formData.direccion,
    color: formData.color,
    logo: formData.logo,
    placa: formData.placa,
    fechaIngreso: formData.fechaIngreso 
      ? new Date(formData.fechaIngreso).toISOString()
      : null,
    fechaEntrega: formData.fechaEntrega 
      ? new Date(formData.fechaEntrega).toISOString()
      : null,
    supervisor: formData.supervisor,
    encargado: formData.encargado,
    estado: formData.estado || "pendiente",
    id_empleado: formData.id_empleado || 1,
    accesorios: formData.accesorios || [],
    repuestos: formData.repuestos || [],
    trabajos: formData.trabajos || [],
    observaciones: formData.observaciones || "",
    puntosCamion: formData.puntosCamion || [],
  };
}
