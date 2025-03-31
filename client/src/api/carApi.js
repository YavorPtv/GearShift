import { useEffect, useOptimistic, useState } from "react";
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
    const [isLoading, setIsLoading] = useOptimistic(false);

    const create = async (carData) => {
        setIsLoading(true);
        try {
            return await request.post(baseUrl, carData);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        create,
        isLoading,
    };
};

export const useCarEdit = () => {
    const { request } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const edit = async (carId, carData) => {
        setIsLoading(true);
        try {
            return await request.put(`${baseUrl}/${carId}`, { ...carData, _id: carId });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        edit,
        isLoading,
    };
};

export const useCarDelete = () => {
    const { request } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const deleteCar = async (carId) => {
        setIsLoading(true);
        try {
            return await request.delete(`${baseUrl}/${carId}`);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        deleteCar,
        isLoading,
    };
};