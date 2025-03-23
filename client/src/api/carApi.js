import useAuth from "../hooks/useAuth"

const baseUrl = 'http://localhost:3030/data/cars';

export const useCarCreate = () => {
    const { request } = useAuth();

    const create = (carData) => 
        request.post(baseUrl, carData);
    

    return {
        create,
    }
}