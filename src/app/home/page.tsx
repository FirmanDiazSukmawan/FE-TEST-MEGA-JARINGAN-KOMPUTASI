"use client"
import React, { useEffect, useState } from 'react';
import { OrderData, OrderFields } from '@/type/Type';
import { FiPlus } from 'react-icons/fi';
import OrderList from '@/component/table.tsx/OrderList';
import OrderModal from '@/component/table.tsx/OrderModal';
import axiosInstance from '@/utils/axios';
import { useAuthStore } from '@/utils/zustand/auth';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';


interface RawOrderData {
  order_id: number;
  name_product: string;
  qty: string;
  berat: string;
  description: string;
  foto_product: string;
  user_id: number | null;
}


const HomePage = () => {
 const [orders, setOrders] = useState<OrderData[]>([]);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const itemsPerPage = 10;
const user = useAuthStore(state => state.user);
const logout = useAuthStore(state=> state.logout)
const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [currentOrder, setCurrentOrder] = useState<OrderData | null>(null);
const [newOrder, setNewOrder] = useState<Omit<OrderData, 'id'>>({
    image: '', name: '', quantity: 0, weight: 0, description: ''
  });
const route = useRouter()


 const handleCreateOrder = async () => {
  try {
    const formData = new FormData();
    formData.append("name_product", newOrder?.name);
    formData.append("qty", (newOrder?.quantity ?? 0).toString());
    formData.append("berat", (newOrder?.weight ?? 0).toString());
    formData.append("description", newOrder?.description);
    formData.append("foto_product", newOrder?.image);
    formData.append("user_id", (user?.id ?? 0).toString());

    const res = await axiosInstance.post("order", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(res)

    toast.success("Create order success!");
    setIsCreateModalOpen(false);
    getDataOrder();
    setNewOrder({ image: '', name: '', quantity: 0, weight: 0, description: '' });
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to create order";
    toast.error(`Create order failed: ${errorMessage}`);
    console.log("Create order failed:", error.response?.data || error.message);
  }
};



  const handleUpdateOrder = async() => {
    if (!currentOrder) return;
    try {
    const formData = new FormData();
    formData.append("name_product", currentOrder?.name);
    formData.append("qty", (currentOrder?.quantity ?? 0).toString());
    formData.append("berat", (currentOrder?.weight ?? 0).toString());
    formData.append("description", currentOrder?.description);
   if (currentOrder.image instanceof File) {
      formData.append("foto_product", currentOrder.image);
      }
    formData.append("user_id", (user?.id ?? 0).toString());

    const res = await axiosInstance.put(`order/${currentOrder?.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });


    toast.success("Create order success!");
    setIsEditModalOpen(false);
    setCurrentOrder(null);
    getDataOrder();
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to create order";
    toast.error(`Create order failed: ${errorMessage}`);
    console.log("Create order failed:", error.response?.data || error.message);
  }
   
  };

const handleDeleteOrder = async (id: number) => {
  const confirmResult = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel',
  });

  if (confirmResult.isConfirmed) {
    try {
      await axiosInstance.delete(`order/${id}`);
      setOrders(prev => prev.filter(order => order.id !== id));
      if (currentOrder && currentOrder.id === id) {
        setCurrentOrder(null);
        setIsEditModalOpen(false);
      }
      Swal.fire('Deleted!', 'Your order has been deleted.', 'success');
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Failed to delete order';
      Swal.fire('Error!', message, 'error');
    }
  }
};

const handleLogout = async () => {
  const confirmResult = await Swal.fire({
    title: 'Are you sure?',
    text: "You will Logged Out",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No, cancel',
  });

  if (confirmResult.isConfirmed) {
    try {
      await logout()
      Swal.fire('Logout', 'Logout Succesfully', 'success');
      route.replace('/')
      
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Logout Failed';
      Swal.fire('Error!', message, 'error');
    }
  }
};

  const handleEditOpen = (order: OrderData) => {
   
    setCurrentOrder(order);
    setIsEditModalOpen(true);
  };

  const handleCreateChange = <K extends keyof OrderFields>(field: K, value: OrderFields[K]) => {

  setNewOrder(prev => ({ ...prev, [field]: value }));

  
};



const handleEditChange = <K extends keyof OrderData>(field: K, value: OrderData[K]) => {
  if (!currentOrder) return;
  setCurrentOrder({ ...currentOrder, [field]: value });
};

const getDataOrder = async () => {
    try {
      const res = await axiosInstance.get(`order/user/${user?.id}`, {
        params: {
          page: currentPage,
          limit: itemsPerPage,
        },
      });

      const mappedOrders = res?.data?.data?.map((item: RawOrderData) => ({
        id: item.order_id,
        name: item.name_product,
        quantity: Number(item.qty),
        weight: Number(item.berat),
        description: item.description,
        image: item.foto_product,
        user_id: item.user_id ?? null,
      }));

      setOrders(mappedOrders);
      setTotalPages(res?.data?.pagination?.totalPage); 
    } catch (error) {
      console.log(error);
    }
  };



useEffect(() => {
  if (!user?.id) return; 


  getDataOrder();
}, [currentPage,user?.id]);




  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-800 text-white px-4 py-8">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-3xl font-extrabold mb-8 text-purple-300 drop-shadow-lg text-center md:text-left">
          Order Management
        </h1>

        <div className="flex  justify-between mb-6">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 active:scale-95 transition-transform duration-150 ease-in-out text-white px-5 py-3 rounded-md flex items-center shadow-lg"
          >
            <FiPlus className="mr-2" />
            Create New Order
          </button>
           <button
            onClick={handleLogout}
            className="bg-gray-500 hover:bg-gray-900 active:scale-95 transition-transform duration-150 ease-in-out text-white px-5 py-3 rounded-md flex items-center shadow-lg"
          >
           Logout
          </button>
        </div>

        <OrderList
          orders={orders}
          onEdit={handleEditOpen}
          onDelete={handleDeleteOrder}
        />

        <OrderModal
          isOpen={isCreateModalOpen}
          mode="create"
          orderData={newOrder}
          onClose={() => setIsCreateModalOpen(false)}
          onChange={handleCreateChange}
          onSubmit={handleCreateOrder}
        />

        {currentOrder && (
          <OrderModal
            isOpen={isEditModalOpen}
            mode="edit"
            orderData={currentOrder}
            onClose={() => setIsEditModalOpen(false)}
            onChange={handleEditChange}
            onSubmit={handleUpdateOrder}
          />
        )}
        <div className="flex justify-center items-center gap-4 mt-8">
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className="px-4 py-2 rounded bg-purple-500 hover:bg-purple-600 disabled:opacity-50"
  >
    Previous
  </button>
  <span>Page {currentPage} of {totalPages}</span>
  <button
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
    className="px-4 py-2 rounded bg-purple-500 hover:bg-purple-600 disabled:opacity-50"
  >
    Next
  </button>
</div>

      </div>
    </div>
  );
};

export default HomePage;
