export default function CarCatalogItem({
    imageUrl,
    brand,
    model,
    year,
    horsePower,
    price
}) {
    return (
        <div className="car-catalog-item">
            <div className="car-image">
                <img src={imageUrl} alt={`${brand} ${model}`} />
            </div>
            <div className="car-details">
                <h3 className="car-model">{brand} {model}</h3>
                <p className="car-year">Year: {year}</p>
                <p className="car-horsepower">Horsepower: {horsePower} HP</p>
                <p className="car-price">${price}</p>
            </div>
        </div>
    );
}
