import axios from "axios";
// import { graphqlData } from "../graphql/brand";

export const graphqlData = `
query findBrands($limit: Int $search: BaseSearch $skip: Int! $sort: BaseSort $filter: BaseFilter){ 
  findBrands(limit:$limit, search:$search, skip:$skip, sort:$sort, filter:$filter){
    count
    brands{
      id
      title
      active
    }
  }
}`;

export const FIND_BRAND_BY_ID = `
  query findBrandById($id:String!){
    findBrandById(id:$id){
      id
      active
      title
    }
  }
`;

export const UPDATE_BRAND = `
  mutation updateBrand($id:String!,$input:UpdateBrandDto!) {
    updateBrand(id:$id,input: $input) {
      title
      active
    }
  }
`;

export const CREATE_BRAND = `
 mutation createBrand($input:CreateBrandDto!) {
  createBrand(input: $input) {
    title
    active
  }
}`;

export const FetchData = async (
  limit: number,
  search: { title: string },
  skip: number,
  sort?: "asc" | "desc",
  filter?: { active: boolean }
) => {
  try {
    const response = await axios({
      url: "https://test-api.nine.deals/graphql",
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: {
        query: graphqlData,
        variables: {
          limit,
          search,
          skip,
          sort,
          filter,
        },
      },
    });
    const data = await response.data;
    const brands = data.data.findBrands;
    return brands;
  } catch (err) {
    console.error(err);
  }
};
