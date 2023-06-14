// import axios from 'axios'
// import React, { useState } from 'react'
// import { Access_key } from './Config';

// interface Props{
//     id: number;
// }

// interface FetchingCast{
//     id: number;
// }

// const CastMT = () => {
//     const [content, setContent] = useState<FetchingCast[]>([])
//    const fetchCast = ({id}: Props) =>{
//     axios
//             .get<FetchingCast>(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${Access_key}`)
//             .then((res) => {
//              setContent(res.data.id)
//             })
//             .catch((error) => error);
//    }
//   return (
//     <>
//         <div>
//             {content.map((i)=>(
//                 <p key={i.id}></p>
//             ))}
//         </div>
//     </>
//   )
// }

// export default CastMT
