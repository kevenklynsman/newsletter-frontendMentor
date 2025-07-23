import type { User } from "../components/form/Form.js";

export function validate(data: User): User {
  const errors: User = {};

  if (!data.email) {
    errors.email = "O email é obrigatório";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "O email é inválido"; 
  }

  return errors;
}

