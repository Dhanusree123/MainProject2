"use client";

import { AlbumsUsers } from "@/sections/album/Albums";
import { IAlbum } from "@/types/album";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";

const AlbumsUsersPage = ({
  params,
}: {
  params: Promise<{ userId: number }>;
}) => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);

  const param = React.use(params);

  useEffect(() => {
    console.log("clicked");
    const fetchalbumsusers = async () => {
      const fetchedalbumsusers = await AlbumsUsers(param.userId);
      setAlbums(fetchedalbumsusers.albumsusers);
      console.log(fetchedalbumsusers);
    };
    fetchalbumsusers();
  }, [param.userId]);

  return (
    <>
      <Typography variant="h4" textAlign="center">
        Albums with userId - {param.userId}
      </Typography>

      <Grid container spacing={2}>
        {albums.map((album) => (
          <Grid size={{ xs: 6, md: 4, lg: 3 }} key={album.id}>
            <Card>
              <Box
                sx={{ border: "1px solid black", pt: 5, pb: 5, pr: 3, pl: 3 }}
              >
                {album.id}
              </Box>
              <CardContent>
                <Link href={`/albums/${album.id}`}>
                  <Typography variant="body1">Album Id : {album.id}</Typography>
                </Link>
                <Link href={`/users/${album.userId}`}>
                  <Typography variant="body1">
                    User Id : {album.userId}
                  </Typography>
                </Link>

                <Typography variant="body1">
                  Album Title : {album.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default AlbumsUsersPage;
