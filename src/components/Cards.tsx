import { InfiniteData } from '@tanstack/react-query';
import React, { lazy } from 'react';
import { FetchResponse } from '../Services/api-client';
const CartButton = lazy(() => import('./CartButton'));
import { Fetching } from '../types/Fetching';
import Image from './Image';
import { Link } from 'react-router-dom';

type Props = {
    datas: InfiniteData<FetchResponse<Fetching>>;
    setModalData: (data: { show: true; data: Fetching }) => void;
    FilterType: string;
};
const Cards = ({ datas, setModalData, FilterType }: Props) => {
    return (
        <>
            {datas.pages.map((page, index) => (
                <React.Fragment key={index}>
                    {page.results.map((val) => (
                        <div key={val.id}>
                            <div className='cards'>
                                <Link to={`/${FilterType}/${val.id}`}>
                                    <Image
                                        setModalData={setModalData}
                                        val={val}
                                    />
                                    <CartButton actionType='add' val={val} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </React.Fragment>
            ))}
        </>
    );
};

export default Cards;
