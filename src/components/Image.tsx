import { img_500, unavailable } from '../data/constant';
import { Fetching } from '../types/Fetching';

type Props = {
    setModalData: (data: { show: true; data: Fetching }) => void;
    val: Fetching;
    i: number
};

const Image = ({ setModalData, val, i }: Props) => {
    return (
        <img
            sizes='(min-width: 400px) 328px, calc(56.25vw + 114px)'
            loading={i === 0 ? 'eager' : 'lazy'}
            width={'319px'}
            height={'520px'}
            src={val.poster_path ? `${img_500 + val.poster_path}` : unavailable}
            className='card-img-top'
            alt={val.title || val.name}
            onClick={() =>
                setModalData({
                    show: true,
                    data: val
                })
            }
        />
    );
};

export default Image;
