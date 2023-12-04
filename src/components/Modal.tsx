import ModalCard from './ModelCard';

interface Props {
    show: boolean;
    page: number;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    poster_path: string;
    vote_average: number;
    title: string;
    name: string;
    media_type: string;
    overview: string;
    first_air_date: string;
    release_date: string;
    id: number;
}

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
}: Props) => {
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
