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
    const windowPageSize = 5;
    const startPage = Math.max(1, current - Math.floor(windowPageSize / 2));
    const endPage = Math.min(totalPages, startPage + windowPageSize - 1);
    const range = (start: number, end: number) =>
        Array.from({ length: end - start + 1 }, (_, i) => start + i);
    const pageNumbers = range(startPage, endPage);
    return (
        <>
            <section className='cast-position'>
                <div className='actor-container'>
                    <CastPresentational credits={currentItems} />
                    {credits && credits.cast.length > 10 && (
                        <div className='pagination'>
                            <>
                                <div className='pagination-button'>
                                    {credits.cast.length > 10
                                        ? pageNumbers.map((number) => (
                                              <button
                                                  className={` ${
                                                      current === number
                                                          ? 'button-active button-one'
                                                          : 'button-not-active button-one'
                                                  }`}
                                                  key={number}
                                                  disabled={current === number}
                                                  onClick={() =>
                                                      changePage(number)
                                                  }>
                                                  {number}
                                              </button>
                                          ))
                                        : null}
                                </div>
                            </>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Pagination;
