"use client";

import { addTodo } from "@/actions/addTodo";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useRef } from "react";
import { useFormStatus } from "react-dom";

type AddTodoFormProps = {};

const AddTodoForm = ({}: AddTodoFormProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    return (
        <form
            action={async (formData: FormData) => {
                await addTodo(formData);
                formRef.current?.reset();
            }}
            className=" px-2 rounded bg-slate-800 flex gap-2 items-center group focus-within:ring-2"
            ref={formRef}
        >
            <input
                type="text"
                name="todotext"
                className="bg-transparent border-none outline-none focus:ring-0 focus:ring-offset-0 w-full"
                placeholder="Add new todo"
            />
            <SubmitButton />
        </form>
    );
};

type SubmitButtonProps = {};

const SubmitButton = ({}: SubmitButtonProps) => {
    const { pending } = useFormStatus();

    return (
        <button type="submit" className="ml-auto" disabled={pending}>
            <ArrowRightIcon className="w-5 h-5" />
        </button>
    );
};

export default AddTodoForm;
