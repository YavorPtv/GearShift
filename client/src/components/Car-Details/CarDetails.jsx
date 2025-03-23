import { useParams } from "react-router";
import { useCar } from "../../api/carApi";
import useAuth from "../../hooks/useAuth";

export default function CarDetails() {
    // const { _id: userId } = useAuth();
    const { carId } = useParams();
    const { car } = useCar(carId);

    return (
        <div className="car-details">
            <div className="top-section">
                <div className="image-container">
                    <img
                        src={car.imageUrl}
                        alt={`${car.brand} ${car.model}`}
                        className="car-image"
                    />
                </div>
                <div className="info-container">
                    <h2 className="section-title">CAR DETAILS</h2>
                    <div className="car-specs">
                        <div className="spec"><strong>Make:</strong> {car.brand}</div>
                        <div className="spec"><strong>Model:</strong> {car.model}</div>
                        <div className="spec"><strong>Year:</strong> {car.year}</div>
                        <div className="spec"><strong>Type:</strong> {car.type}</div>
                        <div className="spec"><strong>Transmission:</strong> {car.transmission}</div>
                        <div className="spec"><strong>Horsepower:</strong> {car.horsePower} HP</div>
                        <div className="spec"><strong>0-100 km/h:</strong> {car.time0to100} sec</div>
                        <div className="spec"><strong>Price:</strong> ${car.price}</div>
                    </div>
                    <button className="book-button">Book Now</button>
                </div>
            </div>

            <div className="description-section">
                <h2 className="section-title">DESCRIPTION</h2>
                <p className="description">
                    {car.description}
                </p>
            </div>
        </div>
    );
}
