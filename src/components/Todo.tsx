"use client";

import { useOptimistic, useTransition } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import { checkTodo } from "@/actions/checkTodo";
import { deleteTodo } from "@/actions/deleteTodo";

type TodoProps = Todo & {};

const Todo = ({ id, text, completed }: TodoProps) => {
    const [isPending, startTransition] = useTransition();

    return (
        <div className="bg-slate-800 px-6 py-3 rounded">
            <form className="flex gap-2 items-center">
                <Checkbox.Root
                    className="border-2 appearance-none outline-none focus-visible:ring-2 focus-visible:ring-black border-sky-300 rounded bg-transparent w-5 h-5"
                    defaultChecked={completed}
                    id={`complete-todo-${id}`}
                    name="completed"
                    onClick={() => {
                        startTransition(() => {
                            checkTodo(id, completed);
                        });
                    }}
                >
                    <Checkbox.Indicator className="w-4 h-4 rounded bg-sky-300">
                        <CheckIcon className="text-sky-300" />
                    </Checkbox.Indicator>
                </Checkbox.Root>
                <label
                    htmlFor={`complete-todo-${id}`}
                    className={`${completed ? "line-through" : ""}`}
                >
                    {text}
                </label>
                <button type="submit" formAction={() => deleteTodo(id)} className="ml-auto">
                    <Cross1Icon className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
};

export default Todo;
