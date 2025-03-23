import { IAlbum } from "@/types/album";
import { Box, Card, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { GetServerSideProps } from "next";
import CustomPagination from "@/components/CustomPagination";
import Grid from "@mui/material/Grid2";
import Link from "next/link";

type AlbumProps = {
  albums: IAlbum[];
  page: number;
};

const rowsPerPage = 10;

const AlbumPage = ({ albums, page }: AlbumProps) => {
  return (
    <Box>
      <Box sx={{ textAlign: "center", p: 5 }}>
        <Typography variant="h4">Albums</Typography>
      </Box>
      <Grid container spacing={3}>
        {albums.map((album) => (
          <Grid size={{ xs: 6, sm: 4, lg: 3 }} key={album.id}>
            <Card
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography variant="h6">Id: {album.id}</Typography>
              </Box>
              <Box
                component="img"
                src="https://media.istockphoto.com/id/1453981865/vector/realistic-vinyl-record-vector-record-for-gramophone-classic-vinyl-record-for-music-editable.jpg?s=612x612&w=0&k=20&c=32aVlFolLqAmI6Jo2s2CoY7A1Fby4k1M7tGbwGaW1EU="
                sx={{
                  height: 180,
                  width: 200,
                  p: 2,
                  margin: "auto",
                  objectFit: "contain",
                }}
              />
              <Box sx={{ flexGrow: 1, m: 2, p: 2 }}>
                <Typography variant="body1">
                  <b>Title </b>: {album.title}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mb: 2,
                  mr: 3,
                }}
              >
                <Link href={`/albums/${album.id}`} passHref>
                  <Typography
                    component="a"
                    color="primary"
                    sx={{ cursor: "pointer" }}
                  >
                    View
                  </Typography>
                </Link>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box>
        <CustomPagination count={Math.ceil(100 / rowsPerPage)} page={page} />
      </Box>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = parseInt(query.page as string);
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/albums?_start=${
      (page - 1) * rowsPerPage
    }&_limit=${rowsPerPage}`
  );
  const albums = await res.data;
  console.log(page);

  return { props: { albums, page } };
};

export default AlbumPage;
