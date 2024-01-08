import { Suspense, useState, lazy } from 'react';
import Genre from '../components/Genre';
const Modal = lazy(() => import('../components/Modal'));
import useMovie from '../hooks/useMovie';
import InfiniteScroll from 'react-infinite-scroll-component';
import Heading from '../components/Heading';
import Loading from '../components/Loading';
import Cards from '../components/Cards';
import { Fetching } from '../types/Fetching';
import { ValueData } from '../hooks/useGenre';

const TV = () => {
    const [value, setValue] = useState<ValueData[]>([]);
    const [modalData, setModalData] = useState({
        show: false,
        data: {} as Fetching,
    });
    const genreIds = value.map((v) => v.id);
    const {
        data: datas,
        error,
        isLoading,
        fetchNextPage,
        hasNextPage,
    } = useMovie(genreIds);
    

    if (isLoading) return <Loading />;

    if (error) return <p>{error.message}</p>;

    const fetchedTrendingPages =
        datas?.pages.reduce((total, page) => total + page.results.length, 0) ||
        0;

    const loader = <Loading />;

    return (
        <>
            <div className='bg-black-c'>
                <Heading title='TV Series' />
                <Genre
                    type='tv'
                    value={value}
                    setValue={setValue}
                />
                <InfiniteScroll
                    next={() => fetchNextPage()}
                    hasMore={!!hasNextPage}
                    loader={loader}
                    dataLength={fetchedTrendingPages}
                    className='display-grid'>
                    <Cards datas={datas} setModalData={(data) => setModalData(data)} FilterType={''}/>
                </InfiniteScroll>
                {modalData.show && (
                    <Suspense fallback={<Loading />}>
                    <Modal
                        show={true}
                        isOpen={modalData.show}
                        setIsOpen={(isOpen) => setModalData({ ...modalData, show: isOpen })} datas={modalData.data}/>
                    </Suspense>
                )}
            </div>
        </>
    );
};

export default TV;
