import SignUpForm from "@/components/SignUpForm";

type SignUpProps = {};

const SignUp = ({}: SignUpProps) => {
    const inputFields = [
        {
            label: "Name",
            type: "text",
            id: "name",
            name: "name",
            placeholder: "John Doe",
        },
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
        {
            label: "Confirm Password",
            type: "password",
            id: "confirmPassword",
            name: "confirmPassword",
        },
    ];

    return (
        <section className="py-5 px-6 rounded-lg border-2 border-sky-300">
            <h1 className="text-center text-xl mb-6">Create An Account</h1>
            <SignUpForm inputFields={inputFields} />
        </section>
    );
};

export default SignUp;
