import { useContext } from "react";
import TodoContext from "../context/todoContext";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const AllTodo = () => {
    const todoContext = useContext(TodoContext);


    if (!todoContext) {
        throw new Error("AllTodo must be used inside TodoProvider");
    }

    const { todos, handleDeleteTodo, handleEditTodo, handleIsCompleted } = todoContext;

    return (
        <div className="mt-6 w-full mx-auto">
            {todos.length === 0 ? (
                <p className="text-center text-gray-500">No todos yet</p>
            ) : (
                <ul className="gap-4 flex flex-wrap">
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className="flex justify-between items-center bg-white p-3 rounded-lg shadow w-md"
                        >
                            <div className="flex flex-col gap-1">
                                <span
                                    className={`text-gray-800 ${todo.completed ? "line-through text-gray-200" : ""
                                        }`}
                                >
                                    {todo.task}
                                </span>

                                <span className="text-xs text-gray-400">
                                    {todo.createAt.toLocaleTimeString()}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <button onClick={() => handleEditTodo(todo)} className="p-2 bg-yellow-400 rounded-full">
                                    <CiEdit />
                                </button>
                                <button onClick={() => handleIsCompleted(todo.id)} className="p-2 bg-emerald-600 rounded-full">
                                    <FaCheckCircle />
                                </button>
                                <button
                                    onClick={() => handleDeleteTodo(todo.id)}
                                    className="p-2 bg-red-500 rounded-full text-white"
                                >
                                    <MdDeleteOutline />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AllTodo;
