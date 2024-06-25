import React from 'react';

const statusStyles: { [key: string]: { bg: string, text: string, fontWeight: string } } = {
  'Rastreio e nota enviados': { bg: 'bg-blue-400 bg-opacity-10', text: 'text-blue-800', fontWeight: 'font-semibold' },
  'Problema na entrega': { bg: 'bg-red-400 bg-opacity-10', text: 'text-red-800', fontWeight: 'font-semibold' },
  'Confirmação de Entrega': { bg: 'bg-green-400 bg-opacity-10', text: 'text-green-800', fontWeight: 'font-semibold' },
  'Reembolso solicitado': { bg: 'bg-yellow-400 bg-opacity-10', text: 'text-yellow-800', fontWeight: 'font-semibold' },
};

const StatusCard = ({ status }: { status: string }) => {
  const { bg, text, fontWeight } = statusStyles[status] || { bg: 'bg-gray-200', text: 'text-gray-700', fontWeight: 'font-normal' };

  return (
    <div className={`p-2 rounded-lg ${bg} my-1 border-[1px] border-color`}>
      <p className={`font-base text-sm ${text} ${fontWeight}`}>{status}</p>
    </div>
  );
};

export default StatusCard;
