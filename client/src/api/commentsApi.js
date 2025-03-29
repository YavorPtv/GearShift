import { useEffect, useReducer } from "react";
import useAuth from "../hooks/useAuth"

const baseUrl = 'http://localhost:3030/data/comments';

function commentsReducer(state, action) {
    switch (action.type) {
        case 'ADD_COMMENT':
            return [...state, action.payload];
        case 'GET_ALL':
            return action.payload;
        case 'EDIT_COMMENT':
            return state.map((comment) => 
                comment._id === action.payload._id 
                    ? {...comment, ...action.payload} 
                    : comment)
        case 'DELETE_COMMENT':
            return state.filter((comment) => comment._id !== action.payload.commentId)
        default:
            return state;
    }
}

export const useComments = (carId) => {
    const { request } = useAuth();
    const [comments, dispatch] = useReducer(commentsReducer, []);

    useEffect(() => {
        const searchParams = new URLSearchParams({
            where: `carId="${carId}"`,
            load: `author=_ownerId:users`,
        })

        request.get(`${baseUrl}?${searchParams.toString()}`)
            .then(result => dispatch({type: 'GET_ALL', payload: result}));
    }, [request, carId]);

    return {
        comments,
        addComment: (commentData) => dispatch({type: 'ADD_COMMENT', payload: commentData}),
        editComment: (commentData) => dispatch({type: 'EDIT_COMMENT', payload: commentData}),
        deleteComment: (commentId) => dispatch({type: 'DELETE_COMMENT', payload: commentId})
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

export const useEditComment = () => {
    const { request } = useAuth();

    const edit = (commentId, comment) => 
        request.patch(`${baseUrl}/${commentId}`, comment);

    return {
        edit,
    }
}

export const useDeleteComment = () => {
    const { request } = useAuth();

    const deleteApi = (commentId) => 
        request.delete(`${baseUrl}/${commentId}`);

    return {
        deleteApi,
    }
}