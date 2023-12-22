import { Suspense, useState, lazy } from 'react';
const Pagination = lazy(() => import('../components/Pagination'));
const Modal = lazy(() => import('../components/Modal'));
import { Fetching } from '../types/Fetching';
import Loading from '../components/Loading';
import SearchPresentational from '../components/SearchPresentational';
import useSearch from '../hooks/useSearch';

const Search = () => {
    const  {content, Trigger, Searches, page, setPage}  = useSearch()
    const [modalData, setModalData] = useState({
        show: false,
        data: {} as Fetching
    });

    return (
        <>
            <div className='bg-black-search'>
                <SearchPresentational
                    content={content}
                    Trigger={Trigger}
                    Searches={Searches}
                    setModalData={(data) => setModalData(data)}
                />
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
                {page > 1 && <Pagination page={page} setPage={setPage} />}
            </div>
        </>
    );
};

export default Search;
