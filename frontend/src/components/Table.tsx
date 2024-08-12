
import React from 'react';

interface TableItem {
  id: number;
  description: string;
  endTime: string;
  isActive: boolean;
  link: string;
}

interface TableProps {
  items: TableItem[];
  onToggleActive: (id: number) => void;
  onUpdate: (id: number) => void;
}

const Table = ({ items, onToggleActive, onUpdate }:TableProps) => {
  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial Number</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.endTime}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <button
                  onClick={() => onToggleActive(item.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {item.isActive ? 'Active' : 'Inactive'}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                <button
                  onClick={() => onUpdate(item.id)}
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
  );
};

export default Table;