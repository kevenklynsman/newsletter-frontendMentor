import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form.js";
import "@testing-library/jest-dom";

describe("Form Component", () => {
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Comportamento básico", () => {
    it("renderiza corretamente", () => {
      render(<Form onSuccess={mockOnSuccess} />);

      expect(
        screen.getByPlaceholderText("email@company.com")
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /subscribe to monthly newsletter/i })
      ).toBeInTheDocument();
    });
  });

  describe("Validação de formulário", () => {
    it("chama onSuccess ao submeter formulário com email válido", () => {
      render(<Form onSuccess={mockOnSuccess} />);

      fireEvent.change(screen.getByPlaceholderText("email@company.com"), {
        target: { value: "teste@teste.com" },
      });

      fireEvent.click(
        screen.getByRole("button", {
          name: /subscribe to monthly newsletter/i,
        })
      );

      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    });

    it("mostra mensagem de erro para email inválido", () => {
      render(<Form onSuccess={mockOnSuccess} />);

      const emailInput = screen.getByPlaceholderText("email@company.com");
      fireEvent.change(emailInput, { target: { value: "" } });

      fireEvent.click(screen.getByRole("button"));

      const errorMessage = screen.getByText(/O email é obrigatório/i);
      expect(errorMessage).toBeInTheDocument();

      expect(mockOnSuccess).not.toHaveBeenCalled();
    });

    it("mostra mensagem de erro quando o email está vazio", () => {
      render(<Form onSuccess={mockOnSuccess} />);

      fireEvent.click(screen.getByRole("button"));

      expect(screen.getByText(/O email é obrigatório/i)).toBeInTheDocument();
      expect(mockOnSuccess).not.toHaveBeenCalled();
    });

    it("não mostra mensagens de erro inicialmente", () => {
      render(<Form onSuccess={mockOnSuccess} />);

      expect(
        screen.queryByText(/O email é obrigatório/i)
      ).not.toBeInTheDocument();
    });
  });

  describe("Comportamento visual", () => {
    it("aplica estilos de erro quando há validação falha", () => {
      render(<Form onSuccess={mockOnSuccess} />);

      fireEvent.click(screen.getByRole("button"));

      const input = screen.getByPlaceholderText("email@company.com");
      expect(input).toHaveClass("border-red-500");
      expect(input).toHaveClass("bg-red-200");
      expect(input).toHaveClass("text-red-600");
    });
  });

  describe("Comportamento após submissão", () => {
    it("limpa o campo de email após submissão bem-sucedida", () => {
      render(<Form onSuccess={mockOnSuccess} />);

      fireEvent.change(screen.getByPlaceholderText("email@company.com"), {
        target: { value: "teste@teste.com" },
      });

      fireEvent.click(screen.getByRole("button"));

      expect(screen.getByPlaceholderText("email@company.com")).toHaveValue("");
    });
  });

  describe("Comportamento do formulário", () => {
    it("previne o comportamento padrão do formulário", () => {
      const mockOnSuccess = jest.fn();
      render(<Form onSuccess={mockOnSuccess} />);

      fireEvent.change(screen.getByPlaceholderText("email@company.com"), {
        target: { value: "teste@teste.com" },
      });

      fireEvent.submit(screen.getByRole("form"));

      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
    });
  });
});
