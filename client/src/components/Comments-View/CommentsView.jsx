import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import useAuth from "../../hooks/useAuth";

export default function CommentsView({
    comments,
}) {
    const { userId } = useAuth();
    
    return (
        <>
            <h2 className="section-title">COMMENTS</h2>

            <div className="comments-container">
                {comments.length > 0
                    ? comments.map(({ _id, comment, author, _ownerId }) => (
                        <div key={_id} className="comment">
                            <div className="comment-header">
                                <div className="username">{author.username}</div>
                                { _ownerId === userId && (
                                    <div className="comment-actions">
                                        <button className="comment-edit-button">
                                            <FaEdit />
                                        </button>
                                        <button className="comment-delete-button">
                                            <FaTrash />
                                        </button>
                                    </div>  
                                )}

                            </div>
                            <div className="comment-text">{comment}</div>
                        </div>
                    ))
                    : <h4>No comments!</h4>
                }
            </div>
        </>
    );
}
