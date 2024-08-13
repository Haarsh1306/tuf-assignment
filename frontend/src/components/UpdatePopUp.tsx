import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface TableItem {
    id: number;
    description: string;
    endTime: string;
    visible: boolean;
}

interface UpdatePopupProps {
  item: TableItem;
  onClose: () => void;
  onSave: (updatedItem: TableItem) => void;
}

interface FormInputs {
  description: string;
  endTime: string;
}

const UpdatePopup: React.FC<UpdatePopupProps> = ({ item, onClose, onSave }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    defaultValues: {
      description: item.description,
      endTime: item.endTime.slice(0, 16),
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    onSave({ ...item, ...data });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md transform transition-all">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Banner</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="description">
              Description
            </label>
            <input
              {...register("description", { required: "Description is required", minLength: { value: 3, message: "Description must be at least 3 characters" } })}
              className={`shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <p className="text-red-500 text-xs italic mt-1">{errors.description.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="endTime">
              End Time
            </label>
            <input
              type="datetime-local"
              {...register("endTime", { required: "End time is required" })}
              className={`shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ${errors.endTime ? 'border-red-500' : ''}`}
            />
            {errors.endTime && <p className="text-red-500 text-xs italic mt-1">{errors.endTime.message}</p>}
          </div>
          <div className="flex items-center justify-between pt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePopup;