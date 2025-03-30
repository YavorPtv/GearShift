import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";
import Catalog from "./CarCatalog";
import { useCars } from "../../api/carApi";
import "@testing-library/jest-dom/vitest";

// Mock the useCars hook
vi.mock("../../api/carApi", () => ({
    useCars: vi.fn(),
}));

describe("Catalog Component", () => {
    it("renders correctly", () => {
        useCars.mockReturnValue({ cars: [] });

        render(
            <MemoryRouter>
                <Catalog />
            </MemoryRouter>
        );

        expect(screen.getByText("Featured Cars")).toBeInTheDocument();
    });

    it("displays the 'No listings of cars yet' message when there are no cars", () => {
        useCars.mockReturnValue({ cars: [] });

        render(
            <MemoryRouter>
                <Catalog />
            </MemoryRouter>
        );
        expect(screen.getByText("No listings of cars yet")).toBeInTheDocument();
    });

    it("renders car items when cars are available", () => {
        const mockCars = [
            { _id: "1", imageUrl: "car1.jpg", brand: "Toyota", model: "Corolla", year: 2022, horsePower: 130, price: 20000 },
            { _id: "2", imageUrl: "car2.jpg", brand: "Honda", model: "Civic", year: 2021, horsePower: 150, price: 22000 },
        ];

        useCars.mockReturnValue({ cars: mockCars });

        render(
            <MemoryRouter>
                <Catalog />
            </MemoryRouter>
        );

        expect(screen.getByText("Toyota Corolla")).toBeInTheDocument();
        expect(screen.getByText("Honda Civic")).toBeInTheDocument();
    });
});
