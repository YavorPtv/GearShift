import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";
import Catalog from "./CarCatalog";
import { useCars, useCarsSortAndFilter } from "../../api/carApi";
import "@testing-library/jest-dom/vitest";

// Mock API hooks
vi.mock("../../api/carApi", () => ({
    useCars: vi.fn(),
    useCarsSortAndFilter: vi.fn(),
}));

describe("Catalog Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders correctly", () => {
        useCars.mockReturnValue({ cars: [], isLoading: false });
        useCarsSortAndFilter.mockReturnValue({ sortAndFilterCars: vi.fn(), isLoading: false });

        render(
            <MemoryRouter>
                <Catalog />
            </MemoryRouter>
        );

        expect(screen.getByText("Featured Cars")).toBeInTheDocument();
    });

    it("displays 'No listings of cars yet' when there are no cars", () => {
        useCars.mockReturnValue({ cars: [], isLoading: false });
        useCarsSortAndFilter.mockReturnValue({ sortAndFilterCars: vi.fn(), isLoading: false });

        render(
            <MemoryRouter>
                <Catalog />
            </MemoryRouter>
        );

        expect(screen.getByText("No listings of cars yet")).toBeInTheDocument();
    });

    it("renders car items when cars are available", async () => {
        const mockCars = [
            { _id: "1", imageUrl: "car1.jpg", brand: "Toyota", model: "Corolla", year: 2022, horsePower: 130, price: 20000 },
            { _id: "2", imageUrl: "car2.jpg", brand: "Honda", model: "Civic", year: 2021, horsePower: 150, price: 22000 },
        ];

        useCars.mockReturnValue({ cars: mockCars, isLoading: false });
        useCarsSortAndFilter.mockReturnValue({ sortAndFilterCars: vi.fn(() => mockCars), isLoading: false });

        render(
            <MemoryRouter>
                <Catalog />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Toyota Corolla")).toBeInTheDocument();
            expect(screen.getByText("Honda Civic")).toBeInTheDocument();
        })
    });

    it("shows loading spinner while fetching cars", () => {
        useCars.mockReturnValue({ cars: [], isLoading: true });
        useCarsSortAndFilter.mockReturnValue({ sortAndFilterCars: vi.fn(), isLoading: false });

        render(
            <MemoryRouter>
                <Catalog />
            </MemoryRouter>
        );

        expect(screen.getByTestId("spinner")).toBeInTheDocument();
    });

    it("filters cars based on brand", async () => {
        const mockCars = [
            { _id: "1", imageUrl: "car1.jpg", brand: "Toyota", model: "Corolla", year: 2022, horsePower: 130, price: 20000 },
            { _id: "2", imageUrl: "car2.jpg", brand: "Honda", model: "Civic", year: 2021, horsePower: 150, price: 22000 },
        ];

        const mockSortAndFilterCars = vi.fn(() => [mockCars[0]]);

        useCars.mockReturnValue({ cars: mockCars, isLoading: false });
        useCarsSortAndFilter.mockReturnValue({ sortAndFilterCars: mockSortAndFilterCars, isLoading: false });

        render(
            <MemoryRouter>
                <Catalog />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByTestId("filter")); // Open filter panel

        // Simulate setting brand to "Toyota"
        fireEvent.change(screen.getByPlaceholderText("e.g. Ferrari"), { target: { value: "Toyota" } });
        fireEvent.click(screen.getByText("Filter"));

        await waitFor(() => {
            expect(mockSortAndFilterCars).toHaveBeenCalledWith("", { brand: "Toyota", year: "", color: "", transmission: "", model: "", price: "" });
            expect(screen.getByText("Toyota Corolla")).toBeInTheDocument();
            expect(screen.queryByText("Honda Civic")).not.toBeInTheDocument();
        });
    });

    it("sorts cars by price", async () => {
        const mockCars = [
            { _id: "1", imageUrl: "car1.jpg", brand: "Toyota", model: "Corolla", year: 2022, horsePower: 130, price: 20000 },
            { _id: "2", imageUrl: "car2.jpg", brand: "Honda", model: "Civic", year: 2021, horsePower: 150, price: 22000 },
        ];

        const mockSortAndFilterCars = vi.fn(() => [...mockCars].sort((a, b) => a.price - b.price));

        useCars.mockReturnValue({ cars: mockCars, isLoading: false });
        useCarsSortAndFilter.mockReturnValue({ sortAndFilterCars: mockSortAndFilterCars, isLoading: false });

        render(
            <MemoryRouter>
                <Catalog />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByTestId("sort")); // Open sorting panel

        // Simulate sorting by price ascending
        fireEvent.change(screen.getByPlaceholderText("Enter sort criteria"), { target: { value: "price-asc" } });
        fireEvent.click(screen.getByText("Sort"));

        await waitFor(() => {
            expect(mockSortAndFilterCars).toHaveBeenCalledWith("price-asc", { year: "", color: "", brand: "", transmission: "", model: "", price: "" });
            expect(screen.getByText("Toyota Corolla")).toBeInTheDocument();
            expect(screen.getByText("Honda Civic")).toBeInTheDocument();
        });
    });

    it("displays correct pagination", async () => {
        const mockCars = Array.from({ length: 20 }, (_, i) => ({
            _id: `${i + 1}`,
            imageUrl: `car${i + 1}.jpg`,
            brand: `Brand${i + 1}`,
            model: `Model${i + 1}`,
            year: 2022,
            horsePower: 150,
            price: 20000 + i * 1000,
        }));

        useCars.mockReturnValue({ cars: mockCars, isLoading: false });
        useCarsSortAndFilter.mockReturnValue({ sortAndFilterCars: vi.fn(() => mockCars), isLoading: false });

        render(
            <MemoryRouter>
                <Catalog />
            </MemoryRouter>
        );

        // Ensure first 12 items are shown
        await waitFor(() => {
            for (let i = 1; i <= 12; i++) {
                expect(screen.getByText(`Brand${i} Model${i}`)).toBeInTheDocument();
            }
        })

        fireEvent.click(screen.getByText(`Next »`)); // Go to page 2

        await waitFor(() => {
            for (let i = 13; i <= 20; i++) {
                expect(screen.getByText(`Brand${i} Model${i}`)).toBeInTheDocument();
            }
        });
    });
});
