import React, { useState } from 'react'; 
import data from '../../../../data.json';
import StatusCard from '../status/status';
import Button from '../button/button';
import {AArrowUp, AArrowDown} from 'lucide-react';

export default function Table() {
  const [sortedData, setSortedData] = useState(data);
  const [isSorted, setIsSorted] = useState(false);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  const formatCPF = (cpf:string) => {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  };

  const formatCurrency = (value:string) => {
    const numericValue = parseFloat(value);
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numericValue);
  };

  const handleSort = () => {
    if (isSorted) {
      setSortedData(data);
    } else {
      const sorted = [...sortedData].sort((a, b) => {
        return a.cliente.nome.localeCompare(b.cliente.nome);
      });
      setSortedData(sorted);
    }
    setIsSorted(!isSorted);
  };

  return (
    <>
      <table className="flex flex-col w-full h-full container-bg rounded-md p-2 gap-2">
        <div>
        <div>
          <Button
            text="Ordem Alfábetica"
            onClick={handleSort}
            Icon={isSorted ? AArrowDown : AArrowUp}
          />
        </div>
        </div>
        <thead>
          <tr className="flex flex-row w-full justify-between text-tertiary">
            <th className="w-[20px] items-center text-center text-sm">id</th>
            <th className="w-[100px] items-center text-center text-sm">data</th>
            <th className="w-[150px] items-center text-center text-sm">nome</th>
            <th className="w-[100px] items-center text-center text-sm">cpf</th>
            <th className="w-[200px] items-center text-center text-sm">email</th>
            <th className="w-[100px] items-center text-center text-sm">valor Total</th>
            <th className="w-[200px] items-center text-center text-sm">status</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id} className="flex flex-row w-full justify-between items-center">
              <td className="w-[20px] items-center text-center text-base text-tertiary">{item.id}</td>
              <td className="w-[100px] items-center text-center text-base text-tertiary">{formatDate(item.data)}</td>
              <td className="w-[150px] items-center text-center text-base text-tertiary">{item.cliente.nome}</td>
              <td className="w-[150px] items-center text-center text-base text-tertiary">{formatCPF(item.cliente.cpf)}</td>
              <td className="w-[200px] items-center text-center text-base text-tertiary">{item.cliente.email}</td>
              <td className="w-[100px] items-center text-center text-base text-tertiary">{formatCurrency(item.valorTotal.toString())}</td>
              <td className="w-[200px] items-center text-center text-base text-tertiary"><StatusCard status={item.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
