
import { ModalProps } from '../types/ModalTypes';
import ModalCard from './ModelCard';

const Modal = ({
    show,
    isOpen,
    setIsOpen,
    poster_path,
    vote_average,
    title,
    name,
    media_type,
    overview,
    first_air_date,
    release_date,
    id,
    page,
}: ModalProps) => {
    return (
        <>
            <ModalCard
                show={show}
                isOpen={isOpen}
                page={page}
                setIsOpen={setIsOpen}
                poster_path={poster_path}
                vote_average={vote_average}
                title={title}
                name={name}
                media_type={media_type}
                overview={overview}
                first_air_date={first_air_date}
                release_date={release_date}
                id={id}
            />
        </>
    );
};

export default Modal;
