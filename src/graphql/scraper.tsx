import axios from "axios";
import { Scraper } from "../types/scraper";
import { useState } from "react";
import { toast } from "sonner";
import { Button, TextField } from "@mui/material";

export const SCRAPER = `
query scraper($url:String!){ 
  scraper(url:$url){
    brand
    code
    dealPrice
    description
    images
    listPrice
    mrp
    rating
    reviews
    title
  }
}`;

type TestFileProps = {
  onDataFetched: (data: Scraper) => void;
};

const ProductsFromScraper = ({ onDataFetched }: TestFileProps) => {
  const [url, setUrl] = useState("");

  const FetchDetails = async () => {
    const AUTH_TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2EwNjc3ODQyNmQ4YTYxZmVhMGU5MzAiLCJlbWFpbCI6ImludGVybnNAbWljcm9mb3guY28iLCJpYXQiOjE3Mzk1MzA5MzYsImV4cCI6MTc0MjEyMjkzNn0.pnrMXu8cptj_kyztPyYfzwB_urRj91Xy1Ns2oZpn6zg";
    if (!url) {
      toast.error("Please enter the URL to fetch");
    }
    try {
      const response = await axios.post(
        "https://test-api.nine.deals/graphql",
        {
          query: SCRAPER,
          variables: { url },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        }
      );
      const scrapedData: Scraper = response.data.data.scraper;
      console.log(scrapedData);
      onDataFetched(scrapedData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <TextField
        label="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button onClick={FetchDetails} variant="contained">
        Fetch
      </Button>
    </>
  );
};

export default ProductsFromScraper;
