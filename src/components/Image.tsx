import { memo, useEffect, useState } from 'react';
import { img_500 } from '../data/constant';
import unavailable from '../../images/poster-holder.jpg';
import { Fetching } from '../types/Fetching';

type Props = {
    setModalData: (data: { show: true; data: Fetching }) => void;
    val: Fetching;
    i: number;
    index?: number;
};

const Images = memo(({ setModalData, val, i, index = 0 }: Props) => {
    const [imgSrc, setSrc] = useState(unavailable || img_500 + val.poster_path);
    const customClass = '';
    // unavailable && imgSrc === unavailable ? 'loading' : 'loaded';
    useEffect(() => {
        const img = new Image();
        img.src = img_500 + val.poster_path;
        img.onload = () => {
            setSrc(img_500 + val.poster_path);
        };
    }, [val.poster_path]);
    
    console.log(val);

    return (
        <>
            <img
                sizes='(min-width: 400px) 328px, calc(56.25vw + 114px)'
                loading={index < 1 && i === 0 ? 'eager' : 'lazy'}
                width={'319px'}
                height={'520px'}
                decoding='async'
                src={imgSrc ? `${imgSrc}` : unavailable}
                className={`card-img-top ${customClass}`}
                alt={val.title || val.name}
                onClick={() =>
                    setModalData({
                        show: true,
                        data: val
                    })
                }
            />
        </>
    );
});

export default Images;
