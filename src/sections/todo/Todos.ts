import { ITodo } from "@/types/todo";
import axios from "axios";

const Todos = async (page: number) => {
  const rowsPerPage = 20;
  const start = (page - 1) * rowsPerPage;
  const limit = rowsPerPage;

  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/todos?_start=${start}&_limit=${limit}`
  );

  const data: ITodo[] = response.data;
  const totalCount = response.headers["X-Total-Count"];
  return { data, totalCount, rowsPerPage };
};

export default Todos;


export const Todo  = async(id:number) =>{
  const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
  const data :ITodo = response.data;
  return {data};
}

export const TodosUsers = async(userId:number)=>{
  const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
  const todosusers :ITodo[]= response.data;
  return {todosusers}
}