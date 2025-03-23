import { Link } from "react-router";

export default function CarCatalogItem({
    _id,
    imageUrl,
    brand,
    model,
    year,
    horsePower,
    price
}) {
    return (
        <div className="car-catalog-item">
            <Link
                to={`/cars/${_id}/details`}
                key={_id}
                className="car-catalog-item-link"
            >
                <div className="car-image-catalog">
                    <img src={imageUrl} alt={`${brand} ${model}`} />
                </div>
                <div className="car-details-catalog">
                    <h3 className="car-model">{brand} {model}</h3>
                    <p className="car-year">Year: {year}</p>
                    <p className="car-horsepower">Horsepower: {horsePower} HP</p>
                    <p className="car-price">${price}</p>
                </div>
            </Link>
        </div>
    );
}
