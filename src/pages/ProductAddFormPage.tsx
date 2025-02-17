import {
  Box,
  Breadcrumbs,
  Button,
  Link,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddProduct, AddProductType } from "../types/product";
import { Scraper } from "../types/scraper";
import { useState } from "react";
import ProductFetchButton from "../sections/products/ProductFetchButton";
import { Home } from "@mui/icons-material";
const ProductAddFormPage = () => {
  const methods = useForm<AddProductType>({
    resolver: zodResolver(AddProduct),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      mrp: 0,
      listPrice: 0,
      dealPrice: 0,
      code: "",
      brand: "",
      categoryPath: "",
      store: "",
      images: [],
      rating: 0,
      reviews: 0,
      handPicked: false,
    },
    mode: "onChange",
  });
  const { setValue, watch } = methods;
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const onSubmit = () => {
    console.log("clicked");
  };

  const setScraperData = (data: Scraper) => {
    setLoading(true);
    setValue("title", data.title || "");
    setValue("description", data.description || "");
    setValue("mrp", data.mrp || 0);
    setValue("listPrice", data.listPrice || 0);
    setValue("dealPrice", data.dealPrice || 0);
    setValue("code", data.code || "");
    setValue("rating", data.rating || 0);
    setValue("reviews", data.reviews || 0);
    setValue("images", data.images || []);

    if (data.images && data.images.length > 0) {
      setTimeout(() => {
        setImagePreviews(data.images);
        setMainImage(data.images[0]);
        setLoading(false);
      }, 500);
    } else {
      setLoading(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews([...imagePreviews, ...newImages]);
      setMainImage(mainImage || newImages[0]);
      setValue("images", [...watch("images"), ...newImages]);
    }
  };

  return (
    <>
      <Breadcrumbs separator="›">
        <Link
          href="/login"
          sx={{ color: "text.secondary", textDecoration: "none" }}
        >
          <Home />
        </Link>
        <Link
          href="/products"
          sx={{ color: "text.secondary", textDecoration: "none" }}
        >
          Products
        </Link>
        <Typography>Add Product</Typography>
      </Breadcrumbs>
      <Box>
        <ProductFetchButton onDataFetched={setScraperData} />
      </Box>
      <Box>
        <FormProvider {...methods}>
          <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
            <TextField {...methods.register("title")} fullWidth />
            <TextField {...methods.register("code")} fullWidth />
            <TextField
              {...methods.register("dealPrice")}
              type="number"
              fullWidth
            />
            <TextField {...methods.register("mrp")} type="number" fullWidth />
            <TextField
              {...methods.register("description")}
              fullWidth
              multiline
            />
            <TextField
              {...methods.register("listPrice")}
              type="number"
              fullWidth
            />
            <TextField {...methods.register("reviews")} fullWidth />

            {imagePreviews.length > 0 && (
              <Box mt={2} display="flex" flexDirection="column" gap={2}>
                <Box sx={{ width: "50%", height: 200, position: "relative" }}>
                  {loading ? (
                    <Skeleton variant="rectangular" width={200} height={500} />
                  ) : (
                    <img
                      src={mainImage || imagePreviews[0]}
                      alt="Main Preview"
                      width="50%"
                      height="100%"
                      style={{ borderRadius: 8, objectFit: "cover" }}
                    />
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    paddingBottom: 1,
                  }}
                >
                  {imagePreviews.map((image, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: "100",
                        height: "100",
                        cursor: "pointer",
                        border: mainImage === image ? "2px solid blue" : "none",
                        flexShrink: 0,
                      }}
                      onClick={() => setMainImage(image)}
                    >
                      {loading ? (
                        <Skeleton
                          variant="rectangular"
                          width={100}
                          height={100}
                        />
                      ) : (
                        <img
                          src={image}
                          alt={`Preview ${index}`}
                          width={100}
                          height={100}
                          style={{ borderRadius: 8, objectFit: "cover" }}
                        />
                      )}
                    </Box>
                  ))}
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{
                      width: "100",
                      height: "100",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    +
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                    />
                  </Button>
                </Box>
                <Box display="flex" gap={2} mt={2}>
                  {["mrp", "listPrice", "dealPrice"].map((field) => (
                    <Box key={field} sx={{ width: "30%" }}>
                      {watch(field) ? (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          height={50}
                        >
                          {watch(field)}
                        </Box>
                      ) : (
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={50}
                        />
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </FormProvider>
      </Box>
    </>
  );
};

export default ProductAddFormPage;
