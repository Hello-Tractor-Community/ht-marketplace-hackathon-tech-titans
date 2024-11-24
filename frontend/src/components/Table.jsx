import React from 'react';

const Table = ({ columns, data, actions }) => {
  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index} className="border p-2 text-left bg-gray-100">
              {col.label}
            </th>
          ))}
          {actions && <th className="border p-2 text-left bg-gray-100">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="border p-2">
                  {row[col.field]}
                </td>
              ))}
              {actions && (
                <td className="border p-2 space-x-2">
                  {actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      onClick={() => action.onClick(row)}
                      className={`px-2 py-1 rounded ${action.className}`}
                    >
                      {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center p-4">
              No data available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
