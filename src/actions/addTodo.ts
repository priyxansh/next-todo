"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const addTodo = async (formData: FormData) => {
    try {
        const todoText = formData.get("todotext") as string;

        if (!todoText) {
            throw new Error("Todo text is required");
        }

        await prisma.todo.create({
            data: {
                text: todoText,
            },
        });
        revalidatePath("/todos");
    } catch (error) {}
};
