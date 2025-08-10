import React, { useState } from "react";
import ReportInternalFailures1 from "./Report_internal_failures1";
import ReportInternalFailures2 from "./Report_internal_failures2";
import ReportInternalFailures3 from "./Report_internal_failures3";
import { data } from "react-router";

export default function InternalReportsWizard() {
    const [step, setStep] = useState(1);
    const [reportData, setReportData] = useState({
        ReportInternalFailures1: {},
        ReportInternalFailures2: {},
        ReportInternalFailures3: {}
    });

    const handleNext = (data) => {
        setReportData((prev) => ({ ...prev, [`reporte${step}`]: data }));
        setStep(step + 1);
    };

    const handleSubmit = async (data) => {
        const finalData =
        {
            ...reportData, ReportInternalFailures3: data
        };

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reportes-internos/full`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalData)
            }
        );

        const json = await res.json();
        console.log(json);
        alert("Reporte enviado correctamente");
    };

    return (
    <>
      {step === 1 && <ReportInternalFailures1 onNext={handleNext} />}
      {step === 2 && <ReportInternalFailures2 onNext={handleNext} />}
      {step === 3 && <ReportInternalFailures3 onNext={handleSubmit} />}
    </>
  );
}