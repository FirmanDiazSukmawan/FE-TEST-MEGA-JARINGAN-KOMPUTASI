import React from 'react';
import { OrderData } from '@/type/Type';

import ActionButtons from '../button/ActionButton';

interface OrderCardProps {
  order: OrderData;
  onEdit: (order: OrderData) => void;
  onDelete: (id: number) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onEdit, onDelete }) => (
  <div className="md:hidden p-4 flex flex-col space-y-3 border-b border-gray-700 hover:bg-purple-900 transition-colors duration-200 last:border-b-0">
    <div className="flex items-center space-x-4">
      <img src={order.image} alt={order.name} className="w-16 h-16 object-cover rounded shadow-md" />
      <div className="flex-1 flex-wrap">
        <h3 className="font-semibold text-lg">{order.name}</h3>
        <p className="text-gray-300 ">{order.description}</p>
      </div>
    </div>
    <div className="flex justify-between text-sm text-gray-400">
      <div>Quantity: <span className="text-white">{order.quantity}</span></div>
      <div>Weight: <span className="text-white">{order.weight} kg</span></div>
    </div>
    <div className="flex space-x-4 self-end">
            <ActionButtons
              onEdit={() => onEdit(order)}
              onDelete={() => onDelete(order.id)}
            />
          
    </div>
  </div>
);

export default OrderCard;
