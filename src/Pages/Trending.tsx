import { Suspense, useState } from 'react';
import { lazy } from 'react';
const Modal = lazy(() => import('../components/Modal'));
import useTrending from '../hooks/useTrending';
import InfiniteScroll from 'react-infinite-scroll-component';
import Heading from '../components/Heading';
import Loading from '../components/Loading';
import Cards from '../components/Cards';
import { Fetching } from '../types/Fetching';


const Trending = () => {
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
    } = useTrending();
   
    if (isLoading) return <Loading />;

    if (error) return <p>{error.message}</p>;

    const fetchedTrendingPages =
        datas?.pages.reduce((total, page) => total + page.results.length, 0) ||
        0;

    const loader = <Loading />;

    return (
        <>
            <div className='bg-black-c'>
                <Heading title='Trending' />
                <InfiniteScroll
                    next={() => fetchNextPage()}
                    hasMore={!!hasNextPage}
                    loader={loader}
                    dataLength={fetchedTrendingPages}
                    className='display-grid'>
                    <Cards datas={datas} setModalData={(data) => setModalData(data)} FilterType={'trending'}/>
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

export default Trending;
