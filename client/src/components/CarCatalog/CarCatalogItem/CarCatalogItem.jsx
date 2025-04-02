import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { Link } from "react-router";
import { useLikes } from "../../../api/reactionsApi";

export default function CarCatalogItem({
    _id,
    imageUrl,
    brand,
    model,
    year,
    horsePower,
    price
}) {
    const { likes, dislikes } = useLikes(_id);
    const netReactions = likes - dislikes;
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
                <div className="reaction-counter">
                    {netReactions >= 0 ? (
                        <AiFillLike style={{ color: "#4e4ffa" }} />
                    ) : (
                        <AiFillDislike style={{ color: "#4e4ffa" }} />
                    )}
                    <span>{netReactions}</span>
                </div>
            </Link>
        </div>
    );
}
