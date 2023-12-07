import { Suspense, useEffect, useState, lazy, useCallback } from 'react';
const Pagination = lazy(() => import('../components/Pagination'));
import axios from 'axios';
import { img_500, unavailable } from '../Services/Config';
import { GoArrowLeft } from "react-icons/go"
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
import { NavLink } from 'react-router-dom';

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
            (item: Fetching) => item.id === watchlater.id
        );
        if (!alreadyInWatchList) {
            dispatch(ADD(watchlater));
            toast.success('Added to watch later!');
        }
    };

    const fetchSearch = useCallback(async () => {
        axios
            .get<Fetching>(
                `https://api.themoviedb.org/3/search/multi?api_key=${APIKEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
            )
            .then((res) => {
                setContent(res.data.results);
                console.log(res.data.results);
            })
            .catch((error) => error);
    }, [searchText, page]);

    useEffect(() => {
        fetchSearch();
    }, [fetchSearch]);

    const Trigger = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const Searches = () => {
        fetchSearch();
    };

    return (
        <>
            <div className='bg-black-search'>
                <NavLink to={'/'}>
                    <button className='close-btn-search'>
                        <GoArrowLeft size='35px' color="white"/>
                    </button>
                </NavLink>
                <div className='input-title'>
                    <input
                        type='text'
                        placeholder='search...'
                        onChange={Trigger}
                        className='search'
                    />
                    <button
                        aria-label='search'
                        className='search-title'
                        onClick={Searches}>
                        <IoSearch color='white' size={20} />
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
                            datas={modalData.data}
                            page={page}
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
