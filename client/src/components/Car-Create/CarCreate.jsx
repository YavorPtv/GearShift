import { useNavigate } from "react-router";
import { useCarCreate } from "../../api/carApi";

export default function CarCreate() {
    const navigate = useNavigate();
    const { create } = useCarCreate();
    
    const onCreate = async (formData) => {
        const carData = Object.fromEntries(formData);

        await create(carData);

        navigate('/cars');
    }

    return (
        <div className="create-post-form">
            <h2>Create a Post for Your Car</h2>
            <form action={onCreate}>
                <div className="form-group">
                    <label htmlFor="brand">Brand:</label>
                    <input
                        type="text"
                        id="brand"
                        name="brand"
                        // value={formData.brand}
                        // onChange={handleInputChange}
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
                        // value={formData.model}
                        // onChange={handleInputChange}
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
                        // value={formData.horsePower}
                        // onChange={handleInputChange}
                        required
                        placeholder="Enter horsepower"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="transmission">Transmission:</label>
                    <select
                        id="transmission"
                        name="transmission"
                        // value={formData.transmission}
                        // onChange={handleInputChange}
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
                        // value={formData.price}
                        // onChange={handleInputChange}
                        required
                        placeholder="Enter price"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Quick Description (approx. 15 words):</label>
                    <textarea
                        id="description"
                        name="description"
                        // value={formData.description}
                        // onChange={handleInputChange}
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
                        // value={formData.time0to100}
                        // onChange={handleInputChange}
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
                        // value={formData.year}
                        // onChange={handleInputChange}
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
                        // value={formData.color}
                        // onChange={handleInputChange}
                        required
                        placeholder="Enter car color"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="type">Type of Car:</label>
                    <select
                        id="type"
                        name="type"
                        // value={formData.type}
                        // onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Car Type</option>
                        <option value="SUV">SUV</option>
                        <option value="Coupe">Coupe</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="Convertible">Convertible</option>
                        {/* Add more car types here */}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        // value={formData.imageUrl}
                        // onChange={handleInputChange}
                        required
                        placeholder="Enter image URL of the car"
                    />
                </div>

                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4e4ffa', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    Submit
                </button>
            </form>
        </div>
    );
}