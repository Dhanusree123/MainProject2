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
// import { AddProduct, AddProductType } from "../types/product";
// import { Scraper } from "../types/scraper";
import { useCallback, useEffect, useMemo, useState } from "react";
import ProductFetchButton from "../sections/products/ProductFetchButton";
import { Home } from "@mui/icons-material";
import { Store } from "../types/store";
import { Brand, Category } from "../types/category";
import { FetchCategory } from "../graphql/category";
import { FetchData } from "../graphql/brands";
import { FetchStore } from "../graphql/store";
import { IProduct, NewProductSchema } from "../newtypes/product";
import { toast } from "sonner";
import { CREATE_PRODUCT } from "../graphql/product";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { fields } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";

const ProductAddFormPage = () => {
  const navigate = useNavigate();
  const defaultValues = useMemo(
    () => ({
      id: "",
      title: "",
      description: "",
      brandId: "",
      categoryId: "",
      categoryPath: "",
      storeId: "",
      mrp: 0,
      dealPrice: 0,
      listPrice: 0,
      rating: 0,
      reviews: 0,
      code: "",
      images: [],
      active: true,
      handPicked: false,
      expired: false,
      slug: "",
      sales: [],
      priceHistory: [
        {
          mrp: 0,
          listPrice: 0,
          dealPrice: 0,
          date: new Date().toISOString(),
        },
      ],
    }),
    []
  );

  const methods = useForm<IProduct>({
    resolver: zodResolver(NewProductSchema),
    defaultValues,
  });
  const {
    setValue,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = methods;

  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [, setResponse] = useState<IProduct>();

  const setScraperData = (data: IProduct) => {
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

  const onSubmit = async (data: IProduct) => {
    const AUTH_TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2EwNjc3ODQyNmQ4YTYxZmVhMGU5MzAiLCJlbWFpbCI6ImludGVybnNAbWljcm9mb3guY28iLCJpYXQiOjE3MzkxNjQ3ODMsImV4cCI6MTc0MTc1Njc4M30.w3Noq69dqXl3t2sbAfNDueQFr7IT85lXh0ln4LVM6TY";

    try {
      const {
        brandId,
        categoryId,
        code,
        dealPrice,
        description,
        handPicked,
        images,
        listPrice,
        mrp,
        rating,
        reviews,
        sales,
        slug,
        storeId,
        title,
      } = data;
      const res = await axios.post(
        "https://test-api.nine.deals/graphql",
        {
          query: CREATE_PRODUCT,

          variables: {
            input: {
              brandId: `${brandId}`,
              categoryId: `${categoryId}`,
              code: `${code}`,
              dealPrice: `${dealPrice}`,
              description: `${description}`,
              // expired: `${expired}`,
              handPicked: `${handPicked}`,
              // id: `${id}`,
              images: `${images}`,
              // landingImage: `${landingImage}`,
              listprice: `${listPrice}`,
              mrp: `${mrp}`,

              rating: `${rating}`,
              reviews: `${reviews}`,
              sales: `${sales}`,
              slug: `${slug}`,
              // store: `${store}`,
              storeid: `${storeId}`,
              title: `${title}`,
              // updatedAt: `${updatedAt}`,
              // updatedBy: `${updatedBy}`,
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + AUTH_TOKEN,
          },
        }
      );

      setResponse(res.data.data.createProduct);
      toast.success("Brand added successfully");
      navigate("/products");
    } catch (err: unknown) {
      toast.error(err);
    }
    console.log(data);
  };

  console.log(methods.getValues());

  const getBrands = useCallback(async () => {
    const fetchedBrands = await FetchData();
    setBrands(fetchedBrands.brands.id);
  }, []);

  const getCategories = useCallback(async () => {
    const fetchedCategories = await FetchCategory();
    setCategories(fetchedCategories.categories.id);
  }, []);

  const getStores = useCallback(async () => {
    const fetchedStores = await FetchStore();
    setStores(fetchedStores.stores.id);
  }, []);

  useEffect(() => {
    setValue("id", crypto.randomUUID());
    setValue("brandId", crypto.randomUUID());
    setValue("storeId", crypto.randomUUID());
    setValue("categoryId", crypto.randomUUID());
  });
  useEffect(() => {
    getBrands();
  }, [getBrands]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    getStores();
  }, [getStores]);

  console.log(errors);
  console.log(brands);
  console.log(categories);
  console.log(stores);

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
          <ProductFetchButton onSubmit={setScraperData} />
        </Box>
        <Box>
          <FormProvider {...methods}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...methods.register("title")}
                fullWidth
                name="title"
                margin="normal"
                label="Title"
                placeholder="Title"
                error={!!errors.title}
                helperText={errors?.title?.message}
              />

              <TextField
                {...methods.register("slug")}
                fullWidth
                disabled
                name="slug"
                error={!!errors.slug}
                helperText={errors?.slug?.message}
              />
              <TextField
                {...methods.register("code")}
                fullWidth
                margin="normal"
                name="code"
                error={!!errors.code}
                helperText={errors?.code?.message}
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
                        sx={{ m: 2 }}
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
                    sx={{ m: 2 }}
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
                    sx={{ m: 2 }}
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
                error={!!errors.dealPrice}
                helperText={errors?.dealPrice?.message}
              />
              <TextField
                {...methods.register("mrp")}
                type="number"
                fullWidth
                margin="normal"
                name="mrp"
                error={!!errors.mrp}
                helperText={errors?.mrp?.message}
              />
              <TextField
                {...methods.register("description")}
                fullWidth
                multiline
                margin="normal"
                name="description"
                error={!!errors.description}
                helperText={errors?.description?.message}
              />
              <TextField
                {...methods.register("listPrice")}
                type="number"
                fullWidth
                margin="normal"
                name="listPrice"
                error={!!errors.listPrice}
                helperText={errors?.listPrice?.message}
              />
              <TextField
                {...methods.register("reviews")}
                fullWidth
                margin="normal"
                name="reviews"
                error={!!errors.reviews}
                helperText={errors?.reviews?.message}
              />

              <TextField
                {...methods.register("rating")}
                fullWidth
                margin="normal"
                name="rating"
                error={!!errors.rating}
                helperText={errors?.rating?.message}
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
