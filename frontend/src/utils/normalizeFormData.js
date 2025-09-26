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

  // ✅ Empleados → JSON
  const empleados = Array.isArray(formData.empleados)
    ? formData.empleados.map((emp) => ({
        nombre: emp.nombre || "",
        apellido: emp.apellido || "",
        fechaInicio: emp.fechaInicio || "",
        fechaFin: emp.fechaFin || "",
        horas: Number(emp.horas) || 0,
      }))
    : [];

  return {
    // Campos básicos
    cliente: formData.cliente || "",
    direccion: formData.direccion || "",
    color: formData.color || "",
    logo: formData.logo || "",
    placa: formData.placa || "",
    marca: formData.marca || "",
    tipo: formData.tipo || "",
    equipo: formData.equipo || "",
    
    // Fechas
    fechaIngreso: formData.fechaIngreso || "",
    fechaSalida: formData.fechaSalida || "",
    
    // Kilometraje
    kilInicial: Number(formData.kilInicial) || 0,
    kilFinal: Number(formData.kilFinal) || 0,
    
    // Trabajo
    falla: formData.falla || "",
    trabajoRealizado: formData.trabajoRealizado || "",
    
    // Arrays y objetos complejos
    accesorios: formData.accesorios || [],
    repuestos: repuestos,
    empleados: empleados,
    revisionData: revision_bahias,
    puntosCamion: formData.puntosCamion || {},
    
    // Observaciones
    observacion: formData.observacion || "",
    enderezar: formData.enderezar || "",
    
    // Campos adicionales para compatibilidad
    estado: formData.estado || "pendiente",
    id_empleado: formData.id_empleado || 1,
  };
}
