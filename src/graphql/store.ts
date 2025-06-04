import axios from "axios";

export const FIND_STORES = `
query findStores{
  findStores{
    stores{
      id
      title
    }
  }
}`;

export const FetchStore = async () => {
  try {
    const response = await axios({
      url: "https://test-api.nine.deals/graphql",
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: {
        query: FIND_STORES,
      },
    });
    const data = await response.data;
    const stores = data.data.findStores;
    // const x = stores.map((m)=>m.title)
    // console.log(x)
    return stores;
  } catch (err) {
    console.error(err);
  }
};
