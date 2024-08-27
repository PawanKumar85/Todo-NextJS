"use client";
import Todo from "@/components/Todo";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  // FIXME:
  const [todo, setTodo] = useState({
    title: "",
    description: "",
  });

  const [allTodos, setAllTodos] = useState([]);

  // FIXME:
  const setTitle = (event) =>
    setTodo({
      ...todo,
      ["title"]: event.target.value,
    });

  // FIXME:
  const setDescription = (event) =>
    setTodo({
      ...todo,
      ["description"]: event.target.value,
    });

  // FIXME:
  const resetForm = (event) =>
    setTodo({
      title: "",
      description: "",
    });

  // FIXME:
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // TODO: Implement API call to add todo
    try {
      const response = await axios.post("/api/Todo", todo);
      toast.success(response.data.message);
      resetForm();
      await fetchTodos();
    } catch (error) {
      toast.error(error.response.data.message);
    }
    
  };

  // FIXME:
  const fetchTodos = async () => {
    // TODO: Implement API call to add todo
    try {
      const response = await axios.get("/api/Todo");
      setAllTodos(response.data.todos);
      toast.success(response.data.message);
      // await fetchTodos();
    } catch (error) {
      toast.error(error.response.data.message);
    }
    
  };

  const deleteTodo = async (id) => {
    // TODO: Implement API call to add todo
    try {
      const response = await axios.delete("/api/Todo", {
        params: { id: id },
      });
      toast.success(response.data.message);
      await fetchTodos();
    } catch (error) {
      toast.error(error.response.data.message);
    }
    
  };
  const updateTodo = async (id) => {
    // TODO: Implement API call to add todo
    try {
      const response = await axios.put("/api/Todo",{}, {
        params: { id: id },
      });
      toast.success(response.data.message);
      await fetchTodos();
    } catch (error) {
      toast.error(error.response.data.message);
    }
    
  };

  useEffect(() => {
    fetchTodos();
  },[]);

  return (
    <>
      <section className="w-full md:w-[70%] py-24 px-2 mx-auto">
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <input
              type="text"
              value={todo.title}
              onChange={setTitle}
              className="w-full px-3 py-2 h-10 outline-none border-2 border-gray-400"
              placeholder="Enter Title..."
            />
          </div>
          <div className="mb-3">
            <textarea
              value={todo.description}
              onChange={setDescription}
              className="w-full px-3 py-2 outline-none border-2 border-gray-400"
              placeholder="Enter Description..."
              rows="5"
            />
          </div>
          <div className="mb-3">
            <button className="bg-gray-500 px-12 py-3 hover:bg-gray-700 rounded-md duration-200 transition-all text-white">
              Add Todo
            </button>
          </div>
        </form>

        <div className="py-10">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {allTodos.length > 0 &&
                  allTodos.map((item, index) => {
                    return (
                      <Todo
                        key={index}
                        item={item}
                        id={index}
                        deleteFn={deleteTodo}
                        updateFn={updateTodo}
                      />
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
