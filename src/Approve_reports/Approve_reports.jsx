import { useState } from "react";

const Approve_reports = ({ clients = [] }) => {
    const [selectedClient, setSelectedClient] = useState(null);
    const [modalType, setModalType] = useState(null);
  
    const openModal = (client, type) => {
      setSelectedClient(client);
      setModalType(type);
    };
  
    const closeModal = () => {
      setSelectedClient(null);
      setModalType(null);
    };
  
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Base de datos de reportes por aprobar</h2>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                {[
                  "ID Empleado", "Nombre", "Apellido", "Numero reporte", "Correo", "Pago", "Beneficiarios", "Acciones"
                ].map((header) => (
                  <th key={header} className="p-2 border">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border hover:bg-gray-100">
                  <td className="p-2 border">{client.id}</td>
                  <td className="p-2 border">{client.nombre}</td>
                  <td className="p-2 border">{client.apellido}</td>
                  <td className="p-2 border">
                    <span className="px-2 py-1 text-white text-sm rounded bg-green-500">
                      {client.membresia}
                    </span>
                  </td>
                  <td className="p-2 border">{client.correo}</td>
                  <td className="p-2 border">{client.pago}</td>
                  <td className="p-2 border">{client.beneficiarios}</td>
                  <td className="p-2 border flex gap-2">
                    <button onClick={() => openModal(client, "ver")} className="bg-blue-500 text-white px-3 py-1 rounded">Ver</button>
                    <button onClick={() => openModal(client, "aprobar")} className="bg-green-500 text-white px-3 py-1 rounded">Aprobar</button>
                    <button onClick={() => openModal(client, "negar")} className="bg-red-500 text-white px-3 py-1 rounded">Negar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Modales */}
        {modalType && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className={`bg-white p-6 rounded-lg shadow-lg w-96 ${modalType === "aprobar" ? "border-green-500" : "border-red-500"}`}>
              <h3 className="text-lg font-semibold">{modalType === "aprobar" ? "Aprobar Membresía" : "Negar Membresía"}</h3>
              <p className="my-4">¿Seguro que deseas {modalType === "aprobar" ? "aprobar" : "negar"} la membresía de {selectedClient?.nombre}?</p>
              <div className="flex justify-end gap-3">
                <button onClick={closeModal} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
                <button className={`${modalType === "aprobar" ? "bg-green-500" : "bg-red-500"} text-white px-4 py-2 rounded`}>
                  {modalType === "aprobar" ? "Aprobar" : "Negar"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Approve_reports;
  
