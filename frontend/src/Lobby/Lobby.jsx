import React from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardDocumentListIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";

const Lobby = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">Panel de Reportes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        
        {/* Tarjeta Reporte Externo */}
        <div
          onClick={() => navigate("/ReportExternalFailures")}
          className="cursor-pointer bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-xl transition duration-300 border border-gray-200"
        >
          <ClipboardDocumentListIcon className="w-16 h-16 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Reporte Externo
          </h2>
          <p className="text-gray-500">
            Crea y gestiona reportes relacionados con clientes o proyectos externos.
          </p>
        </div>

        {/* Tarjeta Reporte Interno */}
        <div
          onClick={() => navigate("/ReportInternalFailures")}
          className="cursor-pointer bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center hover:shadow-xl transition duration-300 border border-gray-200"
        >
          <WrenchScrewdriverIcon className="w-16 h-16 text-green-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Reporte Interno
          </h2>
          <p className="text-gray-500">
            Registra fallas y reportes internos en el taller de trabajo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
