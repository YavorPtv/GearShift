import useAuth from "../../hooks/useAuth"

export default function CommentsCreate({
    username,
    onCreate,
}) {
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
                        required
                    ></textarea>
                    <button className="add-comment-button">Add Comment</button>
                </form>
            )}
        </>
    );
}