import { memo, useEffect } from 'react';
import { img_500 } from '../data/constant';
import unavailable from '../../images/poster-holder.jpg';
import { Fetching } from '../types/Fetching';

type Props = {
    setModalData: (data: { show: true; data: Fetching }) => void;
    val: Fetching;
    i: number;
    index: number;
};

const Image = memo(({ setModalData, val, i, index }: Props) => {
    useEffect(() => {
        if (index === 0 && i === 0) {
            const imageUrl = `${img_500 + val.poster_path}`;
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
    }, [i, index, val.poster_path]);

    return (
        <>
            <img
                sizes='(min-width: 400px) 328px, calc(56.25vw + 114px)'
                loading={i === 0 ? 'eager' : 'lazy'}
                width={'319px'}
                height={'520px'}
                src={
                    val.poster_path
                        ? `${img_500 + val.poster_path}`
                        : unavailable
                }
                className='card-img-top'
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
})

export default Image;
