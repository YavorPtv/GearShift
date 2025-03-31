import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth"
import request from "../utils/request";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/data/cars`;

export const useCars = () => {
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        request.get(baseUrl)
            .then(setCars)
            .finally(() => setIsLoading(false));
    }, []);

    return {
        cars,
        isLoading,
    };
}

export const useCar = (carId) => {
    const [car, setCar] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        request.get(`${baseUrl}/${carId}`)
            .then(setCar)
            .finally(() => setIsLoading(false))
    }, [carId]);

    return {
        car,
        isLoading,
    };
}

export const useCarCreate = () => {
    const { request } = useAuth();

    const create = (carData) => 
        request.post(baseUrl, carData);
    

    return {
        create,
    }
}

export const useCarEdit = () => {
    const { request } = useAuth();

    const edit = (carId, carData) => 
        request.put(`${baseUrl}/${carId}`, {...carData, _id: carId});

    return {
        edit,
    }
}

export const useCarDelete = () => {
    const { request } = useAuth();

    const deleteCar = (carId) => 
        request.delete(`${baseUrl}/${carId}`);

    return {
        deleteCar,
    }
}