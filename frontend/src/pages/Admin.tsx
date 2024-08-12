import  { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../components/Table';
import Loader from '../components/Loader';
const BASE_URL = import.meta.env.VITE_BASE_URL;
interface PortalItem {
  id: number;
  description: string;
  endTime: string;
  visible: boolean;
  link: string;
}

const Admin = () => {
  const [items, setItems] = useState<PortalItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/banners`); 
        console.log(response.data);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleActive = async (id: number, visible: boolean) => {
    const response = await axios.post(`${BASE_URL}/api/banners/${id}/toggle-visibility`, {visible}); 
    if(response.data.message){
      setItems(items.map(item => 
        item.id === id ? { ...item, visible: !item.visible } : item
      ));
    }
    
  };

  const handleUpdate = (id: number) => {
    console.log(id);
  };  

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      {loading ? <Loader size='lg'/> :  <Table 
        items={items} 
        onToggleActive={toggleActive} 
        onUpdate={handleUpdate} 
      />}
     
    </div>
  );
};

export default Admin;
