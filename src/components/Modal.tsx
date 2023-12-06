
import { ModalProps } from '../types/ModalTypes';
import ModalCard from './ModelCard';

const Modal = ({ datas,show,isOpen, page, setIsOpen }: ModalProps) => {
    return (
        <>
            <ModalCard datas={datas} show={show} isOpen={isOpen} page={page} setIsOpen={setIsOpen}/>
        </>
    );
};

export default Modal;
