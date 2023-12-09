import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';
import { img_500 } from '../Services/Config';
import { settings } from '../Services/Settings';
import { Fetching } from '../types/Fetching';

interface Props {
    data: Fetching[];
    setModalData: (data: { show: true; data: Fetching }) => void;
    title: string;
    link: string;
}
const SliderPresentational = ({ data, setModalData, title, link }: Props) => {
    return (
        <>
            <section className={`others-three`}>
                <div className='others-three-container'>
                    <h1 className=''>{title}</h1>
                    <NavLink to={link} className='others-navlink'>
                        <p className=''>Show more</p>
                    </NavLink>
                </div>
                <Slider {...settings} className='whole-slider'>
                    {data.slice(12).map((i) => (
                        <div key={i.id} className='slider'>
                            <img
                                loading='lazy'
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
