import { render, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Logout from "./Logout";
import { useLogout } from "../../api/authApi";
import { useUserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import { MemoryRouter } from "react-router";

const mockNavigate = vi.fn();

vi.mock("../../api/authApi", () => ({
    useLogout: vi.fn().mockReturnValue({
        logout: vi.fn(),
        isAuthenticated: true,
    }),
}));

vi.mock("../../contexts/UserContext", async () => {
    const actualContext = await vi.importActual("../../contexts/UserContext");
    return {
        ...actualContext,
        useUserContext: vi.fn().mockReturnValue({
            userLogoutHandler: vi.fn(),
        }),
    };
});


vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

vi.mock("react-router", async () => {
    const actualRouter = await vi.importActual("react-router");
    return {
        ...actualRouter,
        useNavigate: () => mockNavigate,
    };
});

describe("Logout Component", () => {
    it("calls logout and userLogoutHandler on mount", async () => {
        const mockLogout = vi.fn().mockResolvedValue();
        const mockUserLogoutHandler = vi.fn();
        useLogout.mockReturnValue({ logout: mockLogout, isAuthenticated: true });
        useUserContext.mockReturnValue({ userLogoutHandler: mockUserLogoutHandler });

        render(<MemoryRouter><Logout /></MemoryRouter>);

        await waitFor(() => expect(mockLogout).toHaveBeenCalled());
        await waitFor(() => expect(mockUserLogoutHandler).toHaveBeenCalled());
        await waitFor(() => expect(toast.success).toHaveBeenCalledWith("Successfully logged out!"));
    });

    it("navigates back after successful logout", async () => {
        const mockLogout = vi.fn().mockResolvedValue();
        useLogout.mockReturnValue({ logout: mockLogout, isAuthenticated: true });

        render(<MemoryRouter><Logout /></MemoryRouter>);

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith(-1));
    });

    it("handles errors and shows an error toast", async () => {
        const mockLogout = vi.fn().mockRejectedValue(new Error("Logout failed"));
        useLogout.mockReturnValue({ logout: mockLogout, isAuthenticated: true });

        render(<MemoryRouter><Logout /></MemoryRouter>);

        await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Logout failed"));
    });
});
