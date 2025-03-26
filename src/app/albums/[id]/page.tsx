"use client";
import { Album, Photos } from "@/sections/album/Albums";
import { IAlbum } from "@/types/album";
import { IPhoto } from "@/types/photo";
import { Box, Card, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AlbumPage = ({ params }: { params: Promise<{ id: number }> }) => {
  const [album, setAlbum] = useState<IAlbum | null>(null);
  const [photos, setPhotos] = useState<IPhoto[]>([]);

  const param = React.use(params);
  useEffect(() => {
    const fetchAlbum = async () => {
      const fetchedAlbum = await Album(param.id);
      setAlbum(fetchedAlbum.data);
    };
    fetchAlbum();
  }, [param.id]);
  useEffect(() => {
    const fetchPhotos = async () => {
      const fetchedPhotos = await Photos(param.id);
      setPhotos(fetchedPhotos.photos);
    };
    fetchPhotos();
  }, [param.id]);
  return (
    <>
      <Typography variant="h4" textAlign="center">
        Album - {album?.id}
      </Typography>
      <Box>Id - {album?.id}</Box>
      <Box>
        <Link href={`/users/${album?.userId}`}>User Id - {album?.userId}</Link>
      </Box>
      <Box>Title - {album?.title}</Box>

      <Typography variant="h5">
        Photos realted to Album - {album?.id}
      </Typography>
      <Box>
        {photos.map((photo) => (
          <Card key={photo.id} sx={{ m: 3, p: 2 }}>
            <Box>Id - {photo.id}</Box>
            <Box>Album Id - {photo.albumId}</Box>
            <Box>Title - {photo.title}</Box>
            <Box>Url - {photo.url}</Box>
            <Box>ThumbnailUrl - {photo.thumbnailUrl}</Box>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default AlbumPage;
