import type { User } from "../components/Form";

type Error = {
  [key: string]: string;
};

export function validate(data: User) {
  const errors: Error = {};

  if (!data.email) {
    errors["email"] = "O email é obrigatório";
  }
  return errors;
}