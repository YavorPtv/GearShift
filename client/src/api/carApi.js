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

export const useCarsSortAndFilter = () => {
    const [isLoading, setIsLoading] = useState(false);

    const sortAndFilterCars = async (sortCriteria = {}, filters = {}) => {
        setIsLoading(true);

        // URL-encode the sortCriteria and prepare the query string
        let sortBy;
        switch (sortCriteria) {
            case 'newest':
                sortBy = '_createdOn desc'
                break;
            case 'abc-asc':
                sortBy = 'brand'
                break;
            case 'zyx-desc':
                sortBy = 'brand desc'
                break;
            case 'price-desc':
                sortBy = 'price desc'
                break;
            case 'price-asc':
                sortBy = 'price'
                break;

            default:
                break;
        }

        const params = new URLSearchParams();
        if (sortBy) {
            params.append("sortBy", sortBy);
        }
        const conditions = Object.entries(filters)
            // eslint-disable-next-line no-unused-vars
            .filter(([_, value]) => value)
            .map(([key, value]) => {
                if (key === 'price') {
                    return `price <= ${value}`
                } else {
                    return `${key} LIKE "${value}"`;
                }
            })
            .join(" AND ");


        if (conditions) {
            params.append("where", conditions);
        }

        try {
            const result = await request.get(`${baseUrl}?${params.toString()}`);
            setIsLoading(false);
            return result; // Return the sorted data
        } catch (error) {
            console.error("Error fetching sorted cars:", error);
            setIsLoading(false);
            return [];
        }
    };

    return {
        sortAndFilterCars,
        isLoading
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