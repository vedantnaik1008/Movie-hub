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
    const { poster_path } = val;
    const [imgSrc, setSrc] = useState(unavailable || poster_path);
    const customClass =
        unavailable && imgSrc === unavailable ? 'loading' : 'loaded';
    useEffect(() => {
const img = new Image();
img.src = poster_path;
img.onload = () => {
    setSrc(poster_path);
};
        if (index < 1 && i === 0) {
            const imageUrl = `${img_500 + poster_path}`;
            const preloadedImages = JSON.parse(
                sessionStorage.getItem('preloadedImages') || '[]'
            );

            if (!preloadedImages.includes(imageUrl)) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = imageUrl;
                document.head.appendChild(link);

                preloadedImages.push(imageUrl);
                sessionStorage.setItem(
                    'preloadedImages',
                    JSON.stringify(preloadedImages)
                );
            }
        }
        
    }, [i, index, poster_path]);

    return (
        <>
            <img
                sizes='(min-width: 400px) 328px, calc(56.25vw + 114px)'
                loading={index < 1 && i === 0 ? 'eager' : 'lazy'}
                width={'319px'}
                height={'520px'}
                src={imgSrc ? `${img_500 + imgSrc}` : unavailable}
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
