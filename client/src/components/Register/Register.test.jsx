import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Register from "./Register";
import { useRegister } from "../../api/authApi";
import { useUserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import { MemoryRouter } from "react-router";

const mockNavigate = vi.fn();
vi.mock("../../api/authApi", () => ({
    useRegister: vi.fn().mockReturnValue({
        register: vi.fn()
    }),
}));

vi.mock("../../contexts/UserContext", () => ({
    useUserContext: vi.fn().mockReturnValue({
        userLoginHandler: vi.fn()
    }),
}));

vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

vi.mock("react-router", async () => {
    const actualRouter = await vi.importActual("react-router");
    return {
        ...actualRouter, // Import everything else from react-router-dom
        MemoryRouter: ({ children }) => <div>{children}</div>,
        useNavigate: () => mockNavigate,
    };
});

describe("Register Component", () => {

    it("renders the register form correctly", () => {
        render(<MemoryRouter><Register /></MemoryRouter>);

        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^password:$/im)).toBeInTheDocument();
        expect(screen.getByLabelText(/Repeat Password:/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
    });

    it("submits the form and calls register with correct data", async () => {
        const mockRegister = vi.fn().mockResolvedValue({ token: "mockToken" });
        const mockUserLoginHandler = vi.fn();
        useRegister.mockReturnValue({ register: mockRegister });
        useUserContext.mockReturnValue({ userLoginHandler: mockUserLoginHandler });

        render(<MemoryRouter><Register /></MemoryRouter>);

        const usernameInput = screen.getByLabelText(/username/i);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/^password:$/im);
        const confirmPasswordInput = screen.getByLabelText(/Repeat Password:/i);
        const profilePictureInput = screen.getByLabelText(/Profile Picture \(Optional\):/i);
        const submitButton = screen.getByRole("button", { name: /register/i });

        fireEvent.change(usernameInput, { target: { value: "testuser" } });
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
        fireEvent.change(profilePictureInput, { target: { value: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQHVX3bDqNHEEZaVaG_vBDLHnHJvlYn9Kz5Q&s" } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockRegister).toHaveBeenCalledWith("testuser", "test@example.com", "password123", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQHVX3bDqNHEEZaVaG_vBDLHnHJvlYn9Kz5Q&s"));
        await waitFor(() => expect(mockUserLoginHandler).toHaveBeenCalledWith({ token: "mockToken" }));
        await waitFor(() => expect(toast.success).toHaveBeenCalledWith("Successfully registered!"));
    });

    it("shows error message if passwords don't match", async () => {
        render(<MemoryRouter><Register /></MemoryRouter>);

        const usernameInput = screen.getByLabelText(/username/i);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/^password:$/im);
        const confirmPasswordInput = screen.getByLabelText(/Repeat Password:/i);
        const submitButton = screen.getByRole("button", { name: /register/i });

        fireEvent.change(usernameInput, { target: { value: "testuser" } });
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "wrongpassword" } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Password missmatch!"));
    });

    it("shows error message if registration fails", async () => {
        const mockRegister = vi.fn().mockRejectedValue(new Error("Registration failed"));
        const mockUserLoginHandler = vi.fn();
        useRegister.mockReturnValue({ register: mockRegister });
        useUserContext.mockReturnValue({ userLoginHandler: mockUserLoginHandler });

        render(<MemoryRouter><Register /></MemoryRouter>);

        const usernameInput = screen.getByLabelText(/username/i);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/^password:$/im);
        const confirmPasswordInput = screen.getByLabelText(/Repeat Password:/i);
        const profilePictureInput = screen.getByLabelText(/Profile Picture \(Optional\):/i);
        const submitButton = screen.getByRole("button", { name: /register/i });

        fireEvent.change(usernameInput, { target: { value: "testuser" } });
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
        fireEvent.change(profilePictureInput, { target: { value: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQHVX3bDqNHEEZaVaG_vBDLHnHJvlYn9Kz5Q&s" } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockRegister).toHaveBeenCalledWith("testuser", "test@example.com", "password123", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQHVX3bDqNHEEZaVaG_vBDLHnHJvlYn9Kz5Q&s"));
        await waitFor(() => expect(mockUserLoginHandler).not.toHaveBeenCalled());
        await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Registration failed"));
    });

    it("navigates to the previous page on successful registration", async () => {
        const mockRegister = vi.fn().mockResolvedValue({ token: "mockToken" });
        const mockUserLoginHandler = vi.fn();
        useRegister.mockReturnValue({ register: mockRegister });
        useUserContext.mockReturnValue({ userLoginHandler: mockUserLoginHandler });

        render(<MemoryRouter><Register /></MemoryRouter>);

        const usernameInput = screen.getByLabelText(/username/i);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/^password:$/im);
        const confirmPasswordInput = screen.getByLabelText(/Repeat Password:/i);
        const submitButton = screen.getByRole("button", { name: /register/i });

        fireEvent.change(usernameInput, { target: { value: "testuser" } });
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith(-1));
    });
});
