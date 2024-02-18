import { useEffect, useState } from 'react';
import { img_500, unavailable } from '../data/constant';
import { Fetching } from '../types/Fetching';

type Props = {
    setModalData: (data: { show: true; data: Fetching }) => void;
    val: Fetching;
    i: number;
    width: string;
    height: string;
};

const IImage = ({ setModalData, val, i, height, width }: Props) => {
    const { poster_path } = val
    const [imgSrc, setSrc] = useState(unavailable || poster_path)
    const customClass = unavailable && imgSrc === unavailable ? 'loading' : 'loaded';
    useEffect(()=> {
      const img = new Image() 
      img.src = poster_path
      img.onload = () => {
        setSrc(poster_path)
      }
        
    }, [poster_path])
    return (
        <img
            sizes='(min-width: 400px) 328px, calc(56.25vw + 114px)'
            loading={i === 0 ? 'eager' : 'lazy'}
            width={width}
            height={height}
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
    );
};

export default IImage;
