/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { SCRAPER } from "../../graphql/scraper";
import { Scraper } from "../../types/scraper";

interface TestFileProps {
  onDataFetched: (data: Scraper) => void; // Function prop to pass data to parent
}

const ProductFetchButton = ({ onDataFetched }: TestFileProps) => {
  const [url, setUrl] = useState("");

  const handleClick = async (e: any) => {
    e.preventDefault();
    const AUTH_TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2EwNjc3ODQyNmQ4YTYxZmVhMGU5MzAiLCJlbWFpbCI6ImludGVybnNAbWljcm9mb3guY28iLCJpYXQiOjE3Mzk1MzA5MzYsImV4cCI6MTc0MjEyMjkzNn0.pnrMXu8cptj_kyztPyYfzwB_urRj91Xy1Ns2oZpn6zg";

    if (!url) {
      alert("Please enter a URL");
      return;
    }

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

      const scrapedData: Scraper = res.data?.data.scraper || null;

      console.log(scrapedData);
      onDataFetched(scrapedData);
    } catch (err) {
      console.error("Error fetching data:", err);
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
      <Button onClick={handleClick} variant="contained">
        Fetch
      </Button>
    </>
  );
};

export default ProductFetchButton;
