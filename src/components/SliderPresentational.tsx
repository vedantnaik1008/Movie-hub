import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';
import { img_500 } from '../data/constant';
import { settings } from '../Services/Settings';
import { Fetching } from '../types/Fetching';

interface Props {
    data: Fetching[] | undefined;
    setModalData: (data: { show: true; data: Fetching }) => void;
    title: string;
    link: string;
}
const SliderPresentational = ({ data, setModalData, title, link }: Props) => {
    return (
        <>
            <section
                className={'others-three'}>
                <div className='others-three-container'>
                    <h1 className=''>{title}</h1>
                    <NavLink to={link} className='others-navlink'>
                        <p className=''>Show more</p>
                    </NavLink>
                </div>
                <Slider {...settings} className='whole-slider'>
                    {data?.slice(15).map((i) => (
                        <div key={i.id} className='slider'>
                            <img
                                sizes='(min-width: 400px) 328px, calc(56.25vw + 114px)'
                                loading='lazy'
                                width={'397px'}
                                height={'300px'}
                                src={img_500 + i.backdrop_path}
                                alt={i.name || i.title}
                                onClick={() =>
                                    setModalData({ show: true, data: i })
                                }
                            />
                        </div>
                    ))}
                </Slider>
            </section>
        </>
    );
};

export default SliderPresentational;
