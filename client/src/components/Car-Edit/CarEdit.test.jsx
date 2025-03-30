import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CarEdit from "./CarEdit";
import { useCar, useCarEdit } from "../../api/carApi";
import { MemoryRouter } from "react-router";

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
    time0to100: 8.5,
    color: 'black',
};
const mockNavigate = vi.fn();

vi.mock("../../api/carApi", () => ({
    useCar: vi.fn().mockReturnValue({
        car: {
            _id: "1",
            _ownerId: "user1",
            imageUrl: "car1.jpg",
            brand: "Toyota",
            model: "Corolla",
            year: 2022,
            price: 20000,
            description: "A reliable car",
            horsePower: 130,
            type: "Sedan",
            transmission: "Automatic",
            time0to100: 8.5,
            color: 'black',
        }
    }),
    useCarEdit: vi.fn(),
}));

vi.mock("react-router", () => ({
    Link: ({ children }) => <span>{children}</span>,
    useNavigate: () => mockNavigate, // Mock the useNavigate hook
    useParams: () => ({ carId: '1' }), // Mock the useParams hook
    MemoryRouter: ({ children }) => <div>{children}</div>, // Mock MemoryRouter for the tests
}));


describe("CarEdit Component", () => {

    it("renders car details correctly and populates the form fields", async () => {

        useCarEdit.mockReturnValue({ edit: vi.fn() });

        render(<CarEdit />);

        expect(screen.getByLabelText(/brand/i).value).toBe(mockCar.brand);
        expect(screen.getByLabelText(/model/i).value).toBe(mockCar.model);
        expect(screen.getByLabelText(/horsepower/i).value).toBe(String(mockCar.horsePower));
        expect(screen.getByLabelText(/price/i).value).toBe(String(mockCar.price));
        expect(screen.getByLabelText(/description/i).value).toBe(mockCar.description);
        expect(screen.getByLabelText(/year/i).value).toBe(String(mockCar.year));
        expect(screen.getByLabelText(/color/i).value).toBe(mockCar.color);
        expect(screen.getByLabelText(/type/i).value).toBe(mockCar.type);
        expect(screen.getByLabelText(/image url/i).value).toBe(mockCar.imageUrl);
    });

    it("handles form input changes correctly", async () => {

        useCarEdit.mockReturnValue({ edit: vi.fn() });

        render(<CarEdit />);

        const brandInput = screen.getByLabelText(/brand/i);
        fireEvent.change(brandInput, { target: { value: "Honda" } });

        expect(brandInput.value).toBe("Honda");
    });

    // it("submits the form and calls edit with the correct data", async () => {

    //     const mockEdit = vi.fn();
    //     useCarEdit.mockReturnValue({ edit: mockEdit });

    //     render(<MemoryRouter><CarEdit /></MemoryRouter>);

    //     await waitFor(() => expect(screen.getByDisplayValue("Toyota")).toBeInTheDocument());
    //     const brandInput = screen.getByLabelText(/brand/i);
    //     await userEvent.clear(brandInput);
    //     await userEvent.type(brandInput, "Honda"); // Using userEvent to type

    //     const transmissionSelect = screen.getByLabelText(/transmission/i);
    //     fireEvent.change(transmissionSelect, { target: { value: "automatic" } });
    
    //     // Select type dropdown and set value
    //     const typeSelect = screen.getByLabelText(/type of car/i);
    //     fireEvent.change(typeSelect, { target: { value: "Coupe" } });

    //     const submitButton = screen.getByRole("button", { name: /submit/i });
    //     await userEvent.click(submitButton);

    //     await waitFor(() => expect(mockEdit).toHaveBeenCalledWith("1", { ...mockCar, brand: "Honda"}));
    //     await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/cars/1/details"));
    // });

    it("displays loading message when car data is not available yet", () => {
        useCar.mockReturnValue({ car: null });
        useCarEdit.mockReturnValue({ edit: vi.fn() });

        render(<CarEdit />);

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
});
