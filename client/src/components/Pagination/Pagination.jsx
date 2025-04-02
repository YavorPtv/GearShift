import "./Pagination.css";

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange
}) {
    return (
        <div className="pagination">
            <button
                className="page-btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &laquo; Prev
            </button>

            <button
                className={`page-number ${currentPage === 1 ? "active" : ""}`}
                onClick={() => onPageChange(1)}
            >
                1
            </button>

            {currentPage !== 1 && currentPage <= totalPages && (
                <button
                    className="page-number active"
                    onClick={() => onPageChange(currentPage)}
                >
                    {currentPage}
                </button>
            )}

            <button
                className="page-btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
            >
                Next &raquo;
            </button>
        </div>
    );
}
