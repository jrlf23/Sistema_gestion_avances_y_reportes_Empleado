export function normalizeFormData(formData) {
  const isValidDate = (date) => {
    if (!date) return false;
    const d = new Date(date);
    return !isNaN(d.getTime());
  };

  // 🔧 Normalizar repuestos (convertir strings a números)
  const repuestos = Array.isArray(formData.repuestos)
    ? formData.repuestos.map((r) => ({
        nombre: r.nombre || "",
        cantidad: Number(r.cantidad) || 0,
        precio: Number(r.precio) || 0,
      }))
    : [];

  // 🔧 Normalizar bahías (desde revisionData si existe)
  const bahias = Array.isArray(formData.revisionData)
    ? formData.revisionData.map((bahia, index) => ({
        numero: index + 1,
        items: [
          ...Object.entries(bahia.izquierdo || {})
            .filter(([_, checked]) => checked)
            .map(([nombre]) => ({ nombre, lado: "izquierdo" })),
          ...Object.entries(bahia.derecho || {})
            .filter(([_, checked]) => checked)
            .map(([nombre]) => ({ nombre, lado: "derecho" })),
        ],
      }))
    : [];

  return {
    cliente: formData.cliente || "",
    direccion: formData.direccion || "",
    color: formData.color || "",
    logo: formData.logo || "",
    placa: formData.placa || "",
    marca: formData.marca || "",
    tipo: formData.tipo || "",
    equipo: formData.equipo || "",
    fechaIngreso: isValidDate(formData.fechaIngreso)
      ? new Date(formData.fechaIngreso).toISOString()
      : new Date().toISOString(), // 👈 obligatorio → fallback a hoy
    fechaSalida: isValidDate(formData.fechaSalida)
      ? new Date(formData.fechaSalida).toISOString()
      : undefined,
    kilInicial: Number(formData.kilInicial) || 0,
    kilFinal: Number(formData.kilFinal) || 0,
    falla: formData.falla || "",
    trabajoRealizado: formData.trabajoRealizado || "",
    accesorios: Array.isArray(formData.accesorios) ? formData.accesorios : [],
    repuestos,
    puntos: Array.isArray(formData.puntos) ? formData.puntos : [],
    bahias,
    observaciones_finales: formData.observaciones || "", // 👈 corregido al nombre correcto
    // 🔴 elimino supervisor, estado, id_empleado porque no están en tu DTO
  };
}
