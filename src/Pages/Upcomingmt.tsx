import { Suspense, useState } from 'react';
import { lazy } from 'react';
const Modal = lazy(() => import('../components/Modal'));
import InfiniteScroll from 'react-infinite-scroll-component';
import useUC from '../hooks/useUC';
import Heading from '../components/Heading';
import Loading from '../components/Loading';
const Cards = lazy(() => import('../components/Cards'));
import { Fetching } from '../types/Fetching';

const Upcomingmt = () => {
    const [modalData, setModalData] = useState<{
        show: boolean;
        data: Fetching;
    }>({
        show: false,
        data: {} as Fetching,
    });

    const {
        data: datas,
        error,
        isLoading,
        fetchNextPage,
        hasNextPage,
    } = useUC();
    
   

    if (isLoading) return <Loading />;

    if (error) return <p>{error.message}</p>;

    const fetchedTrendingPages =
        datas?.pages.reduce((total, page) => total + page.results.length, 0) ||
        0;

    const loader = <Loading />;

    return (
        <>
            <div className='bg-black-c'>
                <Heading title='Upcoming Movies' />
                <InfiniteScroll
                    next={() => fetchNextPage()}
                    hasMore={!!hasNextPage}
                    loader={loader}
                    dataLength={fetchedTrendingPages}
                    className='display-grid'>
                    <Cards datas={datas} setModalData={(data) => setModalData(data)}/>
                </InfiniteScroll>
                {modalData.show && (
                    <Suspense fallback={<Loading />}>
                        <Modal
                        datas={modalData.data}
                        show={true}
                        isOpen={modalData.show}
                        setIsOpen={(isOpen) => setModalData({ ...modalData, show: isOpen })}/>
                    </Suspense>
                )}
            </div>
        </>
    );
};

export default Upcomingmt;
