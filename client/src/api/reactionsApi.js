import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/data/reactions`;

export function useLikes(carId) {
    const { userId, request } = useAuth();
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [userReaction, setUserReaction] = useState(null);
    const [reactionId, setReactionId] = useState(null);

    useEffect(() => {
        async function fetchReactions() {
            try {
                const params = new URLSearchParams({
                    where: `carId="${carId}"`
                })
                const reactions = await request.get(`${baseUrl}?${params.toString()}`);
                const likesCount = reactions.filter(r => r.type === "like").length;
                const dislikesCount = reactions.filter(r => r.type === "dislike").length;
                const userReact = reactions.find(r => r.userId === userId);

                setLikes(likesCount);
                setDislikes(dislikesCount);
                setUserReaction(userReact ? userReact.type : null);
                setReactionId(userReact ? userReact._id : null);
            } catch (error) {
                console.error("Failed to fetch reactions:", error);
            }
        }
        fetchReactions();
    }, [carId, userId, request]);

    async function toggleReaction(type) {
        try {
            if (userReaction) {
                if (reactionId) {
                    await request.delete(`${baseUrl}/${reactionId}`);
                }
            }

            if (userReaction === type) {
                setUserReaction(null);
                setReactionId(null);
                type === "like" ? setLikes(likes - 1) : setDislikes(dislikes - 1);
            } else {
                const newReaction = await request.post(`${baseUrl}`, { carId, userId, type });

                setUserReaction(type);
                setReactionId(newReaction._id);

                if (userReaction) {
                    type === "like" ? (setLikes(likes + 1), setDislikes(dislikes - 1))
                        : (setDislikes(dislikes + 1), setLikes(likes - 1));
                } else {
                    type === "like" ? setLikes(likes + 1) : setDislikes(dislikes + 1);
                }
            }
        } catch (error) {
            console.error("Failed to toggle reaction:", error);
        }
    }
    return { likes, dislikes, userReaction, toggleReaction };
}
