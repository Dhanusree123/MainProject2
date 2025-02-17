import axios from "axios";

export const FIND_BRANDS = `
query findBrands{ 
  findBrands{
    brands{
      id
      title
    }
  }
}`;



export const FetchData = async(
  ) => {
    try {
      const response = await axios({
        url: "https://test-api.nine.deals/graphql",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          query: FIND_BRANDS
        },
      });
      const data = await response.data;
      const brands = data.data.findBrands;
      // console.log(brands)
      return brands;
      
    } catch (err) {
      console.error(err);
    }
  };
