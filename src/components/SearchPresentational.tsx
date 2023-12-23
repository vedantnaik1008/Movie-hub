import { NavLink } from 'react-router-dom';
import { img_500, unavailable } from '../data/constant';
import { Fetching } from '../types/Fetching';
import { IoArrowBack, IoSearch } from '../lib/icons/ReactIcons';
import AddCartButton from './AddCartButton';

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

    return (
        <>
            <NavLink to={'/'}>
                <button className='close-btn-search'>
                    <IoArrowBack size='35px' color='white' />
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
                            <AddCartButton val={val} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SearchPresentational;
