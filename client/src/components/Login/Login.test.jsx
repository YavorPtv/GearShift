import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Login from "./Login";
import { useLogin } from "../../api/authApi";
import { useUserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import { MemoryRouter } from "react-router";

const mockNavigate = vi.fn();
vi.mock("../../api/authApi", () => ({
    useLogin: vi.fn().mockReturnValue({
        login: vi.fn()
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
    };
});

describe("Login Component", () => {

    it("renders the login form correctly", () => {
        render(<MemoryRouter><Login /></MemoryRouter>);

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    });

    it("submits the form and calls login with correct data", async () => {
        const mockLogin = vi.fn().mockResolvedValue({ token: "mockToken" });
        const mockUserLoginHandler = vi.fn();
        useLogin.mockReturnValue({ login: mockLogin });
        useUserContext.mockReturnValue({ userLoginHandler: mockUserLoginHandler });

        render(<MemoryRouter><Login /></MemoryRouter>);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole("button", { name: /login/i });

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123"));
        await waitFor(() => expect(mockUserLoginHandler).toHaveBeenCalledWith({ token: "mockToken" }));
        await waitFor(() => expect(toast.success).toHaveBeenCalledWith("Successfully logged in!"));
    });

    it("shows error message if login fails", async () => {
        const mockLogin = vi.fn().mockRejectedValue(new Error("Invalid credentials"));
        const mockUserLoginHandler = vi.fn();
        useLogin.mockReturnValue({ login: mockLogin });
        useUserContext.mockReturnValue({ userLoginHandler: mockUserLoginHandler });

        render(<MemoryRouter><Login /></MemoryRouter>);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole("button", { name: /login/i });

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123"));
        await waitFor(() => expect(mockUserLoginHandler).not.toHaveBeenCalled());
        await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Invalid credentials"));
    });
    it("navigates to the previous page on successful login", async () => {
        const mockLogin = vi.fn().mockResolvedValue({ token: "mockToken" });
        const mockUserLoginHandler = vi.fn();
        useLogin.mockReturnValue({ login: mockLogin });
        useUserContext.mockReturnValue({ userLoginHandler: mockUserLoginHandler });
        vi.mock("react-router", async () => {
            const actualRouter = await vi.importActual("react-router");
            return {
                ...actualRouter, // Import everything else from react-router-dom
                MemoryRouter: ({ children }) => <div>{children}</div>,
                useNavigate: () => mockNavigate
            };
        });

        render(<MemoryRouter><Login /></MemoryRouter>);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByRole("button", { name: /login/i });

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith(-1));
    });
});
