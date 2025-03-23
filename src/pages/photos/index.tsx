import axios from "axios";
import React from "react";
import { GetServerSideProps } from "next";
import { IPhoto } from "@/types/photo";
import { Box, Card, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CustomPagination from "@/components/CustomPagination";
import Link from "next/link";

type PhotoProps = {
  photos: IPhoto[];
  page: number;
};

const rowsPerPage = 100;

const PhotoPage = ({ photos, page }: PhotoProps) => {
  return (
    <Box sx={{ padding: 4 }}>
      <Box sx={{ textAlign: "center", p: 5 }}>
        <Typography variant="h4">Photos</Typography>
      </Box>
      <Grid container spacing={2}>
        {photos.map((photo) => (
          <Grid size={{ xs: 6, md: 4, lg: 3 }} key={photo.id}>
            <Card
              sx={{
                padding: 2,
                textAlign: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                Id : {photo.id}
              </Typography>
              <Box
                component="img"
                src="https://img.etimg.com/thumb/width-420,height-315,imgsize-262522,resizemode-75,msid-98306451/top-trending-products/musical-instruments/top-deals-on-10-best-violins-for-beginners-in-india/best-violins-for-beginners.jpg"
                alt={photo.title}
                sx={{ width: 300, height: 200, objectFit: "cover" }}
              />
              <Box>
                <Typography variant="body2" mt={1}>
                  {photo.title}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Link href={`/albums/${photo.albumId}`}>Open</Link>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3 }}>
        <CustomPagination count={Math.ceil(5000 / rowsPerPage)} page={page} />
      </Box>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = parseInt(query.page as string) || 1;
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/photos?_start=${
      (page - 1) * rowsPerPage
    }&_limit=${rowsPerPage}`
  );
  const photos = await res.data;

  return { props: { photos, page } };
};

export default PhotoPage;
