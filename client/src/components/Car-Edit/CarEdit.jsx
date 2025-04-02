import { useNavigate, useParams } from "react-router";
import { useCar, useCarEdit } from "../../api/carApi";
import { useState, useEffect } from "react";
import Spinner from "../Spinner/Spinner";

export default function CarEdit() {
    const { edit, isLoading } = useCarEdit();
    const { carId } = useParams();
    const navigate = useNavigate();
    const { car } = useCar(carId);

    // Local state for controlled form inputs
    const [formData, setFormData] = useState(null);

    // Sync state when car data loads
    useEffect(() => {
        if (car) {
            setFormData(car);
        }
    }, [car]);

    if (!car || !formData) {
        return <Spinner />;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const editAction = async (event) => {
        event.preventDefault();
        await edit(carId, formData);
        navigate(`/cars/${carId}/details`);
    };

    return (
        <div className="create-post-form">
            <h2>Edit post of your car</h2>
            <form onSubmit={editAction}>
                <div className="form-group">
                    <label htmlFor="brand">Brand:</label>
                    <input
                        type="text"
                        id="brand"
                        name="brand"
                        value={formData.brand ? formData.brand : ""}
                        onChange={handleChange}
                        required
                        placeholder="Enter car brand"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="model">Model:</label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        value={formData.model ? formData.model : ""}
                        onChange={handleChange}
                        required
                        placeholder="Enter car model"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="horsePower">Horsepower:</label>
                    <input
                        type="number"
                        id="horsePower"
                        name="horsePower"
                        value={formData.horsePower ? formData.horsePower : ""}
                        onChange={handleChange}
                        required
                        placeholder="Enter horsepower"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="transmission">Transmission:</label>
                    <select
                        id="transmission"
                        name="transmission"
                        value={formData.transmission ? formData.transmission : ""}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Transmission</option>
                        <option value="automatic">Automatic</option>
                        <option value="manual">Manual</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price ? formData.price : ""}
                        onChange={handleChange}
                        required
                        placeholder="Enter price"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Quick Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description ? formData.description : ""}
                        onChange={handleChange}
                        required
                        placeholder="Enter quick description"
                        rows="3"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="time0to100">0-100 kph Time (seconds):</label>
                    <input
                        type="number"
                        id="time0to100"
                        name="time0to100"
                        step="any"
                        value={formData.time0to100 ? formData.time0to100 : ""}
                        onChange={handleChange}
                        required
                        placeholder="Enter time from 0-100 kph"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="year">Year:</label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        value={formData.year ? formData.year : ""}
                        onChange={handleChange}
                        required
                        placeholder="Enter car year"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="color">Color:</label>
                    <input
                        type="text"
                        id="color"
                        name="color"
                        value={formData.color ? formData.color : ""}
                        onChange={handleChange}
                        required
                        placeholder="Enter car color"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="type">Type of Car:</label>
                    <select
                        id="type"
                        name="type"
                        value={formData.type ? formData.type : ""}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Car Type</option>
                        <option value="SUV">SUV</option>
                        <option value="Coupe">Coupe</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="Convertible">Convertible</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl ? formData.imageUrl : ""}
                        onChange={handleChange}
                        required
                        placeholder="Enter image URL of the car"
                    />
                </div>

                <button type="submit" disabled={isLoading} style={{ padding: '10px 20px', backgroundColor: '#4e4ffa', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    {isLoading ? "Saving Changes..." : "Submit"}
                </button>
            </form>
        </div>
    );
}
