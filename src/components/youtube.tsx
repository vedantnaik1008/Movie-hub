import { useState, useEffect } from 'react';
import { google } from 'googleapis';
import Youtube from './youtubett';
import { Access_key } from './Config';

interface Video {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
  }
  
 

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const auth = new google.auth.GoogleAuth({
        keyFile: `${Access_key}`,
        scopes: ['https://www.googleapis.com/auth/youtube.force-ssl'],
      });
      const youtube = google.youtube({ version: 'v3', auth });

      const res = await youtube.search.list({
        part: ['id', 'snippet'],
        q: 'react tutorial',
        maxResults: 10,
      });

      const videoData = res.data.items?.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
      }));

      setVideos(videoData);
    };

    fetchVideos();
  }, []);

  return (
    <div>
      {videos.map((video) => (
        <Youtube 
          key={video.id} 
          videoId={video.id} 
          videoTitle={video.title} 
        />
      ))}
    </div>
  );
};

export default VideoList;