import { InfiniteData } from '@tanstack/react-query'
import React from 'react'
import { FetchResponse } from '../Services/api-client'
import AddCartButton from './AddCartButton'
import { img_500, unavailable } from '../Services/Config'
import { Fetching } from '../Pages/Trending'

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
                                <div key={val.id} id='card'>
                                    <div className='cards'>
                                        <img
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
