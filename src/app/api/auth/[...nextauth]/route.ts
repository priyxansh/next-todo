import prisma from "@/lib/prisma";
import { signinSchema } from "@/zod/signinSchema";
import { signupSchema } from "@/zod/signupSchema";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "jsmith@email.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
                if (!credentials) return null;
                const { isSignup, name, email, password, confirmPassword } =
                    credentials;
                if (isSignup === "true") {
                    try {
                        signupSchema.parse({
                            name,
                            email,
                            password,
                            confirmPassword,
                        });

                        const user = await prisma.user.findUnique({
                            where: {
                                email,
                            },
                        });

                        if (user) {
                            const error = new Error("Email already in use");
                            error.name = "UserExistsError";
                            throw error;
                        }

                        const newUser = await prisma.user.create({
                            data: {
                                name: name as string,
                                email: email as string,
                                password: password as string,
                            },
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        });

                        return newUser as any;
                    } catch (error: any) {
                        if (error.name === "UserExistsError") throw error;
                        return null;
                    }
                }

                try {
                    signinSchema.parse({
                        email,
                        password,
                    });

                    const user = await prisma.user.findUnique({
                        where: {
                            email,
                        },
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            password: true,
                        },
                    });

                    if (!user) {
                        const error = new Error("User not found");
                        error.name = "UserNotFoundError";
                        throw error;
                    }

                    if (user.password !== password) {
                        const error = new Error("Invalid credentials");
                        error.name = "InvalidCredentialsError";
                        throw error;
                    }

                    const returnObject: Partial<typeof user> = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    };

                    return returnObject;
                } catch (error: any) {
                    if (
                        error.name === "UserNotFoundError" ||
                        error.name === "InvalidCredentialsError"
                    )
                        throw error;
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        session: async ({ session, token }) => {
            session.user.id = token.id as string;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
