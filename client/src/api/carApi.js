import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth"
import request from "../utils/request";

const baseUrl = 'http://localhost:3030/data/cars';

export const useCars = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        request.get(baseUrl)
            .then(setCars);
    }, []);

    return {
        cars,
    };
}

export const useCar = (carId) => {
    const [car, setCar] = useState([]);

    useEffect(() => {
        request.get(`${baseUrl}/${carId}`)
            .then(setCar);
    }, [carId]);

    return {
        car,
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