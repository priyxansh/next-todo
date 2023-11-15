"use client";

type SubmitButtonProps = {
    text: string;
    pending: boolean;
};

const SubmitButton = ({ text, pending }: SubmitButtonProps) => {
    return (
        <button
            type="submit"
            className={`px-4 py-2 bg-sky-300 text-slate-800 transition-colors rounded-lg hover:bg-slate-900 border-2 border-sky-300 hover:text-sky-300 active:scale-95`}
            disabled={pending}
            aria-disabled={pending}
        >
            {text}
        </button>
    );
};

export default SubmitButton;
