import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Suspense, useState } from 'react';
import { lazy } from 'react';
import { Fetching } from '../types/Fetching';
import Loading from '../components/Loading';
import { useAuth0 } from '@auth0/auth0-react';
const Modal = lazy(() => import('../components/Modal'));
import LoginButton from '../components/Login/LoginButton';
import Image from '../components/Image';
import CartButton from '../components/CartButton';

const WatchLater = () => {
    const { isAuthenticated } = useAuth0();
    const [modalData, setModalData] = useState<{
        show: boolean;
        data: Fetching;
    }>({
        show: false,
        data: {} as Fetching
    });
    const products = useSelector((state: RootState) => state.watchlater);

    return (
        <>
            <div className='watch-padding bg-black-c'>
                {isAuthenticated ? (
                    <div className='display-grid-watch-later'>
                        {products.watchlater.map((val: Fetching, i) => (
                            <div key={val.id} id='card'>
                                <div className='cards'>
                                    <Image
                                    i={i}
                                        setModalData={setModalData}
                                        val={val}
                                    />
                                    <CartButton actionType='remove' val={val} />
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
