import React from 'react';

export default function Pagination(props)
{
    const { pagination, onPageChange } = props;
    const { currentPage, totalPages, hasPrevious, hasNext } = pagination;

    return (
        <div className="pagination">
            <button disabled={!hasPrevious}
                onClick={() => onPageChange(currentPage - 1)}
            >
                &laquo;
            </button>
            <span>
                &nbsp;&nbsp;{currentPage + "/" + totalPages}&nbsp;
            </span>
            <button disabled={!hasNext}
                onClick={() => onPageChange(currentPage + 1)}
            >
                &raquo;
            </button>
        </div>
    );
}
