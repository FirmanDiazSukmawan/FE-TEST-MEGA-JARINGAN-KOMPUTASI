import React, { useEffect, useState } from 'react';
import { OrderData, OrderFields } from '@/type/Type';
import Image from 'next/image';


interface OrderModalProps<T extends OrderFields | OrderData> {
  isOpen: boolean;
  mode: 'create' | 'edit';
  orderData: T;
  onClose: () => void;
  onChange: <K extends keyof T>(field: K, value: T[K]) => void;
  onSubmit: () => void;
}

const OrderModal = <T extends OrderFields | OrderData> ({
  isOpen,
  mode,
  orderData,
  onClose,
  onChange,
  onSubmit,
} : OrderModalProps<T>) => {
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (orderData.image && typeof orderData.image === "string") {
      setImagePreview(orderData.image);
    }
  }, [orderData.image]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    onChange("image" as keyof T, file as any); 
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md shadow-xl border border-purple-700 overflow-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-4 text-purple-300">
          {mode === 'create' ? 'Create New Order' : 'Edit Order'}
        </h2>

        <div className="space-y-4 text-white">
         <div>
            <label className="block text-sm font-medium mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0
                         file:text-sm file:font-semibold
                         file:bg-purple-600 file:text-white
                         hover:file:bg-purple-700
                         cursor-pointer
              "
            />
            {imagePreview && (
             <Image
                width={160}
                height={160}
                src={imagePreview}
                alt="Preview"
                className="mt-2 max-h-40 rounded-md object-contain border border-gray-600"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              value={orderData.name}
              onChange={e => onChange('name', e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Product Name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                min={0}
                value={orderData.quantity}
                onChange={e => onChange('quantity', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                min={0}
                value={orderData.weight}
                onChange={e => onChange('weight', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="0.0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={orderData.description}
              onChange={e => onChange('description', e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
              rows={3}
              placeholder="Product description..."
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 active:scale-95 transition-transform duration-150 ease-in-out rounded-md text-white"
          >
            {mode === 'create' ? 'Create' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
