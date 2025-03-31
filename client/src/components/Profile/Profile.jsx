import { Link } from "react-router";
import { useProfile, useProfileCars, useProfileComments } from "../../api/profileApi";
import Spinner from "../Spinner/Spinner";
import useAuth from "../../hooks/useAuth";
import defaultProfilePicture from '/assets/images/defaultProfilePicture.jpg'
import './Profile.css'

export default function Profile() {
    const { userId } = useAuth();
    const { profile, isLoading: isLoadingProfile } = useProfile();
    const { profileCars, isLoading: isLoadingCars } = useProfileCars(userId);
    const { profileComments, isLoading: isLoadingComments } = useProfileComments(userId);

    if (isLoadingProfile || isLoadingCars || isLoadingComments) {
        return <Spinner />;
    }

    return (
        <div className="profile-page">
            {/* Profile Header */}
            <div className="profile-header">
                <div className="profile-picture">
                    <img src={profile.imageUrl || defaultProfilePicture} alt="Profile" />
                </div>
                <div className="profile-info">
                    <h2>{profile.username}</h2>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Cars Added:</strong> {profileCars.length}</p>
                    <p><strong>Comments Added:</strong> {profileComments.length}</p>
                </div>
            </div>

            {/* User's Cars */}
            <h3 className="section-title">Your Cars</h3>
            <div className="car-list">
                {profileCars.length > 0 ? (
                    profileCars.map((car) => (
                        <div className="car-catalog-item-profile" key={car._id}>
                            <Link
                                to={`/cars/${car._id}/details`}
                                className="car-catalog-item-link"
                            >
                                <div className="car-image-catalog">
                                    <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} />
                                </div>
                                <div className="car-details-catalog">
                                    <h3 className="car-model">{car.brand} {car.model}</h3>
                                    <p className="car-year">Year: {car.year}</p>
                                    <p className="car-horsepower">Horsepower: {car.horsePower} HP</p>
                                    <p className="car-price">${car.price}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : <p>You haven't added any cars yet.</p>}
            </div>

            {/* User's Comments */}
            <h3 className="section-title">Your Comments</h3>
            <div className="comments-container">
                {profileComments.length > 0 ? (
                    profileComments.map(({ _id, comment, carId, author }) => (
                        <div key={_id} className="comment">
                            <div className="comment-header">
                                <div className="username">{author.username}</div>
                            </div>
                            <div className="comment-text">{comment}</div>
                            <small>On <Link to={`/cars/${carId}/details`}>this car</Link></small>
                        </div>
                    ))
                ) : <p>You haven't made any comments yet.</p>}
            </div>
        </div>
    );
}
