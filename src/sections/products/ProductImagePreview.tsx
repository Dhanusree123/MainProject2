import { useState, useEffect } from "react";
import Box from "@mui/material/Box";

type ImagePreviewsProps = {
  images: string[];
};

const ImagePreviews = ({ images }: ImagePreviewsProps) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    if (images.length > 0) {
      setImagePreviews(images);
    }
  }, [images]);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      {imagePreviews.map((img, index) => (
        <Box key={index} sx={{ width: 100, height: 100 }}>
          <img
            src={img}
            alt={`Preview ${index}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default ImagePreviews;
