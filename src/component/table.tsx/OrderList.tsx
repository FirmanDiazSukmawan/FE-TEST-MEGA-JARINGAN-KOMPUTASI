import React from 'react';
import { OrderData } from '@/type/Type';
import OrderTable from './OrderTable';
import OrderCard from './OrderCard';

interface OrderListProps {
  orders: OrderData[];
  onEdit: (order: OrderData) => void;
  onDelete: (id: number) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onEdit, onDelete }) => {
  return (
    <>
      <OrderTable orders={orders} onEdit={onEdit} onDelete={onDelete} />
      <div className="md:hidden bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {orders.map(order => (
          <OrderCard key={order.id} order={order} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </>
  );
};

export default OrderList;
