import React, { useState } from "react";
import ReportInternalFailures1 from "./Report_internal_failures1";
import ReportInternalFailures2 from "./Report_internal_failures2";
import ReportInternalFailures3 from "./Report_internal_failures3";

export default function InternalReportsWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  // Para que cada paso actualice sin borrar lo anterior
  const updateFormData = (newData) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/reportes-internos/full`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Error al enviar el reporte");

      const json = await res.json();
      console.log("Respuesta del backend:", json);
      alert("Reporte enviado correctamente");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al enviar el reporte");
    }
  };

  return (
    <>
      {step === 1 && (
        <ReportInternalFailures1
          formData={formData.ReportInternalFailures1 || {}}
          onSave={(data) => updateFormData({ ReportInternalFailures1: data })}
          onNext={handleNext}
        />

      )}
      {step === 2 && (
        <ReportInternalFailures2
          formData={formData.ReportInternalFailures2 || {}}
          onSave={(data) => updateFormData({ ReportInternalFailures2: data })}
          onNext={handleNext}
        />
      )}
      {step === 3 && (
        <ReportInternalFailures3
          formData={formData.ReportInternalFailures3 || {}}
          onSave={(data) => updateFormData({ ReportInternalFailures3: data })}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}
