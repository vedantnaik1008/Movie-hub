import useUpcoming from '../hooks/useUpcoming';
import { useState } from 'react';
import Modal from './Modal';
import Loading from './Loading';
import { Fetching } from '../types/Fetching';
import SliderPresentational from './SliderPresentational';

const TopUpcomingMovie = () => {
    const {data, error, isLoading} = useUpcoming()
    const [page] = useState(1);
    const [modalData, setModalData] = useState<{ show: boolean; data: Fetching }>({
        show: false,
        data: {} as Fetching,
    });

    if(isLoading) return <Loading />
    
    if(error) return <p>{error.message}</p>;


    return (
        <>
            <SliderPresentational data={data.results} setModalData={(data) => setModalData(data)} />
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
        </>
    );
};

export default TopUpcomingMovie;
