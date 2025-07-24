import React from 'react';

const CastingKitTable = ({ kits, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Stock</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {kits.map((kit) => (
            <tr key={kit._id} className="border-t">
              <td className="p-3">
                <img
                  src={kit.images?.[0]?.url}
                  alt={kit.title}
                  className="h-16 w-16 object-cover rounded"
                />
              </td>
              <td className="p-3">{kit.title}</td>
              <td className="p-3">₹{kit.price}</td>
              <td className="p-3">{kit.stock}</td>
              <td className="p-3">
                <button
                  onClick={() => onDelete(kit._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CastingKitTable;
