import React, { useState } from "react";

const InteractiveTruck = () => {
  const [points, setPoints] = useState({
    frontal: [],
    trasera: [],
    superior: [],
    izquierdo: [],
    derecho: [],
  });

  const handleClick = (e, areaId) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPoints((prev) => ({
      ...prev,
      [areaId]: [...prev[areaId], { x, y }],
    }));
  };

  const truckAreas = [
    {
      id: "frontal",
      style: "left-[100px] top-[385px] w-[113px] h-[109px]",
    },
    {
      id: "trasera",
      style: "left-[105px] top-[30px] w-[112px] h-[106px]",
    },
    {
      id: "superior",
      style: "left-[110px] top-[144px] w-[100px] h-[238px]",
    },
    {
      id: "izquierdo",
      style: "left-[8px] top-[144px] w-[91px] h-[234px]",
    },
    {
      id: "derecho",
      style: "left-[217px] top-[143px] w-[94px] h-[240px]",
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Selecciona áreas del camión</h2>

      <div className="relative w-[320px]">
        <img src="/diagrama_camion.png" alt="Diagrama Camión" className="w-full" />

        {truckAreas.map((area) => (
          <div
            key={area.id}
            onClick={(e) => handleClick(e, area.id)}
            className={`absolute ${area.style} border-2 border-transparent cursor-pointer`}
          >
            {/* Renderizar puntos clickeados */}
            {points[area.id].map((point, idx) => (
              <div
                key={idx}
                className="absolute w-[8px] h-[8px] bg-red-500 rounded-full"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveTruck;
