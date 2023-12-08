
import { ModalProps } from '../types/ModalTypes';
import ModalCard from './ModelCard';

const Modal = ({ datas,show, isOpen,  setIsOpen }: ModalProps) => {
    return (
        <>
            <ModalCard datas={datas} show={show} isOpen={isOpen} setIsOpen={setIsOpen}/>
        </>
    );
};

export default Modal;
