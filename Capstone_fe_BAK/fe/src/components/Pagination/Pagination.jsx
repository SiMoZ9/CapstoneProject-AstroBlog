import React from 'react';
import ResponsivePagination from 'react-responsive-pagination';

const Pagination = ({pageCount, pageIndex, setPageIndex}) => {
    const linkClassName =
        'hover:bg-brand-compliment hover:text-brand-dominant50 cursor-pointer w-8 h-8 border rounded mt-2 flex items-center justify-center hover:opacity-80 border-brand-compliment mx-2';

    return (
        <div className="flex w-full justify-between">
            <ResponsivePagination
                activeItemClassName={`${linkClassName} bg-brand-compliment text-brand-dominant50`}
                className="flex w-full items-center "
                current={pageIndex + 1}
                disabledItemClassName="opacity-60 hover:opacity-60 cursor-auto "
                onPageChange={(selected) => setPageIndex(selected - 1)}
                pageItemClassName={linkClassName}
                pageLinkClassName=""
                total={pageCount}
            />
        </div>
    );
};

export default Pagination;
