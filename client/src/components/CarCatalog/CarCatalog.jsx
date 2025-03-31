import { useCars } from "../../api/carApi";
import Spinner from "../Spinner/Spinner";
import CarCatalogItem from "./CarCatalogItem/CarCatalogItem";

export default function Catalog() {
    const { cars, isLoading } = useCars();

    return (
        <>
            <section id="featured-cars" className="featured-cars">
                <div className="container">
                    <div className="section-header">
                        <h2>Featured Cars</h2>
                    </div>

                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <div className="car-catalog-container">
                            {cars.length > 0
                                ? cars.map(car => (
                                    <CarCatalogItem
                                        key={car._id}
                                        {...car}
                                    />
                                ))
                                : <h3>No listings of cars yet</h3>
                            }
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}