import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from '../redux/store';
import { ADD, REMOVE } from '../redux/WatchSlice';
import { IoClose, IoStar } from '../lib/icons/ReactIcons';
import { Fetching } from '../types/Fetching';

type Props = {
    val: Fetching;
    actionType: 'add' | 'remove';
};

const CartButton = ({val, actionType}: Props) => {
     const dispatch = useDispatch();
     const products = useSelector((state: RootState) => state.watchlater);
     const handleAction = (watchlater: Fetching) => {
         const alreadyInWatchList = products.watchlater.some(
             (item) => item.id === watchlater.id
         );
         if (actionType === 'add' && !alreadyInWatchList) {
             dispatch(ADD(watchlater));
             toast.success('Added to watch later!');
         } else if (actionType === 'remove') {
             dispatch(REMOVE(watchlater.id));
             toast.success('Removed from watch later!');
         }
     };

    return (
        <>
            <button
                className={`watch-${actionType}`}
                onClick={() => {
                    handleAction(val);
                }}>
                {actionType === 'add' ? (
                    <IoStar size='25' color='yellow' />
                ) : (
                    <IoClose size='35px' color='white' />
                )}
            </button>
        </>
    );
};

export default CartButton;
