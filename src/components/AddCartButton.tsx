import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from '../redux/store';
import { WatchItem, ADD } from '../redux/WatchSlice';
import { FaStar } from 'react-icons/fa';

type Props = {
    val: WatchItem;
};

const AddCartButton = ({val}: Props) => {
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
    return (
        <>
            <button
                className='watch-add'
                onClick={() => {
                    addToCart(val);
                }}>
                <FaStar size='25' color='yellow' />
            </button>
        </>
    );
};

export default AddCartButton;
