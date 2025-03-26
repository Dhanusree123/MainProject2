"use client";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Card, CardContent, Pagination, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { IAlbum } from "@/types/album";
import Albums from "@/sections/album/Albums";
import Link from "next/link";
// import { count } from "c/onsole";
// import Albums from "@/sections/album/Albums";

const AlbumsList = () => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    router.push(`?page=${value}`);
  };

  useEffect(() => {
    const fetchAlbums = async () => {
      const fetchedAlbums = await Albums(page);
      setAlbums(fetchedAlbums.data);
      setTotalCount(fetchedAlbums.totalCount);
      setRowsPerPage(fetchedAlbums.rowsPerPage);
    };
    fetchAlbums();
  }, [page]);

  return (
    <Box>
      <Typography variant="h3" textAlign="center">
        Albums
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
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={totalCount / rowsPerPage}
          page={page}
          onChange={handleChange}
          color="primary"
          disabled={page > totalCount / rowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default AlbumsList;
