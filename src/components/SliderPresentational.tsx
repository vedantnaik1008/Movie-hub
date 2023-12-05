import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';
import { img_500 } from '../Services/Config';
import { settings } from '../Services/Settings';
import { Fetching } from '../types/Fetching';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
    data: Fetching[];
    setModalData: (data: { show: true; data: Fetching }) => void;
}
const SliderPresentational = ({
    data,
    setModalData
}: Props) => {
    return (
        <>
            <section className={`others-three`}>
                <div className='d-flex justify-content-between align-items-center gap-5 width-80'>
                    <h1 className=' text-white fw-800 mb-3 title-space '>
                        Upcoming Movies
                    </h1>
                    <NavLink to='/Upcomingmt' className='others-navlink'>
                        <p className='text-white fs-4 text-nowrap title-para'>
                            Show more
                        </p>
                    </NavLink>
                </div>
                <Slider {...settings} className='whole-slider'>
                    {data.slice(12).map((i) => (
                        <div key={i.id} className='slider'>
                            <img
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
