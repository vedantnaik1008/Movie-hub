import { Suspense, useEffect, useState, lazy } from 'react';
const Pagination = lazy(() => import('../components/Pagination'));
import axios from 'axios';
import { img_500, unavailable } from '../Services/Config';

const Modal = lazy(() => import('../components/Modal'));
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { WatchItem, ADD } from '../components/WatchSlice';
import { RootState } from '../store';
import { APIKEY } from '../Services/api-client';
import { FaStar } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { Fetching } from '../types/Fetching';
import Loading from '../components/Loading';

const Search = () => {
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [content, setContent] = useState<Fetching[]>([]);
    const [modalData, setModalData] = useState<{
        show: boolean;
        data: Fetching;
    }>({
        show: false,
        data: {} as Fetching,
    });
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.watchlater);
    const addToCart = (watchlater: WatchItem) => {
        const alreadyInWatchList = products.watchlater.some(
            (item) => item.id === watchlater.id
        );
        if (!alreadyInWatchList) {
            dispatch(ADD(watchlater));
            toast.success('Added to watch later!');
        }
    };

    const fetchSearch = () => {
        axios
            .get<Fetching>(
                `https://api.themoviedb.org/3/search/multi?api_key=${APIKEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false
    `
            )
            .then((res) => {
                setContent(res.data.results);
                console.log(res.data.results);
            })
            .catch((error) => error);
    };

    useEffect(() => {
        fetchSearch();
    }, []);

    const Trigger = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const Searches = () => {
        fetchSearch();
    };

    return (
        <>
            <div className='pb-5'>
                <div className='input-title'>
                    <input
                        type='text'
                        placeholder='search...'
                        onChange={Trigger}
                        className='form-control-lg col-6 search rounded-5 border border-0  mt-2'
                    />
                    <button
                        aria-label='search'
                        className='text-white mx-2 col-md-1 mt-2 search-title'
                        onClick={Searches}>
                        <IoSearch />
                    </button>
                </div>
                <div
                    className={
                        content.length
                            ? 'display-grid-search'
                            : 'display-grid-search p-0'
                    }>
                    {content.map((val) => (
                        <div key={val.id} id='card'>
                            <div className='cards  rounded-5'>
                                <img
                                    loading='lazy'
                                    src={
                                        val.poster_path
                                            ? `${img_500 + val.poster_path}`
                                            : unavailable
                                    }
                                    className='card-img-top rounded-5'
                                    alt={val.title || val.name}
                                    onClick={() =>
                                        setModalData({ show: true, data: val })
                                    }
                                />

                                <button
                                    className='watch-add'
                                    onClick={() => {
                                        addToCart(val);
                                    }}>
                                    <FaStar size='25' color='yellow' />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {modalData.show && (
                    <Suspense fallback={<Loading />}>
                    <Modal
                        datas={modalData.data} page={page}
                        show={true}
                        isOpen={modalData.show}
                        setIsOpen={(isOpen) => setModalData({ ...modalData, show: isOpen })}/>
                    </Suspense>
                )}
                {page > 1 && <Pagination page={page} setPage={setPage} />}
            </div>
        </>
    );
};

export default Search;
