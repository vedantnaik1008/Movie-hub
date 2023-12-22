import { FaStar } from 'react-icons/fa6';
import { GoArrowLeft } from 'react-icons/go';
import { IoSearch } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { img_500, unavailable } from '../data/constant';
import { Fetching } from '../types/Fetching';
import { toast } from 'react-toastify';
import { WatchItem, ADD } from '../redux/WatchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

type Props = {
    content: Fetching[];
    setModalData: (data: { show: true; data: Fetching }) => void;
    Trigger: (e: React.ChangeEvent<HTMLInputElement>) => void;
    Searches: () => void;
};

const SearchPresentational = ({
    content,
    setModalData,
    Trigger,
    Searches,
}: Props) => {
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
    return (
        <>
            <NavLink to={'/'}>
                <button className='close-btn-search'>
                    <GoArrowLeft size='35px' color='white' />
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
                        : 'display-grid-search-empty'
                }>
                {content.map((val) => (
                    <div key={val.id}>
                        <div className='cards'>
                            <img
                                sizes='(min-width: 400px) 328px, calc(56.25vw + 114px)'
                                loading='lazy'
                                src={
                                    val.poster_path
                                        ? `${img_500 + val.poster_path}`
                                        : unavailable
                                }
                                className='card-img-top'
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
        </>
    );
};

export default SearchPresentational;
