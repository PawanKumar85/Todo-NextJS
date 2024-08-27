import React from "react";

const Todo = ({ item, id, deleteFn, updateFn }) => {
  return (
    <>
      <tr className="border-b">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-purple-700 whitespace-nowrap "
        >
          {id + 1}
        </th>
        <td
          className={`${
            item.isCompleted ? "line-through" : ""
          } px-6 py-4 text-gray-800`}
        >
          {item.title}
        </td>
        <td
          className={`${
            item.isCompleted ? "line-through" : ""
          } px-6 py-4 text-gray-800`}
        >
          {item.description}
        </td>
        <td className="px-6 py-4">
          {item.isCompleted ? (
            <span class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
              <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
              Completed
            </span>
          ) : (
            <span class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
              <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
              Incomplete
            </span>
          )}
        </td>
        <td className="flex px-6 py-4 gap-[1px]">
          <button
            type="button"
            class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            onClick={() => deleteFn(item._id)}
          >
            Delete
          </button>

          {!item.isCompleted && (
            <button
              type="button"
              class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
              onClick={() => updateFn(item._id)}
            >
              Update
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

export default Todo;
