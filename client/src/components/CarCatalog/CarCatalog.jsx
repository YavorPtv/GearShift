import { useCars } from "../../api/carApi";
import CarCatalogItem from "./CarCatalogItem/CarCatalogItem";

export default function Catalog() {
    const { cars } = useCars();
    
    return (
        <>
            <section id="featured-cars" className="featured-cars">
                <div className="container">
                    <div className="section-header">
                        <h2>Featured Cars</h2>
                    </div>

                    <div className="car-catalog-container">
                        {cars.length > 0 
                            ? cars.map(car => (
                                <CarCatalogItem
                                    key={car._id}
                                    imageUrl={car.imageUrl}
                                    brand={car.brand}
                                    model={car.model}
                                    year={car.year}
                                    horsePower={car.horsePower}
                                    price={car.price}
                                />
                            ))
                            : <h3>No listings of cars yet</h3>
                        }
                        
                    </div>
                </div>
            </section>
        </>
    );
}