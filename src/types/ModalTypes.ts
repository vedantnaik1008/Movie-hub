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