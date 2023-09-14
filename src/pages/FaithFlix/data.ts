/*
*  video_id SERIAL PRIMARY KEY,
    youtube_video_id VARCHAR(255),
    video_url VARCHAR(255),
    title VARCHAR(255),
    cover_url VARCHAR(255),
    description TEXT,
    duration VARCHAR(255),
    release_date TIMESTAMP,
    channel_id INTEGER REFERENCES channels(channel_id),
    average_rating DECIMAL(3, 2) DEFAULT 0,
    definition VARCHAR(255)  CHECK (definition IN ('hd', 'sd')),
    viewCount INTEGER DEFAULT 0,
    likeCount INTEGER DEFAULT 0,
    favoriteCount INTEGER DEFAULT 0,
    commentCount INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
*
*
* */


export interface VideoData {
    key: number;
    video_id: number;
    youtube_video_id: string;
    video_url: string;
    title: string;
    cover_url: string;
    description: string;
    duration: string;
    release_date: string;
    channel_id: number;
    average_rating: number;
    definition: string;
    viewCount: number;
    likeCount: number;
    favoriteCount: number;
    commentCount: number;
    created_at: string;
    updated_at: string;archived: boolean;
    has_video_credits: boolean;
    has_subtitles: boolean;
    has_video_tags: boolean;
}


interface VideoDBData {
    video_id: number;
    youtube_video_id: string;
    video_url: string;
    title: string;
    cover_url: string;
    description: string;
    duration: string;
    release_date: string; // 或者使用 Date 类型，根据您的需求
    channel_id: number;
    average_rating: number;
    definition: "hd" | "sd"; // 只允许 'hd' 或 'sd'
    viewCount: number;
    likeCount: number;
    favoriteCount: number;
    commentCount: number;
    created_at: string; // 或者使用 Date 类型，根据您的需求
    updated_at: string; // 或者使用 Date 类型，根据您的需求
    archived: boolean;
    has_video_credits: boolean;
    has_subtitles: boolean;
    has_video_tags: boolean;
}

export  const  videoDataToMap = (data: VideoDBData[] ) => {
    //console.log(data);

    return  data.map((video, index) => {
       return {
           key: index,
           video_id: video.video_id,
           youtube_video_id: video.youtube_video_id,
           video_url: video.video_url,
           title: video.title,
           cover_url: video.cover_url,
           description: video.description,
           duration: video.duration,
           release_date: video.release_date,
           channel_id: video.channel_id,
           average_rating: video.average_rating,
           definition: video.definition,
           viewCount: video.viewCount,
           likeCount: video.likeCount,
           favoriteCount: video.favoriteCount,
           commentCount: video.commentCount,
           created_at: video.created_at,
           updated_at: video.updated_at, archived: video.archived,
           has_video_credits: video.has_video_credits,
           has_subtitles: video.has_subtitles,
           has_video_tags: video.has_video_tags
       };
    });
};

export  function  getNumOfTrue(arr:boolean[]){
    return arr.reduce((count, currentValue) => {
        if (currentValue) {
            return count + 1;
        } else {
            return count;
        }
    }, 0);
}

export  function getYoutubeVideoId(url:string)   {
    const regex = /[?&]v=([^?&]+)/;
    const match = url.match(regex);

    if (match) {
        return match[1];
    } else {
        return null;
    }
}


export  function formatDuration(duration:string):string {
    const match = duration.match(/PT(\d+)M(\d+)S/);

    if (!match) {
        return "Invalid duration format";
    }

    const minutes = parseInt(match[1]!, 10);
    const seconds = parseInt(match[2]!, 10);

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${padZero(hours)}:${padZero(remainingMinutes)}:${padZero(seconds)}`;
}

function padZero(num:number):string {
    return num.toString().padStart(2, "0");
}

export interface CreditData {
    key: number;
    credit_id: number;
    name_zh: string;
    name_en: string;
    description: string;
    created_at: string;
    updated_at: string;
    oauth2_id: number;
}

interface CreditDBData {
    credit_id: number;
    name_zh: string;
    name_en: string;
    description: string;
    created_at: string;
    updated_at: string;
    oauth2_id: number;
}

export function creditDataToMap(data:CreditDBData[]){
    return data.map((credit, index) => {
        return {
            key: index,
            credit_id: credit.credit_id,
            name_zh: credit.name_zh,
            name_en: credit.name_en,
            description: credit.description,
            created_at: credit.created_at,
            updated_at: credit.updated_at,
            oauth2_id: credit.oauth2_id
        };
    } );
}
