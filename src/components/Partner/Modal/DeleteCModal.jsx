import React from "react";

const DeleteCModal = ({ onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg">
        <p className="text-lg font-medium mb-2 text-white">Confirm Delete</p>
        <p className="text-gray-700 dark:text-gray-300">
          Are you sure you want to delete this car?
        </p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-1 ml-2 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCModal;
