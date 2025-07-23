import { useState, type FormEvent } from "react";

import { validate } from "../../utils/validate.js";

export type User = {
  email?: string;
};

interface FormProps {
  onSuccess: () => void;
}

export default function Form({ onSuccess }: FormProps) {
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState<User | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    console.log("PreventDefault called?", event.preventDefault);
    event.preventDefault();
    setErrors(null);

    const data = {
      email,
    };

    const validateErrors = validate(data);

    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }

    setEmail("");
    onSuccess();
  }
  return (
    <>
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit}
        role="form"
      >
        <div>
          <label
            htmlFor="email"
            className="flex justify-between font-bold mb-2"
          >
            Email address
            {errors && (
              <small className="text-xs text-red-500 mt-1">
                {errors.email || "O email é obrigatório"}
              </small>
            )}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`border p-2 rounded w-full ${
              errors?.email
                ? "border-red-500 bg-red-200 text-red-600"
                : "border-gray-300"
            }`}
            placeholder="email@company.com"
          />
        </div>
        <button className="button">Subscribe to monthly newsletter</button>
      </form>
    </>
  );
}
