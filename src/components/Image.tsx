import { useState } from 'react';
import { img_500 } from '../data/constant';
import unavailable from '../../images/poster-holder.jpg';
import { Fetching } from '../types/Fetching';

type Props = {
    setModalData: (data: { show: true; data: Fetching }) => void;
    val: Fetching;
    i: number;
};

const Image = ({ setModalData, val, i }: Props) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <>
            <img
                sizes='(min-width: 400px) 328px, calc(56.25vw + 114px)'
                loading={i === 0 ? 'eager' : 'lazy'}
                width={'319px'}
                height={'520px'}
                src={imageLoaded ? `${img_500 + val.poster_path}` : unavailable}
                className='card-img-top'
                alt={val.title || val.name}
                onClick={() =>
                    setModalData({
                        show: true,
                        data: val
                    })
                }
                onLoad={handleImageLoad}
            />
        </>
    );
};

export default Image;
