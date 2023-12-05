import { useState } from 'react';
import Genre from '../components/Genre';
import { lazy } from 'react';
const Modal = lazy(() => import('../components/Modal'));
import useMovie from '../hooks/useMovie';
import InfiniteScroll from 'react-infinite-scroll-component';
import Heading from '../components/Heading';
import Loading from '../components/Loading';
import Cards from '../components/Cards';
import { Fetching } from '../types/Fetching';

export interface GenreData {
    id: number;
    name: string;
    genres: [];
}

export interface ValueData {
    id: number;
    name: string;
    genres: [];
}

const Movies = () => {
    const [page, setPage] = useState(1);
    const [genre, setGenre] = useState<GenreData[]>([]);
    const [value, setValue] = useState<ValueData[]>([]);
    const genreIds = value.map((v) => v.id);
    const {
        data: datas,
        error,
        isLoading,
        fetchNextPage,
        hasNextPage,
    } = useMovie(genreIds);
    const [modalData, setModalData] = useState<{
        show: boolean;
        data: Fetching;
    }>({
        show: false,
        data: {} as Fetching,
    });

    if (isLoading) return <Loading />;

    if (error) return <p>{error.message}</p>;

    const fetchedTrendingPages =
        datas?.pages.reduce((total, page) => total + page.results.length, 0) ||
        0;

    const loader = <Loading />;

    return (
        <>
            <div className='bg-black-c'>
                <Heading title='Movies' />
                <Genre
                    genre={genre}
                    setGenre={setGenre}
                    type='movie'
                    value={value}
                    setValue={setValue}
                    setPage={setPage}
                />

                <InfiniteScroll
                    next={() => fetchNextPage()}
                    hasMore={!!hasNextPage}
                    loader={loader}
                    dataLength={fetchedTrendingPages}
                    className='display-grid'>
                    <Cards datas={datas} setModalData={(data) => setModalData(data)}/>
                </InfiniteScroll>
                {modalData.show && (
                    <Modal
                        page={page}
                        show={true}
                        isOpen={modalData.show}
                        setIsOpen={(isOpen) =>
                            setModalData({ ...modalData, show: isOpen })
                        }
                        {...modalData.data}
                        key={modalData.data.id}
                    />
                )}
            </div>
        </>
    );
};

export default Movies;
