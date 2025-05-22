import React from 'react';
import { OrderData } from '@/type/Type';
import ActionButtons from '../button/ActionButton';


interface OrderTableProps {
  orders: OrderData[];
  onEdit: (order: OrderData) => void;
  onDelete: (id: number) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, onEdit, onDelete }) => (
  <>
    <div className="hidden md:grid grid-cols-12 bg-gray-700 p-4 font-semibold tracking-wide text-purple-300 select-none rounded-t-lg">
      <div className="col-span-2">Image</div>
      <div className="col-span-2">Name</div>
      <div className="col-span-1">Quantity</div>
      <div className="col-span-1">Weight (kg)</div>
      <div className="col-span-4">Description</div>
      <div className="col-span-2">Actions</div>
    </div>
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {orders.map(order => (
        <div
          key={order.id}
          className="border-b border-gray-700 hover:bg-purple-900 transition-colors duration-200 last:border-b-0 hidden md:grid grid-cols-12 p-4 items-center"
        >
          <div className="col-span-2">
            <img src={order.image} alt={order.name} className="w-16 h-16 object-cover rounded shadow-md" />
          </div>
          <div className="col-span-2">{order.name}</div>
          <div className="col-span-1">{order.quantity}</div>
          <div className="col-span-1">{order.weight}</div>
          <div className="col-span-4 text-gray-300">{order.description}</div>
          <div className="col-span-2">
            <ActionButtons
              onEdit={() => onEdit(order)}
              onDelete={() => onDelete(order.id)}
            />
          </div>
        </div>
      ))}
    </div>
  </>
);

export default OrderTable;
