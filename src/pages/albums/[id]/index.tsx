import { Box, Card, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import Grid from "@mui/material/Grid2";
import { IAlbum } from "@/types/album";
import { IPhoto } from "@/types/photo";
import Link from "next/link";

type AlbumProps = {
  album: IAlbum;
  photos: IPhoto[];
};

const CommentPage = ({ album, photos }: AlbumProps) => {
  console.log(photos);
  return (
    <Box>
      <Box sx={{ textAlign: "center", p: 5 }}>
        <Typography variant="h4">Comment : {album.id}</Typography>
      </Box>
      <Box
        sx={{
          textAlign: "left",
          ml: "50px",
          p: 5,
        }}
      >
        <Typography variant="h6"> AlbumId: {album.id}</Typography>
        <Typography variant="h6"> UserId : {album.userId}</Typography>
        <Typography variant="h6"> AlbumTitle : {album.title}</Typography>
      </Box>

      <Box sx={{ textAlign: "center", p: 5 }}>
        <Typography variant="h5">Photos in this Album</Typography>
        <Grid container spacing={3} sx={{ mt: 3 }}>
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
                <Typography variant="h6" sx={{ textAlign: "left" }}>
                  Id : {photo.id}
                </Typography>
                <CardMedia
                  component="img"
                  height="150"
                  src="https://img.etimg.com/thumb/width-420,height-315,imgsize-262522,resizemode-75,msid-98306451/top-trending-products/musical-instruments/top-deals-on-10-best-violins-for-beginners-in-india/best-violins-for-beginners.jpg"
                  //   image={photo.url}
                  alt={photo.title}
                />
                <Box sx={{ p: 2 }}>
                  <Typography variant="body2">{photo.title}</Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 5 }}>
        <Link href={"/photos"}>View In Photos</Link>
      </Box>
    </Box>
  );
};

export const getStaticProps = async ({ params }) => {
  const res1 = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${params.id}`
  );
  const album: IAlbum = await res1.json();

  const res2 = await fetch(
    `https://jsonplaceholder.typicode.com/photos?albumId=${params.id}`
  );
  const photos: IPhoto[] = await res2.json();

  return { props: { album, photos } };
};

export const getStaticPaths = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/albums");
  const albums: IAlbum[] = await res.data;

  const paths = albums.map((album) => ({
    params: { id: album.id.toString() },
  }));

  return { paths, fallback: false };
};

export default CommentPage;
