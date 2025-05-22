import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onDelete }) => (
  <div className="flex space-x-3 justify-center">
    <button
      onClick={onEdit}
      className="text-purple-400 hover:text-purple-200 p-2 rounded-full hover:bg-purple-700 transition-colors duration-200 active:scale-90"
      aria-label="Edit Order"
    >
      <FiEdit size={20} />
    </button>
    <button
      onClick={onDelete}
      className="text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-red-700 transition-colors duration-200 active:scale-90"
      aria-label="Delete Order"
    >
      <FiTrash2 size={20} />
    </button>
  </div>
);

export default ActionButtons;
