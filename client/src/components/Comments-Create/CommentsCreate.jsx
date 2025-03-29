import { useCreateComment } from "../../api/commentsApi";
import useAuth from "../../hooks/useAuth"

export default function CommentsCreate({
    carId,
    username,
    addComment
}) {
    const { create } = useCreateComment();

    const onCreate = async (formData) => {
        const comment = formData.get('comment');

        const commentResult = await create(carId, comment);

        addComment({...commentResult, author: { username }});
    }

    const { isAuthenticated } = useAuth();
    return (
        <>
            {isAuthenticated && (
                <form action={onCreate} className="add-comment-field">
                    <div className="comment-username">{username}</div>
                    <textarea
                        className="comment-textarea"
                        name="comment"
                        placeholder="Write your comment here..."
                        rows="3"
                    ></textarea>
                    <button className="add-comment-button">Add Comment</button>
                </form>
            )}
        </>
    );
}