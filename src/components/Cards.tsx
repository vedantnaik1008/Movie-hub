import { InfiniteData } from '@tanstack/react-query';
import { FetchResponse } from '../Services/api-client';
import CartButton from './CartButton';
import { Fetching } from '../types/Fetching';
import Image from './Image';
import React from 'react';

type Props = {
    datas: InfiniteData<FetchResponse<Fetching>>;
    setModalData: (data: { show: true; data: Fetching }) => void;
};
const Cards = ({ datas, setModalData }: Props) => {
    return (
        <>
            {datas.pages.map((page, index) => (
                <React.Fragment key={index}>
                    {page.results.map((val, i) => (
                        <div key={val.id}>
                            <div className='cards'>
                                <Image setModalData={setModalData} val={val} i={i} />
                                <CartButton actionType='add' val={val} />
                            </div>
                        </div>
                    ))}
                </React.Fragment>
            ))}
        </>
    );
};

export default Cards;
