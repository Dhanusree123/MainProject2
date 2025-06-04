/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { SCRAPER } from "../../graphql/scraper";
// import { Scraper } from "../../types/scraper";
// import { IProduct } from "../../types/product";
import { toast } from "sonner";
import { getASIN } from "../../utils/common";
import { IProduct } from "../../newtypes/product";

interface Props {
  onSubmit: (data: IProduct) => void;
  code?: string;
}

const ProductFetchButton = (props: Props) => {
  const { onSubmit, code } = props;

  const [url, setUrl] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const AUTH_TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2EwNjc3ODQyNmQ4YTYxZmVhMGU5MzAiLCJlbWFpbCI6ImludGVybnNAbWljcm9mb3guY28iLCJpYXQiOjE3Mzk1MzA5MzYsImV4cCI6MTc0MjEyMjkzNn0.pnrMXu8cptj_kyztPyYfzwB_urRj91Xy1Ns2oZpn6zg";

    if (!url) {
      toast.error("Invalis URL..Please enter a valid url");
      return;
    }
    const asin = getASIN(url);
    const formattedUrl = `https://amazon.in/dp/${asin}`;
    setUrl(formattedUrl);

    try {
      const res = await axios.post(
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

      const scrapedData = res.data?.data.scraper || null;

      console.log(scrapedData);
      onSubmit(scrapedData);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    if (code) {
      setUrl(`https://amazon.in/dp/${code}`);
    }
  }, [code]);

  return (
    <>
      <TextField
        label="Product URL"
        name="productUrl"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleSubmit} variant="contained">
        Fetch
      </Button>
    </>
  );
};

export default ProductFetchButton;
