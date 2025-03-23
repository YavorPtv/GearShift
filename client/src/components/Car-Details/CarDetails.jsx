import { useParams } from "react-router";
import { useCar } from "../../api/carApi";
import useAuth from "../../hooks/useAuth";

export default function CarDetails() {
    // const { _id: userId } = useAuth();
    const { carId } = useParams();
    const { car } = useCar(carId);

    return (
        <div className="car-details-page">
            <div className="container">
                <div className="car-details-header">
                    <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} className="car-image" />
                </div>
                <div className="car-info">
                    <div className="car-overview">
                        <h1>{car.brand} {car.model}</h1>
                        <p className="car-year-type">Year: {car.year} | Type: {car.type}</p>
                        <p className="car-color">Color: {car.color}</p>
                    </div>
                    <div className="car-performance">
                        <p><strong>Horsepower:</strong> {car.horsePower} HP</p>
                        <p><strong>0-100 km/h:</strong> {car.time0to100} sec</p>
                        <p><strong>Transmission:</strong> {car.transmission}</p>
                    </div>
                    <div className="car-price-description">
                        <h2 className="price">${car.price}</h2>
                        <p>{car.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
