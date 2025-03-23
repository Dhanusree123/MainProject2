// "use client";

import { Box, Pagination } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

type PaginationProps = {
  count: number;
  page: number;
};

const CustomPagination = ({ count, page }: PaginationProps) => {
  const router = useRouter();

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    router.push(`?page=${value}`);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Pagination
        count={count}
        page={page}
        color="primary"
        onChange={handleChange}
      />
    </Box>
  );
};

export default CustomPagination;
