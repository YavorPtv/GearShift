import { Link, useNavigate, useParams } from "react-router";
import { useCar, useCarDelete } from "../../api/carApi";
import useAuth from "../../hooks/useAuth";
import CommentsView from "../Comments-View/CommentsView";
import CommentsCreate from "../Comments-Create/CommentsCreate";
import { useComments, useCreateComment } from "../../api/commentsApi";

export default function CarDetails() {
    const navigate = useNavigate();
    const { carId } = useParams();
    const { car } = useCar(carId);
    const { deleteCar } = useCarDelete();
    const { userId, email, username } = useAuth();
    const { create } = useCreateComment();
    const { comments, addComment } = useComments(carId);

    console.log(comments);

    const carDeleteHandler = async () => {
        const hasConfirm = confirm(`Are you sure you want to delete this car?`);

        if (!hasConfirm) {
            return;
        }

        await deleteCar(carId);

        navigate('/cars');
    }

    const createCommentHandler = async (formData) => {
        const comment = formData.get('comment');

        const commentResult = await create(carId, comment);

        addComment({...commentResult, author: { username }});
    }

    const isOwner = userId === car._ownerId;

    return (
        <div className="car-details">
            <div className="top-section">
                <div className="image-container-details">
                    <img
                        src={car.imageUrl}
                        alt={`${car.brand} ${car.model}`}
                        className="car-image-details"
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

                    {/* Edit & Delete Buttons */}
                    {isOwner && (
                        <div className="button-group">
                            <Link to={`/cars/${carId}/edit`} className="edit-button">Edit</Link>
                            <button onClick={carDeleteHandler} className="delete-button">Delete</button>
                        </div>
                    )}

                </div>
            </div>

            <div className="description-section">
                <h2 className="section-title">DESCRIPTION</h2>
                <p className="description">
                    {car.description}
                </p>
            </div>
            <div className="comments-section">

                <CommentsView comments={comments}/>

                <CommentsCreate 
                    username={username}
                    onCreate={createCommentHandler}
                />

            </div>

        </div>
    );
}
