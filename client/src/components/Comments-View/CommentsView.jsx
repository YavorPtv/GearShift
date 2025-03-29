import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import useAuth from "../../hooks/useAuth";
import { useComments, useEditComment } from "../../api/commentsApi";
import { useState } from "react";

export default function CommentsView({
    carId,
}) {
    const { userId } = useAuth();
    const [editingId, setEditingId] = useState(null);
    const [editedComment, setEditedComment] = useState("");
    const { edit } = useEditComment();
    const { comments, editComment } = useComments(carId);

    const handleEditClick = (id, comment) => {
        setEditingId(id);
        setEditedComment(comment);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditedComment("");
    };

    const handleSaveEdit = async (commentId) => {
        setEditingId(null);
        const commentData = {
            comment: editedComment,
        }
        await edit(commentId, commentData);
        editComment({_id: commentId, comment: editedComment});
    }

    return (
        <>
            <h2 className="section-title">COMMENTS</h2>

            <div className="comments-container">
                {comments.length > 0
                    ? comments.map(({ _id, comment, author, _ownerId }) => (
                        <div key={_id} className="comment">
                            <div className="comment-header">
                                <div className="username">{author.username}</div>
                                {_ownerId === userId && (
                                    <div className="comment-actions">
                                        <button 
                                            className="comment-edit-button"
                                            onClick={() => handleEditClick(_id, comment)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button className="comment-delete-button">
                                            <FaTrash />
                                        </button>
                                    </div>
                                )}

                            </div>
                            {editingId === _id ? (
                                <div className="edit-mode">
                                    <textarea
                                        className="edit-textarea"
                                        value={editedComment}
                                        onChange={(e) => setEditedComment(e.target.value)}
                                    />
                                    <div className="edit-buttons">
                                        <button className="save-button" onClick={() => handleSaveEdit(_id)}>Save</button>
                                        <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="comment-text">{comment}</div>
                            )}
                        </div>
                    ))
                    : <h4>No comments!</h4>
                }
            </div>
        </>
    );
}
