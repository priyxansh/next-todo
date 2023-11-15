"use client";

import Link from "next/link";
import AuthFormInput from "./AuthFormInput";
import SubmitButton from "./SubmitButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "@/zod/signinSchema";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type SignInFormProps = {
    inputFields: {
        label: string;
        type: string;
        id: string;
        name: string;
        placeholder?: string;
    }[];
};

type Inputs = {
    email: string;
    password: string;
};

const SignInForm = ({ inputFields }: SignInFormProps) => {
    const router = useRouter()
    const [pending, setPending] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<Inputs>({
        resolver: zodResolver(signinSchema),
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setPending(true);

        const signInResponse = await signIn("credentials", {
            email: data.email,
            password: data.password,
            isSignup: false,
            redirect: false,
        });

        if (signInResponse?.error === "User not found") {
            setError("email", {
                type: "manual",
                message: signInResponse.error,
            });
        }

        if (signInResponse?.error === "Invalid credentials") {
            setError("password", {
                type: "manual",
                message: signInResponse.error,
            });
        }

        if (signInResponse?.error === "CredentialsSignin") {
            setError("email", {
                type: "manual",
                message: "Couldn't sign you in. Please try again.",
            });
        }

        setPending(false);
        console.log(signInResponse);
        

        if (!signInResponse?.error) {
            router.push("/")
        }
    };

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            {inputFields.map(({ type, id, name, label, placeholder }) => (
                <AuthFormInput
                    type={type}
                    id={id}
                    name={name}
                    register={register}
                    label={label}
                    placeholder={placeholder}
                    key={id}
                    errors={errors}
                />
            ))}
            <Link href={"/auth/signup"} className="text-center">
                Not a user?{" "}
                <span className="underline text-sky-300">Become one now</span>
            </Link>
            <SubmitButton pending={pending} text="Sign In" />
        </form>
    );
};

export default SignInForm;
