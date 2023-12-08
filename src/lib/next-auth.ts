import prisma from "@/lib/prisma";
import { signinSchema } from "@/zod/signinSchema";
import { signupSchema } from "@/zod/signupSchema";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
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
                credentialsAvailable: true,
              },
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
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
              image: true,
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
            image: user.image,
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
    signIn: async ({ user, account }) => {
      try {
        if (account?.provider === "github") {
          const { id, name, email, image } = user!;

          const existingUser = await prisma.user.findUnique({
            where: {
              email: email as string,
            },
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          });

          if (existingUser) {
            return true;
          }

          await prisma.user.create({
            data: {
              name: name as string,
              email: email as string,
              image: image,
              githubId: id,
            },
          });
        }

        return true;
      } catch (error) {
        return false;
      }
    },
    jwt: async ({ token, user, account, trigger }) => {
      const loginMethod = account?.provider;

      if (user) {
        if (trigger === "signIn" && loginMethod === "github") {
          const existingUser = await prisma.user.findUnique({
            where: {
              githubId: user.id,
            },
            select: {
              id: true,
            },
          });

          token.id = existingUser?.id;
          token.loginMethod = loginMethod;

          return token;
        }

        token.id = user.id;
        token.loginMethod = loginMethod;
      }
      return token;
    },
    session: async ({ session, token }) => {
      const { id, loginMethod } = token;

      session.user = {
        ...session.user,
        id: id as string,
        loginMethod: loginMethod as string,
      };

      return session;
    },
  },
};

export const handler = NextAuth(authOptions);
