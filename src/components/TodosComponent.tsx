"use client";

import { useOptimistic } from "react";
import AddTodoForm from "./AddTodoForm";
import ScrollArea from "./ui/ScrollArea";

type TodosComponentProps = {
    todos: Todo[];
};

const TodosComponent = ({ todos }: TodosComponentProps) => {
    const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos);

    return (
        <section className="flex flex-col gap-6 w-11/12 max-w-[500px] m-auto">
            <h2 className="text-3xl text-center font-semibold">Todos</h2>
            <AddTodoForm setOptimisticTodos={setOptimisticTodos} />
            <ScrollArea todos={optimisticTodos} setOptimisticTodos={setOptimisticTodos}/>
        </section>
    );
};

export default TodosComponent;
