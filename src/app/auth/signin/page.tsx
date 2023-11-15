import SignInForm from "@/components/SignInForm";

type SignInProps = {};

const SignIn = ({}: SignInProps) => {
    const inputFields = [
        {
            label: "Email",
            type: "email",
            id: "email",
            name: "email",
            placeholder: "johndoe@email.com",
        },
        {
            label: "Password",
            type: "password",
            id: "password",
            name: "password",
        },
    ];

    return (
        <section className="py-5 px-6 rounded-lg border-2 border-sky-300">
            <h1 className="text-center text-xl mb-6">Welcome Back</h1>
            <SignInForm inputFields={inputFields} />
        </section>
    );
};

export default SignIn;
