"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const addTodo = async (formData: FormData) => {

    try {
        await prisma.todo.create({
            data: {
                text: formData.get("todotext") as string,
            },
        });
        revalidatePath("/todos");
    } catch (error) {}
};
