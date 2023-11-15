"use client";

import Link from "next/link";
import AuthFormInput from "./AuthFormInput";
import SubmitButton from "./SubmitButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/zod/signupSchema";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type SignUpFormProps = {
    inputFields: {
        label: string;
        type: string;
        id: string;
        name: string;
        placeholder?: string;
    }[];
};

type Inputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const SignUpForm = ({ inputFields }: SignUpFormProps) => {
    const router = useRouter();
    const [pending, setPending] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setPending(true);

        const signInResponse = await signIn("credentials", {
            name: data.name,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
            isSignup: true,
            redirect: false,
        });

        if (signInResponse?.error === "Email already in use") {
            setError("email", {
                type: "manual",
                message: signInResponse.error,
            });
        }

        if (signInResponse?.error === "CredentialsSignin") {
            setError("email", {
                type: "manual",
                message: "Couldn't create account. Please try again.",
            });
        }

        console.log(signInResponse);
        

        if (!signInResponse?.error) {
            router.push("/");
        }

        setPending(false);
    };

    return (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            {inputFields.map(({ type, id, name, label, placeholder }) => (
                <AuthFormInput
                    type={type}
                    id={id}
                    name={name}
                    label={label}
                    placeholder={placeholder}
                    key={id}
                    register={register}
                    errors={errors}
                />
            ))}
            <Link href={"/auth/signin"} className="text-center">
                Already a user?{" "}
                <span className="underline text-sky-300">Log in</span>
            </Link>
            <SubmitButton pending={pending} text="Sign Up" />
        </form>
    );
};

export default SignUpForm;
