import React, { useState } from "react";
import ReportInternalFailures1 from "./Report_internal_failures1";
import ReportInternalFailures2 from "./Report_internal_failures2";
import ReportInternalFailures3 from "./Report_internal_failures3";
import { normalizeFormData } from "../utils/normalizeFormData";

export default function InternalReportsWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const updateFormData = (newData) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const handleSubmit = async () => {
  const d = formData;

  const payload = {
    paso1: {
      placa: d.placa,
      equipo: d.equipo,
      fecha: d.fecha,                    // YYYY-MM-DD
      hora_inicio: d.hora_inicio,        // HH:mm o HH:mm:ss
      hora_fin: d.hora_fin,
      horas_km: d.horas_km,
      sistema: String(d.sistema ?? ''),
      detalles_sistema: d.detalles_sistema,
      detalles_falla: d.detalles_falla,
      fuente_reporte: Array.isArray(d.fuente_reporte) ? d.fuente_reporte : (d.fuente_reporte ? [d.fuente_reporte] : []),
      id_empleado: d.id_empleado
    },
    paso2: {
      fecha: d.fecha,                    // YYYY-MM-DD
      equipo: d.equipo,
      placa: d.placa,
      tipo: d.tipo,
      marca: d.marca,
      depto: d.depto,
      kilometraje: d.kilometraje,
      combustible: d.combustible,        // '1/4' | '1/2' | '3/4' | 'F'
      trabajo_solicitado: d.trabajoSolicitado || d.trabajo_solicitado,
      observaciones: d.observaciones,
      supervisor_recibe: d.supervisorRecibe,
      mecanico_asignado: d.mecanicoAsignado,
      supervisor_entrega: d.supervisorEntrega,
      fecha_tentativa_entrega: d.fechaTentativaEntrega, // YYYY-MM-DD
      fecha_real_entrega: d.fechaRealEntrega,           // YYYY-MM-DD
      persona_entrega: d.personaEntrega,
      persona_recibe: d.personaRecibe,
      inspeccion: d.inspeccion,
      accesorios: d.accesorios,
      herramientas: d.herramientas,
      costos: d.costos,
      id_empleado: d.id_empleado
    },
    paso3: {
      cliente: d.cliente,
      direccion: d.direccion,
      color: d.color,
      logo: d.logo,
      placa: d.placa,
      marca: d.marca,
      tipo: d.tipo,
      equipo: d.equipo,
      fecha_ingreso: d.fechaIngreso,     // YYYY-MM-DD
      fecha_salida: d.fechaSalida,       // YYYY-MM-DD
      kil_inicial: d.kilInicial,
      kil_final: d.kilFinal,
      falla: d.falla,                    // OBLIGATORIO
      trabajo_realizado: d.trabajoRealizado, // OBLIGATORIO
      accesorios: d.accesorios,
      repuestos: d.repuestos,            // [{nombre,cantidad,precio}]
      revision_bahias: d.revisionData,
      observacion: d.observacion,
      enderezar: d.enderezar,
      id_empleado: d.id_empleado
    }
  };

  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reportes-internos/full`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const json = await res.json();
  console.log('Respuesta del backend:', json);
  if (!res.ok) throw new Error('Error al enviar el reporte');
  alert('Reporte enviado correctamente');
};

  return (
    <>
      {step === 1 && (
        <ReportInternalFailures1
          formData={formData}
          onSave={updateFormData}
          onNext={handleNext}
        />
      )}
      {step === 2 && (
        <ReportInternalFailures2
          formData={formData}
          onSave={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 3 && (
        <ReportInternalFailures3
          formData={formData}
          onSave={updateFormData}
          onSubmit={handleSubmit}
          onBack={handleBack}
        />
      )}
    </>
  );
}