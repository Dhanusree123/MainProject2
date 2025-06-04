import {
  Box,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Breadcrumbs,
  Link,
  Typography,
  Container,
} from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { IProduct, ProductSchema } from "../types/product";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { FIND_PRODUCT_BY_ID, UPDATE_PRODUCT } from "../graphql/product";
import { Home } from "@mui/icons-material";
import { toast } from "sonner";

const ProductEditFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const methods = useForm<IProduct>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      id: "",
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
      active: false,
      expired: false,
    },
    mode: "onChange",
  });

  const {
    setValue,
    control,
    formState: { errors },
  } = methods;

  const FetchProduct = useCallback(async () => {
    try {
      const AUTH_TOKEN =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2EwNjc3ODQyNmQ4YTYxZmVhMGU5MzAiLCJlbWFpbCI6ImludGVybnNAbWljcm9mb3guY28iLCJpYXQiOjE3MzkxNjQ3ODMsImV4cCI6MTc0MTc1Njc4M30.w3Noq69dqXl3t2sbAfNDueQFr7IT85lXh0ln4LVM6TY";
      const res = await axios.post(
        "https://test-api.nine.deals/graphql",
        {
          query: FIND_PRODUCT_BY_ID,
          variables: { id },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        }
      );

      const data = await res.data;
      const fetchedProduct = data.data.findProductById;
      setValue("id", fetchedProduct.id);
      setValue("title", fetchedProduct.title);
      setValue("slug", fetchedProduct.slug);
      setValue("description", fetchedProduct.description);
      setValue("mrp", fetchedProduct.mrp);
      setValue("listPrice", fetchedProduct.listPrice);
      setValue("dealPrice", fetchedProduct.dealPrice);
      setValue("code", fetchedProduct.code);
      setValue("brand", fetchedProduct.brand);
      setValue("categoryPath", fetchedProduct.categoryPath);
      const category = fetchedProduct.categoryPath;
      const val = category.replace(/[_-]/g, " ");
      setValue("category", val);
      console.log(val);
      setValue("store", fetchedProduct.store);
      setValue("rating", fetchedProduct.rating);
      setValue("reviews", fetchedProduct.reviews);
      setValue("handPicked", fetchedProduct.handPicked);
      setValue("active", fetchedProduct.active);
      setValue("expired", fetchedProduct.expired);
      setImagePreviews(fetchedProduct.images || []);
    } catch (err) {
      console.log(err);
    }
  }, [id, setValue]);

  const onSubmit = async (data: IProduct) => {
    const AUTH_TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2EwNjc3ODQyNmQ4YTYxZmVhMGU5MzAiLCJlbWFpbCI6ImludGVybnNAbWljcm9mb3guY28iLCJpYXQiOjE3MzkxNjQ3ODMsImV4cCI6MTc0MTc1Njc4M30.w3Noq69dqXl3t2sbAfNDueQFr7IT85lXh0ln4LVM6TY";
    const res = await axios.post(
      "https://test-api.nine.deals/graphql",
      {
        query: UPDATE_PRODUCT,
        variables: {
          id,
          input: {
            active: data.active,
            title: data.title,
            mrp: data.mrp,
            dealPrice: data.dealPrice,
            listPrice: data.listPrice,
            images: data.images,
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      }
    );
    console.log(res);
    console.log("clicked", data);
    if (!res.data.data) {
      toast.error(res.data.errors[0].message);
    } else {
      toast.success("Product updated successfully");
      navigate("/products");
    }
  };

  console.log(errors);
  useEffect(() => {
    FetchProduct();
  }, [FetchProduct]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "Background.default", py: 4 }}>
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
          <Typography>Edit Product</Typography>
        </Breadcrumbs>
        <Box>
          <FormProvider {...methods}>
            <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
              <TextField
                {...methods.register("id")}
                fullWidth
                placeholder="Id"
                label="Id"
                margin="normal"
                disabled
              />
              <TextField
                {...methods.register("title")}
                fullWidth
                placeholder="Title"
                label="Title"
                margin="normal"
              />
              <TextField
                {...methods.register("slug")}
                fullWidth
                placeholder="Slug"
                margin="normal"
                disabled
              />

              <TextField
                {...methods.register("description")}
                fullWidth
                placeholder="Description"
                margin="normal"
                multiline
              />
              <TextField
                {...methods.register("mrp")}
                type="number"
                fullWidth
                placeholder="MRP"
                margin="normal"
              />
              <TextField
                {...methods.register("listPrice")}
                type="number"
                fullWidth
                placeholder="List Price"
                margin="normal"
              />
              <TextField
                {...methods.register("dealPrice")}
                type="number"
                fullWidth
                placeholder="Deal Price"
                margin="normal"
              />
              <TextField
                {...methods.register("code")}
                fullWidth
                placeholder="Code"
                margin="normal"
                disabled
              />
              <TextField
                {...methods.register("brand")}
                fullWidth
                placeholder="Brand"
                margin="normal"
              />
              <TextField
                {...methods.register("categoryPath")}
                fullWidth
                placeholder="Category"
                margin="normal"
              />
              <TextField {...methods.register("category")} fullWidth />
              <TextField
                {...methods.register("store")}
                fullWidth
                placeholder="Store"
                margin="normal"
              />
              <TextField
                {...methods.register("rating")}
                type="text"
                inputMode="decimal"
                fullWidth
                placeholder="Rating"
                margin="normal"
              />
              <TextField
                {...methods.register("reviews")}
                type="number"
                fullWidth
                placeholder="Reviews"
                margin="normal"
              />

              {imagePreviews.length > 0 && (
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
              )}
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
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Controller
                  name="active"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                      label="Active"
                    />
                  )}
                />

                <Controller
                  name="expired"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                      label="Expired"
                    />
                  )}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button type="submit" variant="contained" color="primary">
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

export default ProductEditFormPage;
