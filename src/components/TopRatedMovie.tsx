import useTopRatedMovie from '../hooks/useTopRatedMovie';
import { Suspense, useState, lazy} from 'react';
const Modal = lazy(() => import('./Modal'));
import Loading from './Loading';
import { Fetching } from '../types/Fetching';
import SliderPresentational from './SliderPresentational';

const TopRatedMovie = () => {
    const { data, error } = useTopRatedMovie();
    const [modalData, setModalData] = useState<{
        show: boolean;
        data: Fetching;
    }>({
        show: false,
        data: {} as Fetching,
    });

    if (error) return <p>{error.message}</p>;

    return (
        <>
            <SliderPresentational
                data={data?.results}
                setModalData={(data) => setModalData(data)}
                title={"Top Rated Movies"} link={'/topratedmovies'}/>
            {modalData.show && (
                <Suspense fallback={<Loading />}>
                    <Modal
                datas={modalData.data}
                show={true}
                isOpen={modalData.show}
                setIsOpen={(isOpen) =>
                    setModalData({ ...modalData, show: isOpen })}/> 
                </Suspense>
                
            )}
        </>
    );
};

export default TopRatedMovie;
