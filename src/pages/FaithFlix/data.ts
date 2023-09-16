import {deleteReq, getReq, postReq, putReq} from "@/tools/requests.ts";

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


export interface VideoDBData {
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
    definition: "hd" | "sd";
    viewCount: number;
    likeCount: number;
    favoriteCount: number;
    commentCount: number;
    created_at: string;
    updated_at: string;
    archived: boolean;
    has_video_credits: boolean;
    has_subtitles: boolean;
    has_video_tags: boolean;
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

export interface VideoRole{
    role_id: number;
    role_name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface GenreTag{
    tag_id: number;
    tag_name: string;
    type: "genre" | "tag";
    description: string;
    created_at: string;
    updated_at: string;
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
           duration: convertTime(video.duration),
           release_date: video.release_date.replace("T", " ").replace("Z", ""),
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
function convertTime(timeString:string):string {
    // 使用正则表达式提取小时、分钟和秒
    const matches = timeString.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    if (matches) {
        const hours = matches[1] ? parseInt(matches[1]) : 0;
        const minutes = matches[2] ? parseInt(matches[2]) : 0;
        const seconds = matches[3] ? parseInt(matches[3]) : 0;

        return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
        return "Invalid time format";
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

    const res =  `${padZero(hours)}:${padZero(remainingMinutes)}:${padZero(seconds)}`;
    console.log(res);
    return res;
}

function padZero(num:number):string {
    return num.toString().padStart(2, "0");
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

function getRouter(type:string):string{
    let router = "";
    if (type.toLowerCase() === "roles") {
        router = "roles";
    } else if (type.toLowerCase() === "genres" || type.toLowerCase() === "tags") {
        router = "genre-tags";
    }
    return router;
}

export async function getRoleGenreTag(type:string){
    const router:string = getRouter(type);
    return await getReq(`${router}`);
}

export async function addRoleGenreTag(type:string,data:Partial<VideoRole> | Partial<GenreTag> ){
    const router:string = getRouter(type);
    return await postReq(`${router}`, data);
}

export async function deleteRoleGenreTag(type:string,id:number){
    const router:string = getRouter(type);
    return await deleteReq(`${router}?id=${id}`);
}

export async function updateRoleGenreTag(type:string,id:number, data:Partial<VideoRole> | Partial<GenreTag> ){
    const router:string = getRouter(type);
    return await putReq(`${router}?id=${id}`, data);
}

export async function getVideoGenreTag(videoId:number){
    return await getReq(`video-tags?video_id=${videoId}`);
}

export async function getSubtitle(videoId:number){
    return await getReq(`subtitle?video_id=${videoId}`);
}

export async function getVideoCreditSelect(videoId:number){
    return await getReq(`video-credits-select?video_id=${videoId}`);
}
