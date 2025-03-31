import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import request from "../utils/request";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}`;

export const useProfile = () => {
    const { request, userId } = useAuth();
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const result = await request.get(`${baseUrl}/users/me`);
                setProfile(result);
            } catch (error) {
                console.error("Failed to load profile:", error); //TODO: error handling
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [request, userId]);

    return {
        profile,
        isLoading
    };
};

export const useProfileCars = (userId) => {
    const [profileCars, setProfileCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        const searchParams = new URLSearchParams({
            where: `_ownerId="${userId}"`
        })
        request.get(`${baseUrl}/data/cars?${searchParams.toString()}`)
            .then(setProfileCars)
            .finally(() => setIsLoading(false));
    }, [userId]);

    return {
        profileCars,
        isLoading,
    };
}

export const useProfileComments = (userId) => {
    const [profileComments, setProfileComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        const searchParams = new URLSearchParams({
            where: `_ownerId="${userId}"`
        })
        request.get(`${baseUrl}/data/comments?${searchParams.toString()}`)
            .then(setProfileComments)
            .finally(() => setIsLoading(false));
    }, [userId]);

    return {
        profileComments,
        isLoading,
    };
}
