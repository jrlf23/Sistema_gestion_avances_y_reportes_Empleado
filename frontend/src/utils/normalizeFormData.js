export function normalizeFormData(formData) {
  return {
    ...formData,
    fechaIngreso: formData.fechaIngreso
      ? new Date(formData.fechaIngreso).toISOString()
      : null,
    fechaSalida: formData.fechaSalida
      ? new Date(formData.fechaSalida).toISOString()
      : null,
    accesorios: formData.accesorios || [],
    repuestos: formData.repuestos || [],
    puntos: formData.puntos || [],
    bahias: formData.bahias || [],
  };
}
