import {
  Box,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Breadcrumbs,
  Link,
  Typography,
} from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { IProduct, ProductSchema } from "../types/product";
import { useCallback, useEffect } from "react";
import axios from "axios";
import { FIND_PRODUCT_BY_ID } from "../graphql/product";
import { Home } from "@mui/icons-material";

const ProductEditFormPage = () => {
  const { id } = useParams();
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

  const { setValue, control } = methods;

  const onSubmit = () => {
    console.log("clicked");
  };

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
      // setProduct(fetchedProduct);
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
      setValue("store", fetchedProduct.store);
      setValue("rating", fetchedProduct.rating);
      setValue("reviews", fetchedProduct.reviews);
      setValue("handPicked", fetchedProduct.handPicked);
      setValue("active", fetchedProduct.active);
      setValue("expired", fetchedProduct.expired);
    } catch (err) {
      console.log(err);
    }
  }, [id, setValue]);

  useEffect(() => {
    FetchProduct();
  }, [FetchProduct]);
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
        <Typography>Add Brand</Typography>
      </Breadcrumbs>
      <Box>
        <FormProvider {...methods}>
          <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
            <TextField
              {...methods.register("title")}
              fullWidth
              placeholder="Title"
            />
            <TextField
              {...methods.register("slug")}
              fullWidth
              placeholder="Slug"
            />
            <TextField {...methods.register("id")} fullWidth placeholder="Id" />

            <TextField
              {...methods.register("description")}
              fullWidth
              placeholder="Description"
            />
            <TextField
              {...methods.register("mrp")}
              type="number"
              fullWidth
              placeholder="MRP"
            />
            <TextField
              {...methods.register("listPrice")}
              type="number"
              fullWidth
              placeholder="List Price"
            />
            <TextField
              {...methods.register("dealPrice")}
              type="number"
              fullWidth
              placeholder="Deal Price"
            />
            <TextField
              {...methods.register("code")}
              fullWidth
              placeholder="Code"
            />
            <TextField
              {...methods.register("brand")}
              fullWidth
              placeholder="Brand"
            />
            <TextField
              {...methods.register("categoryPath")}
              fullWidth
              placeholder="Category"
            />
            <TextField
              {...methods.register("store")}
              fullWidth
              placeholder="Store"
            />
            <TextField
              {...methods.register("rating")}
              type="number"
              fullWidth
              placeholder="Rating"
            />
            <TextField
              {...methods.register("reviews")}
              type="number"
              fullWidth
              placeholder="Reviews"
            />

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

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </>
  );
};

export default ProductEditFormPage;
