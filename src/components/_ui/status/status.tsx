import React from 'react';

const statusColors: { [key: string]: string } = {
  'Rastreio e nota enviados': 'bg-green-200',
  'Problema na entrega': 'bg-red-200',
  'Confirmação de Entrega': 'bg-blue-200',
  'Reembolso solicitado': 'bg-yellow-200',
};

const StatusCard = ({ status }: { status: string }) => {
  const colorClass = statusColors[status] || 'bg-gray-200';
  return (
    <div className={`p-4 rounded-lg  ${colorClass} my-1`}>
      <p className="font-semibold text-gray-700 text-sm ">{status}</p>
    </div>
  );
};

export default StatusCard;
