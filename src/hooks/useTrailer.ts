import { useState } from 'react';
import { APIKEY } from '../services/api-client';

interface Video {
    key: string;
    name: string;
    type: string;
    videos: [];
}

type Props = {
    id: number;
    page: number;
};

export const useTrailer = ({ id, page }: Props) => {
    const [trailer, setTrailer] = useState<Video>();
    const fetchTrailer = async () => {
        try {
            const response = await fetch(`
          https://api.themoviedb.org/3/movie/${id}?top_rated?language=en-US&api_key=${APIKEY}&page=${page}&append_to_response=videos&sort_by=vote_average.desc
          `);
            const data = await response.json();
            console.log(data);
            const trailer =
                data.videos.results.find(
                    (video: Video) => video.type === 'Trailer'
                ) || data.results[0];
            if (trailer) {
                setTrailer(trailer);
            } else {
                console.log('No trailer found', alert('no trailer found'));
            }
        } catch (error) {
            console.error('Error fetching movie trailer', error);
        }
    };

    return { trailer, setTrailer, fetchTrailer };
};
