import { createContext, useState, type ReactNode } from "react";

export interface TodoProviderProps {
    children: ReactNode;
};

export interface Todo {
    id: string;
    task: string;
    completed: boolean;
    createAt: Date;
};


export type Edit = {
    todo: Todo | null;
    isEdit: boolean;
};

export type TodoContextProps = {
    todos: Todo[];
    handleAddTodo: (task: string) => void;
    handleDeleteTodo: (id: string) => void;
    handleIsCompleted: (id: string) => void;

    edit: Edit;
    handleEditTodo: (todo: Todo) => void;
    handleUpdateTodo: (task: string) => void;
};

const TodoContext = createContext<TodoContextProps | null>(null);

export const TodoProvider = ({ children }: TodoProviderProps) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [edit, setEdit] = useState<Edit>({
        todo: null,
        isEdit: false,
    });


    const handleAddTodo = (task: string) => {
        const newTodo: Todo = {
            id: Date.now().toString(),
            task,
            completed: false,
            createAt: new Date(),
        };
        setTodos((prev) => [...prev, newTodo]);
    };

    const handleDeleteTodo = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }

    const handleEditTodo = (todo: Todo) => {
        setEdit({ todo, isEdit: true });
    }

    const handleUpdateTodo = (task: string) => {

        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === edit.todo!.id
                    ? { ...todo, task }
                    : todo
            )
        );

        setEdit({ todo: null, isEdit: false })
    }

    const handleIsCompleted = (id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    };


    return (
        <TodoContext.Provider value={{ todos, edit, handleAddTodo, handleDeleteTodo, handleEditTodo, handleUpdateTodo, handleIsCompleted }}>
            {children}
        </TodoContext.Provider>
    );
};

export default TodoContext;
