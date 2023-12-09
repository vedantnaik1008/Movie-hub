import { InfiniteData } from '@tanstack/react-query'
import React, { lazy } from 'react'
import { FetchResponse } from '../Services/api-client'
const AddCartButton = lazy(() => import('./AddCartButton'))
import { img_500, unavailable } from '../Services/Config'
import { Fetching } from '../types/Fetching'

type Props = {
    datas: InfiniteData<FetchResponse<Fetching>>;
    setModalData: (data: {show: true, data: Fetching}) => void;
}
const Cards = ({ datas, setModalData }: Props) => {
    
  return (
    <>
      {datas.pages.map((page, index) => (
                        <React.Fragment key={index}>
                            {page.results.map((val) => (
                                <div key={val.id}>
                                    <div className='cards'>
                                        <img sizes="(min-width: 400px) 328px, calc(56.25vw + 114px)"
                                            loading='lazy'
                                            src={
                                                val.poster_path
                                                    ? `${
                                                          img_500 +
                                                          val.poster_path
                                                      }`
                                                    : unavailable
                                            }
                                            className='card-img-top'
                                            alt={val.title || val.name}
                                            onClick={() =>
                                                setModalData({
                                                    show: true,
                                                    data: val,
                                                })
                                            }
                                        />
                                        <AddCartButton val={val}/>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
    </>
  )
}

export default Cards
