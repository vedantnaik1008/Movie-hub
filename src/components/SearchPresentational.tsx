import { NavLink } from 'react-router-dom';
import { Fetching } from '../types/Fetching';
import { ArrowLeft, Search } from '../lib/icons/ReactIcons';
import CartButton from './CartButton';
import IImage from './Image';

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
    Searches
}: Props) => {
    return (
        <>
            <NavLink to={'/'}>
                <button className='close-btn-search'>
                    <ArrowLeft size='35px' color='white' />
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
                    <Search color='white' size={20} />
                </button>
            </div>
            <div
                className={
                    content.length
                        ? 'display-grid-search'
                        : 'display-grid-search-empty'
                }>
                {content.map((val, i) => (
                    <div key={val.id}>
                        <div className='cards'>
                            <IImage i={i} setModalData={setModalData} val={val} />
                            <CartButton actionType='add' val={val} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SearchPresentational;
