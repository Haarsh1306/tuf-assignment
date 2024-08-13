import { useState, useEffect } from "react";
import axios from "axios";
import Table from "../components/Table";
import Loader from "../components/Loader";
const BASE_URL = import.meta.env.VITE_BASE_URL;

interface TableItem {
  id: number;
  description: string;
  endTime: string;
  visible: boolean;
}

const Admin = () => {
  const [items, setItems] = useState<TableItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/banners`);
        console.log(response.data);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleActive = async (id: number, visible: boolean) => {
    const response = await axios.post(
      `${BASE_URL}/api/banners/${id}/toggle-visibility`,
      { visible }
    );
    if (response.data.message) {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, visible: !item.visible } : item
        )
      );
    }
  };

  const handleUpdate = async (updatedItem : TableItem) => {
    try{
      const response = await axios.put(`${BASE_URL}/api/update-banner/${updatedItem.id}`, updatedItem);
      if(response.data.message){
        setItems(
          items.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
          )
        );

        return true;
      }
      else return false;
    }
    catch(error){
      console.error("Error updating item:", error);
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      {loading ? (
        <Loader size="lg" />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold text-gray-300 mb-6 text-center">
            Available Banners
          </h2>
          <Table
            items={items}
            onToggleActive={toggleActive}
            onUpdate={handleUpdate}
          />
        </div>
      )}
    </div>
  );
};

export default Admin;
