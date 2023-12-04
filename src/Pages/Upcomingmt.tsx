import { useState } from 'react';
import { Fetching } from './Trending';
import { lazy } from 'react';
const Modal = lazy(() => import('../components/Modal'));
import InfiniteScroll from 'react-infinite-scroll-component';
import useUC from '../hooks/useUC';
import Heading from '../components/Heading';
import Loading from '../components/Loading';
import Cards from '../components/Cards';

const Upcomingmt = () => {
    const [page] = useState(1);
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

export default Upcomingmt;
