import { NavLink } from 'react-router-dom';
import { Fetching } from '../types/Fetching';
import { IoArrowBack, IoSearch } from '../lib/icons/ReactIcons';
import AddCartButton from './AddCartButton';
import Image from './Image';

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
                            <Image setModalData={setModalData} val={val} />
                            <AddCartButton val={val} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SearchPresentational;
