import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportInternalFailures1 from "./Report_internal_failures1";
import ReportInternalFailures2 from "./Report_internal_failures2";
import ReportInternalFailures3 from "./Report_internal_failures3";
import { normalizeFormData } from "../utils/normalizeFormData";

export default function InternalReportsWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate= useNavigate();

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const updateFormData = (newData) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const handleSubmit = async (latestStepData) => {
    try {
      const d = latestStepData ? { ...formData, ...latestStepData } : formData;

      const payload = {
        paso1: {
          placa: d.placa,
          equipo: d.equipo,
          cd: d.cd,
          fecha: d.fecha,
          hora_inicio: d.hora_inicio,
          hora_fin: d.hora_fin,
          horas_km: d.horas_km,
          sistema: String(d.sistema ?? ''),
          detalles_sistema: d.detalles_sistema,
          detalles_falla: d.detalles_falla,
          fuente_reporte: Array.isArray(d.fuente_reporte) ? d.fuente_reporte : (d.fuente_reporte ? [d.fuente_reporte] : []),
          id_empleado: d.id_empleado,
        },
        paso2: {
          fecha: d.fecha,
          equipo: d.equipo,
          placa: d.placa,
          tipo: d.tipo,
          marca: d.marca,
          depto: d.depto,
          kilometraje: d.kilometraje,
          combustible: d.combustible,
          trabajo_solicitado: d.trabajoSolicitado || d.trabajo_solicitado,
          observaciones: d.observaciones,
          supervisor_recibe: d.supervisorRecibe,
          mecanico_asignado: d.mecanicoAsignado,
          supervisor_entrega: d.supervisorEntrega,
          fecha_tentativa_entrega: d.fechaTentativaEntrega,
          fecha_real_entrega: d.fechaRealEntrega,
          persona_entrega: d.personaEntrega,
          persona_recibe: d.personaRecibe,
          inspeccion: d.inspeccion,
          accesorios: d.accesorios,
          herramientas: d.herramientas,
          costos: d.costos,
          id_empleado: d.id_empleado,
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
          fecha_ingreso: d.fechaIngreso,
          fecha_salida: d.fechaSalida,
          kil_inicial: d.kilInicial,
          kil_final: d.kilFinal,
          falla: d.falla,
          trabajo_realizado: d.trabajoRealizado,
          accesorios: d.accesorios,
          repuestos: d.repuestos,
          revision_bahias: d.revisionData,
          observacion: d.observacion,
          enderezar: d.enderezar,
          id_empleado: d.id_empleado,
          empleados: d.empleados,
        },
      };

      console.log('payload a enviar:', payload);

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reportes-internos/full`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error al enviar el reporte");

      const json = await res.json();
      console.log("Respuesta del backend:", json);
      alert("Reporte enviado correctamente");
      navigate('/lobby', {replace: true})
    } catch (error) {
      console.error(error);
      alert("Hubo un error al enviar el reporte");
    }
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
