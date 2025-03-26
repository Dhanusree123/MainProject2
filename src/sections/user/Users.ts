import { IUser } from "@/types/user";
import axios from "axios";

const Users = async (page: number) => {
  const rowsPerPage = 5;
  const start = (page - 1) * rowsPerPage;
  const limit = rowsPerPage;

  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users?_start=${start}&_limit=${limit}`
  );

  const data: IUser[] = response.data;
  const totalCount = response.headers["X-Total-Count"];
  return { data, totalCount, rowsPerPage };
};

export default Users;

export const User  = async(id:number) =>{
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    const data :IUser = response.data;
    return {data};
  }