import { Fetching } from "./Fetching";

export interface ModalProps {
    show: boolean;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    datas: Fetching;
}

