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
    try {
      const normalizedData = normalizeFormData(formData);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/reportes-internos/full`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(normalizedData),
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
