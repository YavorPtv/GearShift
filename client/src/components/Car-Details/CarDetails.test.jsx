import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";
import CarDetails from "./CarDetails";
import { useCar } from "../../api/carApi";
import { useCarDelete } from "../../api/carApi";
import useAuth from "../../hooks/useAuth";
import { useComments, useDeleteComment, useEditComment } from "../../api/commentsApi";
import "@testing-library/jest-dom/vitest";


// Mock hooks
vi.mock("../../api/carApi", () => ({
    useCar: vi.fn().mockReturnValue({
        car: {
            _id: "1",
            imageUrl: "car1.jpg",
            brand: "Toyota",
            model: "Corolla",
            year: 2022,
            price: 20000,
            description: "A reliable car",
            _ownerId: "user1",
            horsePower: 130,
            type: "Sedan",
            transmission: "Automatic",
            time0to100: 8.5,
        }
    }),
    useCarDelete: vi.fn(),
}));

vi.mock("../../hooks/useAuth", () => ({
    default: vi.fn(),
}));

vi.mock("../../api/commentsApi", () => ({
    useComments: vi.fn().mockReturnValue({
        comments: [],  // Return an empty array or any mock data for comments
        addComment: vi.fn(),
        editComment: vi.fn(),
        deleteComment: vi.fn(),
    }),
    useCreateComment: vi.fn().mockReturnValue({
        create: vi.fn(),  // Mock 'create' function inside 'useCreateComment'
    }),
    useEditComment: vi.fn().mockReturnValue({
        edit: vi.fn(),  // Mock 'edit' function inside 'useEditComment'
    }),
    useDeleteComment: vi.fn().mockReturnValue({
        deleteApi: vi.fn(),  // Mock 'deleteApi' function inside 'useDeleteComment'
    }),
}));

const mockNavigate = vi.fn();  // Mock navigate
const mockDeleteCar = vi.fn();

vi.mock("react-router", () => ({
    Link: ({ children }) => <span>{children}</span>,
    useNavigate: () => mockNavigate, // Mock the useNavigate hook
    useParams: () => ({ carId: '1' }), // Mock the useParams hook
    MemoryRouter: ({ children }) => <div>{children}</div>, // Mock MemoryRouter for the tests
}));


describe("CarDetails Component", () => {

    it("renders car details correctly", () => {
        useCarDelete.mockReturnValue({ deleteCar: vi.fn() });
        useAuth.mockReturnValue({ userId: "user1", username: "testuser", isAuthenticated: true });
        useComments.mockReturnValue({ comments: [], addComment: vi.fn(), editComment: vi.fn(), deleteComment: vi.fn() });
        useEditComment.mockReturnValue({ edit: vi.fn() });
        useDeleteComment.mockReturnValue({ deleteApi: vi.fn() });

        render(
            <MemoryRouter>
                <CarDetails />
            </MemoryRouter>
        );

        expect(screen.getByText("CAR DETAILS")).toBeInTheDocument();
        expect(screen.getByText('Toyota')).toBeInTheDocument();
        expect(screen.getByText('Corolla')).toBeInTheDocument();

        expect(screen.getByText("2022")).toBeInTheDocument();
        expect(screen.getByText("$20000")).toBeInTheDocument();
    });

    it("displays edit and delete buttons if the user is the car owner", () => {

        useCarDelete.mockReturnValue({ deleteCar: vi.fn() });
        useAuth.mockReturnValue({ userId: "user1", username: "testuser", isAuthenticated: true });
        useComments.mockReturnValue({ comments: [], addComment: vi.fn(), editComment: vi.fn(), deleteComment: vi.fn() });

        render(
            <MemoryRouter>
                <CarDetails />
            </MemoryRouter>
        );

        expect(screen.getByText("Edit")).toBeInTheDocument();
        expect(screen.getByText("Delete")).toBeInTheDocument();
    });

    it("deletes a car when the delete button is clicked and confirmed", async () => {

        useCarDelete.mockReturnValue({ deleteCar: mockDeleteCar });
        useAuth.mockReturnValue({ userId: "user1", username: "testuser", isAuthenticated: true });
        useComments.mockReturnValue({ comments: [], addComment: vi.fn(), editComment: vi.fn(), deleteComment: vi.fn() });

        window.confirm = vi.fn().mockReturnValue(true); // Mock the confirmation dialog

        render(
            <MemoryRouter>
                <CarDetails />
            </MemoryRouter>
        );

        const deleteButton = screen.getByText("Delete");
        fireEvent.click(deleteButton);

        await waitFor(() => expect(mockDeleteCar).toHaveBeenCalledWith("1"));
    });

    it("shows comments section correctly", () => {

        const mockComments = [
            { _id: "1", comment: "Great car!", author: { username: "user1" }, _ownerId: "user1" }
        ];

        useCarDelete.mockReturnValue({ deleteCar: vi.fn() });
        useAuth.mockReturnValue({ userId: "user1", username: "testuser", isAuthenticated: true });
        useComments.mockReturnValue({ comments: mockComments, addComment: vi.fn(), editComment: vi.fn(), deleteComment: vi.fn() });

        render(
            <MemoryRouter>
                <CarDetails />
            </MemoryRouter>
        );

        expect(screen.getByText("Great car!")).toBeInTheDocument();
    });
    it("navigates after car deletion", async () => {
        const mockCar = {
            _id: "1",
            imageUrl: "car1.jpg",
            brand: "Toyota",
            model: "Corolla",
            year: 2022,
            price: 20000,
            description: "A reliable car",
            _ownerId: "user1",
            horsePower: 130,
            type: "Sedan",
            transmission: "Automatic",
            time0to100: 8.5
        };

        useCar.mockReturnValue({ car: mockCar });
        useCarDelete.mockReturnValue({ deleteCar: mockDeleteCar });
        useAuth.mockReturnValue({ userId: "user1", username: "testuser", isAuthenticated: true });

        render(<CarDetails />);

        const deleteButton = screen.getByText("Delete");
        fireEvent.click(deleteButton);

        await waitFor(() => expect(mockDeleteCar).toHaveBeenCalledWith("1"));
        expect(mockNavigate).toHaveBeenCalledWith("/cars"); // Check navigation
    });
});
