import {
  Autocomplete,
  Box,
  Breadcrumbs,
  Button,
  Container,
  FormControlLabel,
  Link,
  Skeleton,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddProduct, AddProductType } from "../types/product";
import { Scraper } from "../types/scraper";
import { useCallback, useEffect, useState } from "react";
import ProductFetchButton from "../sections/products/ProductFetchButton";
import { Home } from "@mui/icons-material";
import { Store } from "../types/store";
import { Category } from "../types/category";
import { FetchCategory } from "../graphql/category";
import { FetchData } from "../graphql/brands";
import { FetchStore } from "../graphql/store";

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
      // brand: "",
      // categoryPath: "",
      // store: "",
      images: [],
      rating: 0,
      reviews: 0,
      handPicked: false,
      // sales:""
    },
    mode: "onChange",
  });
  const { setValue, watch, control, error } = methods;
  const [brands, setBrands] = useState<AddProductType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mainImage, setMainImage] = useState<string | null>(null);

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

    const slug = data.title
      .trim()
      .replace(/\s*:\s*/g, "-")
      .replace(/_/g, "-")
      .replace(/\s+/g, "-")
      .toLowerCase();
    console.log(slug);
    setValue("slug", slug);
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

  const onSubmit = (data: AddProductType, e: any) => {
    try {
      e.preventDefault();
      console.log("clicked", data);
      console.log(methods.getValues());
    } catch (err) {
      console.log(err);
    }
  };

  // const onSubmit = () => {
  //   const formData = methods.getValues("brand");
  //   console.log("clicked");
  //   console.log(methods.getValues());
  //   console.log("Form Submitted with data:", formData);
  // };

  console.log(methods.getValues());
  const getBrands = useCallback(async () => {
    const fetchedBrands = await FetchData();
    setBrands(fetchedBrands.brands);
  }, []);

  const getCategories = useCallback(async () => {
    const fetchedCategories = await FetchCategory();
    setCategories(fetchedCategories.categories);
  }, []);

  const getStores = useCallback(async () => {
    const fetchedStores = await FetchStore();
    setStores(fetchedStores.stores);
  }, []);

  useEffect(() => {
    getBrands();
  }, [getBrands]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    getStores();
  }, [getStores]);

  return (
    <Box sx={{ minHeight: "100vh", bgColor: "Background.default", py: 4 }}>
      <Container maxWidth="md">
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
              <TextField
                {...methods.register("title")}
                fullWidth
                name="title"
                margin="normal"
                helperText={error?.message}
              />

              <TextField
                {...methods.register("slug")}
                fullWidth
                disabled
                name="slug"
                helperText={error?.message}
              />
              <TextField
                {...methods.register("code")}
                fullWidth
                margin="normal"
                name="code"
                helperText={error?.message}
              />

              <Controller
                name="brand"
                control={methods.control}
                rules={{ required: "Brand is required" }}
                render={({ field, fieldState: { error } }) => (
                  <Autocomplete
                    {...field}
                    options={brands || []}
                    getOptionLabel={(option) => option?.title || ""}
                    value={brands.find((b) => b.title === field.value) || null}
                    onChange={(_, value) => field.onChange(value?.title || "")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Brand"
                        name="brand"
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />
              <Controller
                name="category"
                control={methods.control}
                rules={{ required: "Category is required" }}
                render={({ field, fieldState: { error } }) => (
                  <Autocomplete
                    {...field}
                    options={categories || []}
                    getOptionLabel={(option) => option?.title || ""}
                    value={categories.find((c) => c.id === field.value)}
                    onChange={(_, value) => field.onChange(value?.title || "")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="category"
                        label="Category"
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />
              <Controller
                name="store"
                control={methods.control}
                rules={{ required: "Store is required" }}
                render={({ field, fieldState: { error } }) => (
                  <Autocomplete
                    {...field}
                    options={stores || []}
                    getOptionLabel={(option) => option?.title || ""}
                    value={stores.find((s) => s.title === field.value) || null}
                    onChange={(_, value) => field.onChange(value?.title || "")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Store"
                        name="store"
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />

              <TextField
                {...methods.register("dealPrice")}
                type="number"
                fullWidth
                margin="normal"
                name="dealprice"
                helperText={error?.message}
              />
              <TextField
                {...methods.register("mrp")}
                type="number"
                fullWidth
                margin="normal"
                name="mrp"
                helperText={error?.message}
              />
              <TextField
                {...methods.register("description")}
                fullWidth
                multiline
                margin="normal"
                name="description"
                helperText={error?.message}
              />
              <TextField
                {...methods.register("listPrice")}
                type="number"
                fullWidth
                margin="normal"
                name="listPrice"
                helperText={error?.message}
              />
              <TextField
                {...methods.register("reviews")}
                fullWidth
                margin="normal"
                name="reviews"
                helperText={error?.message}
              />

              {imagePreviews.length > 0 && (
                <Box mt={2} display="flex" flexDirection="column" gap={2}>
                  <Box sx={{ width: "50%", height: 200, position: "relative" }}>
                    {loading ? (
                      <Skeleton
                        variant="rectangular"
                        width={200}
                        height={500}
                      />
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
                          border:
                            mainImage === image ? "2px solid blue" : "none",
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

                  <Box
                    gap={2}
                    mt={2}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ width: "30%" }}>
                      {watch("mrp") ? (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          height={50}
                        >
                          M.R.P.:<del> {watch("mrp")}</del>
                        </Box>
                      ) : (
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={50}
                        />
                      )}
                    </Box>

                    <Box sx={{ width: "30%" }}>
                      {watch("dealPrice") ? (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          height={50}
                        >
                          List Price : {watch("dealPrice")}
                        </Box>
                      ) : (
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={50}
                        />
                      )}
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      border: "2px solid white",
                      borderRadius: "10px",
                      justifyContent: "center",
                    }}
                  >
                    {watch("listPrice") ? (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height={50}
                      >
                        Deal Price : {watch("listPrice")}
                      </Box>
                    ) : (
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={50}
                      />
                    )}
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Controller
                      name="handPicked"
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Switch
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                            />
                          }
                          label="Handpicked"
                        />
                      )}
                    />
                  </Box>
                </Box>
              )}
              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  // onClick={() => console.log(methods.getValues())}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </FormProvider>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductAddFormPage;
