import { IoClose } from 'react-icons/io5';
import { useTrailer } from '../hooks/useTrailer';

type Props = {
    id: number;
    page: number;
};

const Trailer = ({ id, page }: Props) => {
    const { trailer, setTrailer } = useTrailer({ id, page });
    return (
        <>
            {trailer ? (
                <div className='modal-trailer'>
                    <button
                        className='close-btn-trailer'
                        onClick={() => setTrailer(undefined)}>
                        <IoClose size='35px' />
                    </button>
                    <iframe
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                        title={trailer.name}
                        allowFullScreen
                    />
                </div>
            ) : null}
        </>
    );
};

export default Trailer;
