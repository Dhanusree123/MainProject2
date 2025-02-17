import axios from "axios";

export const FIND_CATEGORIES = `
query findCategories{
  findCategories{
    categories{
      id
      title
    }
  }
}`;

export const FetchCategory = async(
  ) => {
    try {
      const response = await axios({
        url: "https://test-api.nine.deals/graphql",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          query: FIND_CATEGORIES
        },
      });
      const data = await response.data;
      const categories = data.data.findCategories;
      return categories;
      
    } catch (err) {
      console.error(err);
    }
  };
