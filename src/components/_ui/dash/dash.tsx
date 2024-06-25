"use client";

import { useEffect, useState } from "react";
import data from "../../../../data.json";
import { Order } from '../../../types/orderTypes';
import { HandCoins, Package, PackageCheck, PackageX, FileBox, CandlestickChart, TrendingUp } from "lucide-react";

export default function Dash() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [averageRevenue, setAverageRevenue] = useState(0);
  const [refundRate, setRefundRate] = useState(0);
  const [deliveryStatus, setDeliveryStatus] = useState(0);
  const [deliveryProblem, setDeliveryProblem] = useState(0);
  const [deliveryConfirmation, setDeliveryConfirmation] = useState(0);
  const [refundRequested, setRefundRequested] = useState(0);

  useEffect(() => {
    setOrders(data);
    calculateMetrics(data);
  }, []);

  const calculateMetrics = (data: Order[]) => {
    let total = 0;
    let refundCount = 0;
    let deliveryStatusCount = 0;
    let deliveryProblemCount = 0;
    let deliveryConfirmationCount = 0;
    let refundRequestedCount = 0;

    data.forEach(order => {
      total += order.valorTotal;

      switch (order.status) {
        case "Rastreio e nota enviados":
          deliveryStatusCount++;
          break;
        case "Problema na entrega":
          deliveryProblemCount++;
          break;
        case "Confirmação de Entrega":
          deliveryConfirmationCount++;
          break;
        case "Reembolso solicitado":
          refundRequestedCount++;
          refundCount++;
          break;
        default:
          break;
      }
    });

    setTotalValue(total);
    setAverageRevenue(total / data.length);
    setRefundRate((refundCount / data.length) * 100);
    setDeliveryStatus(deliveryStatusCount);
    setDeliveryProblem(deliveryProblemCount);
    setDeliveryConfirmation(deliveryConfirmationCount);
    setRefundRequested(refundRequestedCount);
  };

  return (
    <>
      <div className="pt-8 w-full max-w-10xl">
        <h1 className="text-2xl font-semibold text-primary dark:text-foreground my-1">
          Dashboard
        </h1>
      </div>
      <div className="flex flex-row w-full justify-start gap-4">
        <MetricCard 
          icon={<TrendingUp size={24} color="#fff" strokeWidth={1.5} />} 
          value={`$${totalValue.toFixed(2)}`} 
          label="Valor total de pedidos" 
        />
        <MetricCard 
          icon={<Package size={24} color="#fff" strokeWidth={1.5} />} 
          value={orders.length} 
          label="Quantidade de pedidos" 
        />
        <MetricCard 
          icon={<CandlestickChart size={24} color="#fff" strokeWidth={1.5} />} 
          value={`$${averageRevenue.toFixed(2)}`} 
          label="Receita Média por Pedido" 
        />
        <MetricCard 
          icon={<HandCoins size={24} color="#fff" strokeWidth={1.5} />} 
          value={`${refundRate.toFixed(2)}%`} 
          label="Taxa de Reembolso" 
        />
      </div>
      <div className="flex flex-col w-full container-bg justify-start p-4 items-center shadow-sm gap-2 rounded-md">
        <div className="flex flex-col w-full">
          <h1 className="flex justify-start w-full font-semibold text-xl text-tertiary">
            Status
          </h1>
          <h1 className="flex justify-start w-full font-base text-sm text-tertiary">
            Monitore o status de entrega de todos os pedidos em tempo real
          </h1>
        </div>
        <div className="flex flex-row w-full">
          <StatusCard 
            icon={<FileBox size={24} color="#fff" strokeWidth={1.5} />} 
            label="Rastreio e nota enviados" 
            value={deliveryStatus} 
            color="#3b82f6" 
          />
          <StatusCard 
            icon={<PackageX size={24} color="#fff" strokeWidth={1.5} />} 
            label="Problema na entrega" 
            value={deliveryProblem} 
            color="#ef4444" 
          />
          <StatusCard 
            icon={<PackageCheck size={24} color="#fff" strokeWidth={1.5} />} 
            label="Confirmação de Entrega" 
            value={deliveryConfirmation} 
            color="#22c55e" 
          />
          <StatusCard 
            icon={<PackageCheck size={24} color="#fff" strokeWidth={1.5} />} 
            label="Reembolso solicitado" 
            value={refundRequested} 
            color="#eab308" 
          />
        </div>
      </div>
    </>
  );
}

const MetricCard = ({ icon, value, label }: { icon: React.ReactNode, value: string | number, label: string }) => (
  <div className="flex flex-col w-[300px] h-[auto] container-bg justify-start p-4 items-center shadow-sm gap-2 rounded-md">
    <div className="flex flex-row w-full justify-start gap-2 items-center">
      <div className=" w-[auto] bg-[#805ad5] p-2 rounded-lg shadow-md items-center ">
        {icon}
      </div>
    </div>
    <h3 className="text-2xl font-semibold text-primary dark:text-foreground my-1 text-start w-full">
      {value}
      <h2 className="text-sm font-semibold text-tertiary my-1 text-start w-full">
        {label}
      </h2>
    </h3>
  </div>
);

const StatusCard = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string | number, color: string }) => (
  <div className="flex flex-col w-[300px] h-[auto] justify-start items-center">
    <div className="flex flex-row w-full justify-start gap-2 items-center">
      <div className=" w-[auto] p-2 rounded-lg shadow-md items-center" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div>
        <h2 className="text-sm font-base text-tertiary my-1 text-start w-full">
          {label}
        </h2>
        <h2 className="text-xl font-base text-tertiary my-1 text-start w-full">
          {value}
        </h2>
      </div>
    </div>
  </div>
);
