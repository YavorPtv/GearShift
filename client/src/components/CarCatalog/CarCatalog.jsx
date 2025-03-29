import { Link } from "react-router";
import { useCars } from "../../api/carApi";
import CarCatalogItem from "./CarCatalogItem/CarCatalogItem";
import Search from "../Search/Search";

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
                                    {...car}
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