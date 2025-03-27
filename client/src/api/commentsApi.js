import { useEffect, useReducer } from "react";
import useAuth from "../hooks/useAuth"
import request from "../utils/request";

const baseUrl = 'http://localhost:3030/data/comments';

function commentsReducer(state, action) {
    switch (action.type) {
        case 'ADD_COMMENT':
            return [...state, action.payload];
        case 'GET_ALL':
            return action.payload;
        default:
            return state;
    }
}

export const useComments = (carId) => {
    const { accessToken } = useAuth();
    const [comments, dispatch] = useReducer(commentsReducer, []);

    useEffect(() => {
        const searchParams = new URLSearchParams({
            where: `carId="${carId}"`,
            load: `author=_ownerId:users`,
        })

        const options = {
            headers: {
                'X-Authorization': accessToken,
            }
        }

        request.get(`${baseUrl}?${searchParams.toString()}`, null, options)
            .then(result => dispatch({type: 'GET_ALL', payload: result}));
    }, [accessToken, carId]);

    return {
        comments,
        addComment: (commentData) => dispatch({type: 'ADD_COMMENT', payload: commentData}),
    }
}

export const useCreateComment = () => {
    const { request } = useAuth();

    const create = (carId, comment) => 
        request.post(baseUrl, { carId, comment });

    return {
        create,
    }
}