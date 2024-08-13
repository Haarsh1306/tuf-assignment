import { useState } from "react";
import UpdatePopup from "./UpdatePopUp";

interface TableItem {
  id: number;
  description: string;
  endTime: string;
  visible: boolean;
}

interface TableProps {
  items: TableItem[];
  onToggleActive: (id: number, visible: boolean) => void;
  onUpdate: (updatedItem: TableItem) => Promise<boolean>;
}

const formatEndTime = (endTime: string): string => {
  const date = new Date(endTime);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const Table = ({ items, onToggleActive, onUpdate }: TableProps) => {
  const [selectedItem, setSelectedItem] = useState<TableItem | null>(null);

  const handleUpdate = (id: number) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      setSelectedItem(item);
    }
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
  };

  const handleSaveUpdate = async (updatedItem: TableItem) => {
    const res =await  onUpdate(updatedItem);
    if(res==true){
      setSelectedItem(null);
    }
  };

  return (
    <>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                S. No.
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
              >
                End Time
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell"
              >
                Link
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="md:hidden font-bold mb-1">Description:</div>
                  {item.description}
                  <div className="md:hidden mt-2">
                    <div className="font-bold mb-1">End Time:</div>
                    {formatEndTime(item.endTime)}
                  </div>
                  <div className="sm:hidden mt-2">
                    <div className="font-bold mb-1">Status:</div>
                    {item.visible ? "Active" : "Inactive"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                  {formatEndTime(item.endTime)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center hidden sm:table-cell">
                  <label className="inline-flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={item.visible}
                        onChange={() => onToggleActive(item.id, !item.visible)}
                      />
                      <div
                        className={`block w-10 h-6 rounded-full ${
                          item.visible ? "bg-green-400" : "bg-red-400"
                        }`}
                      ></div>
                      <div
                        className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                          item.visible ? "transform translate-x-4" : ""
                        }`}
                      ></div>
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-700">
                      {item.visible ? "Active" : "Inactive"}
                    </span>
                  </label>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm hidden lg:table-cell">
                  <a
                    href={`/banner/${item.id}`}
                    className="text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-md transition duration-300"
                  >
                    View Banner
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button
                    onClick={() => handleUpdate(item.id)}
                    className="text-indigo-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 px-3 py-1 rounded-md transition duration-300"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedItem && (
        <UpdatePopup
          item={selectedItem}
          onClose={handleClosePopup}
          onSave={handleSaveUpdate}
        />
      )}
    </>
  );
};

export default Table;
