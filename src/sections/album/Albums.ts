import { IAlbum } from "@/types/album";
import { IPhoto } from "@/types/photo";
import axios from "axios";

const Albums = async (page: number) => {
  const rowsPerPage = 10;
  const start = (page - 1) * rowsPerPage;
  const limit = rowsPerPage;

  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/albums?_start=${start}&_limit=${limit}`
  );

  const data: IAlbum[] = response.data;
  const totalCount = response.headers["X-Total-Count"];
  return { data, totalCount, rowsPerPage };
};

export default Albums;


export const Album  = async(id:number) =>{
  const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${id}`)
  const data :IAlbum = response.data;
  return {data};
}

export const Photos = async(albumId:number)=>{
  const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
  const photos:IPhoto[] = response.data;

  return {photos}
}

export const AlbumsUsers = async(userId:number)=>{
  const response = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
  const albumsusers :IAlbum[]= response.data;
  return {albumsusers}
}