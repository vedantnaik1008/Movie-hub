import { useSelector, useDispatch } from 'react-redux';
import { REMOVE } from '../redux/WatchSlice';
import { RootState } from '../redux/store';
import { Suspense, useState } from 'react';
import { lazy } from 'react';
import { Fetching } from '../types/Fetching';
import Loading from '../components/Loading';
import { useAuth0 } from '@auth0/auth0-react';
const Modal = lazy(() => import('../components/Modal'));
import LoginButton from '../components/Login/LoginButton';
import { IoClose } from '../lib/icons/ReactIcons';
import Image from '../components/Image';

const WatchLater = () => {
    const { isAuthenticated } = useAuth0();
    const [modalData, setModalData] = useState<{
        show: boolean;
        data: Fetching;
    }>({
        show: false,
        data: {} as Fetching,
    });
    const products = useSelector((state: RootState) => state.watchlater);
    const dispatch = useDispatch();
    const removeToCart = (id: number) => {
        dispatch(REMOVE(id));
    };
    return (
        <>
            <div className='watch-padding bg-black-c'>
                {isAuthenticated ? (
                    <div className='display-grid-watch-later'>
                        {products.watchlater.map((val: Fetching) => (
                            <div key={val.id} id='card'>
                                <div className='cards'>
                                    <Image setModalData={setModalData} val={val}/>
                                    <button
                                        className='watch-remove'
                                        onClick={() => removeToCart(val.id)}>
                                        <IoClose size='35px' color='white' />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <LoginButton />
                )}
            </div>
            {modalData.show && (
                <Suspense fallback={<Loading />}>
                    <Modal
                        datas={modalData.data}
                        show={true}
                        isOpen={modalData.show}
                        setIsOpen={(isOpen) =>
                            setModalData({ ...modalData, show: isOpen })
                        }
                    />
                </Suspense>
            )}
        </>
    );
};

export default WatchLater;
