export default function CommentsView({
    comments
}) {
    return (
        <>
            <h2 className="section-title">COMMENTS</h2>

            <div className="comments-container">
                {comments.length > 0
                    ? comments.map(({_id, comment, author}) => (
                        <div key={_id} className="comment">
                            <div className="username">{author.username}</div>
                            <div className="comment-text">{comment}</div>
                        </div>
                    ))
                    : <h4>No comments!</h4>
                }
                
            </div>
        </>
    );
}