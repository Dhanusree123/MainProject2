import { IComment } from "@/types/comment";
import { IPost } from "@/types/post";
import axios from "axios";

const Posts = async (page: number) => {
  const rowsPerPage = 10;
  const start = (page - 1) * rowsPerPage;
  const limit = rowsPerPage;

  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`
  );

  const data: IPost[] = response.data;
  const totalCount = response.headers["X-Total-Count"];
  return { data, totalCount, rowsPerPage };
};

export default Posts;

export const Post  = async(id:number) =>{
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
  const data :IPost = response.data;
  return {data};
}

export const Comments = async(postId:number)=>{
  const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  const comments:IComment[] = response.data;

  return {comments}
}

export const PostsUsers = async(userId:number)=>{
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
  const postsusers :IPost[]= response.data;
  return {postsusers}
}