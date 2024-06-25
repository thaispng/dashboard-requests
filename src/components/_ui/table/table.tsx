import React, { useState } from 'react'; 
import data from '../../../../data.json';
import StatusCard from '../status/status';
import Button from '../button/button';
import { AArrowUp, AArrowDown, Search } from 'lucide-react';
import Input from '../input/input';

export default function Table() {
  const [sortedData, setSortedData] = useState(data);
  const [isSorted, setIsSorted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  const formatCPF = (cpf: string) => {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  };

  const formatCurrency = (value: string) => {
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

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
    const filteredData = data.filter(item =>
      item.cliente.nome.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSortedData(filteredData);
  };

  return (
    <>
      <div className="flex flex-col w-full h-full container-bg rounded-md px-0 py-5 gap-3 border-[1px] border-color">
        <div className='flex flex-row justify-between items-center px-4 w-full'>
          <Input
            placeholder='Pesquisar'
            type='text'
            onChange={handleSearchChange}
            Icon={Search}
          />
          <Button
            text="Ordem Alfábetica"
            onClick={handleSort}
            Icon={isSorted ? AArrowDown : AArrowUp}
          />
        </div>
        <table className="flex flex-col w-full h-full container-bg rounded-md px-0">
          <thead className='w-full container-secondary p-2 px-6 border-y-[1px] border-color'>
            <tr className="flex flex-row w-full justify-between text-tertiary ">
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
              <tr key={item.id} className="flex flex-row w-full justify-between px-6 py-1 items-center border-b-[1px] border-color">
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
      </div>
    </>
  );
}
