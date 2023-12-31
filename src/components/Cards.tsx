import { InfiniteData } from '@tanstack/react-query';
import React, { lazy } from 'react';
import { FetchResponse } from '../Services/api-client';
const CartButton = lazy(() => import('./CartButton'));
import { Fetching } from '../types/Fetching';
import Image from './Image';

type Props = {
    datas: InfiniteData<FetchResponse<Fetching>>;
    setModalData: (data: { show: true; data: Fetching }) => void;
};
const Cards = ({ datas, setModalData }: Props) => {
    return (
        <>
            {datas.pages.map((page, index) => (
                <React.Fragment key={index}>
                    {page.results.map((val) => (
                        <div key={val.id}>
                            <div className='cards'>
                                <Image setModalData={setModalData} val={val} />
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
