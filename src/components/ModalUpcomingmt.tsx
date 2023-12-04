import ModalCard from './ModelCard';

export interface ModalProps {
    show: boolean;
    isOpen: boolean;
    page: number;
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

const ModalUpcomingmt = ({
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

export default ModalUpcomingmt;
