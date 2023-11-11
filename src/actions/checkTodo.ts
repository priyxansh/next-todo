"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const checkTodo = async (id: number, completed: boolean) => {
    try {
        await prisma.todo.update({
            select: {
                completed: true,
            },
            where: {
                id: +id,
            },
            data: {
                completed: completed,
            },
        });

        revalidatePath("/todos");
    } catch (error) {}
};
