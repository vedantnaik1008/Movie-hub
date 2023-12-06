import { Fetching } from "./Fetching";

export interface ModalProps {
    show: boolean;
    isOpen: boolean;
    page: number;
    setIsOpen: (isOpen: boolean) => void;
    datas: Fetching;
}

