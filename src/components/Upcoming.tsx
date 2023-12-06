import useUpcoming from '../hooks/useUpcoming';
import { Suspense, useState, lazy } from 'react';
const Modal = lazy(() => import('./Modal'));
import Loading from './Loading';
import { Fetching } from '../types/Fetching';
import SliderPresentational from './SliderPresentational';

const TopUpcomingMovie = () => {
    const { data, error, isLoading } = useUpcoming();
    const [page] = useState(1);
    const [modalData, setModalData] = useState<{
        show: boolean;
        data: Fetching;
    }>({
        show: false,
        data: {} as Fetching,
    });

    if (isLoading) return <Loading />;

    if (error) return <p>{error.message}</p>;

    return (
        <>
            <SliderPresentational
                data={data.results}
                setModalData={(data) => setModalData(data)}
            />
            {modalData.show && (
                <Suspense fallback={<Loading />}>
                <Modal
            datas={modalData.data}
            page={page}
            show={true}
            isOpen={modalData.show}
            setIsOpen={(isOpen) =>
                setModalData({ ...modalData, show: isOpen })}/> 
            </Suspense>
            )}
        </>
    );
};

export default TopUpcomingMovie;
