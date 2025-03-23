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

export const useCarCreate = () => {
    const { request } = useAuth();

    const create = (carData) => 
        request.post(baseUrl, carData);
    

    return {
        create,
    }
}