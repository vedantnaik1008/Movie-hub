import { useState } from 'react';
import CastPresentational from './CastPresentational';
import { Credits } from '../types/CastTypes';

interface Props {
    credits: Credits | undefined;
}
const Pagination = ({ credits }: Props) => {
    const [current, setCurrent] = useState(1);

    const itemsPerPage = 10;
    const start = (current - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const totalPages = credits
        ? Math.ceil(credits.cast.length / itemsPerPage)
        : 0;
    const currentItems = credits ? credits.cast.slice(start, end) : [];

    const changePage = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrent(pageNumber);
        }
    };

    return (
        <>
            <section className='cast-position'>
                <div className='actor-container'>
                    <CastPresentational credits={currentItems} />
                    {credits && credits.cast.length > 10 && (
                        <div className='pagination'>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <>
                                    <div className='pagination-button'>
                                        <button
                                            disabled={current === index + 1}
                                            className={` ${
                                                current === index + 1
                                                    ? 'button-active button-one'
                                                    : 'button-not-active button-one'
                                            }`}
                                            key={index + 1}
                                            onClick={() =>
                                                changePage(index + 1)
                                            }>
                                            {index + 1}
                                        </button>
                                    </div>
                                </>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Pagination;
