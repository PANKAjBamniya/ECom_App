import { useState, useContext, type FormEvent, useEffect } from "react";
import TodoContext from "../context/todoContext";

const AddTodo = () => {
    const [todo, setTodo] = useState("");

    const todoContext = useContext(TodoContext);

    if (!todoContext) {
        throw new Error("AddTodo must be used inside TodoProvider");
    }

    const { handleAddTodo, handleUpdateTodo, edit } = todoContext;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (edit.isEdit) {
            handleUpdateTodo(todo);
        } else {
            handleAddTodo(todo);
        }

        setTodo("");
    };


    useEffect(() => {
        if (edit.isEdit && edit.todo) {
            setTodo(edit.todo.task);
        }
    }, [edit])


    return (
        <div className="flex  mt-10">
            <form
                onSubmit={handleSubmit}
                className="flex gap-2 bg-white p-4 rounded-lg shadow-md w-full max-w-md"
            >
                <input
                    type="text"
                    placeholder="Enter your task..."
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    className={`text-white px-4 py-2 rounded-md transition
                    ${edit.isEdit ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`}
                >
                    {edit.isEdit ? "Update" : "Save"}
                </button>
            </form>
        </div>
    );
};

export default AddTodo;
