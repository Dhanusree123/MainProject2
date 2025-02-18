import { Controller, FormProvider, useForm } from "react-hook-form";
import Grid from "@mui/material/Grid2";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import RHFTextField from "../../components/RHFTextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { IProduct, ProductSchema } from "../../newtypes/product";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FetchCategory } from "../../graphql/category";
import { FetchStore } from "../../graphql/store";
import { FetchData } from "../../graphql/brands";
import { AddProductType } from "../../types/product";
import { Category } from "../../types/category";
import { Store } from "../../types/store";

type Props = {
  onSubmit: (data: IProduct) => void;
  product: IProduct | null;
};

const ProductForm = (props: Props) => {
  const { onSubmit, product } = props;

  const defaultValues = useMemo(
    () => ({
      id: product?.id ?? "",
      title: product?.title ?? "",
      description: product?.description ?? "",
      brand: product?.brand ?? "",
      categoryId: product?.categoryId ?? "",
      categoryPath: product?.categoryPath ?? "",
      storeId: product?.storeId ?? "",
      mrp: product?.mrp ?? 0,
      dealPrice: product?.dealPrice ?? 0,
      listPrice: product?.listPrice ?? 0,
      rating: product?.rating ?? 0,
      reviews: product?.reviews ?? 0,
      code: product?.code ?? "",
      images: product?.images ?? [],
      active: product?.active ?? true,
      handPicked: product?.handPicked ?? false,
      expired: product?.expired ?? false,
      slug: product?.slug ?? "",
      sales: product?.sales ?? [],
    }),
    [product]
  );
  const methods = useForm<IProduct>({
    resolver: zodResolver(ProductSchema),
    defaultValues,
  });
  const {
    formState: { errors },
  } = methods;

  const [brands, setBrands] = useState<AddProductType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stores, setStores] = useState<Store[]>([]);

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
    <>
      <FormProvider {...methods}>
        <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Card>
              <CardContent>
                <Typography>Product</Typography>
                <RHFTextField
                  name="title"
                  label="Title"
                  placeholder="Title"
                  helperText={errors.title && errors.title.message}
                />
                <RHFTextField
                  name="slug"
                  label="Slug"
                  placeholder="slug"
                  helperText={errors.slug && errors.slug.message}
                  disabled
                />
                <RHFTextField
                  name="description"
                  placeholder="Description"
                  label="Description"
                  multiline
                  rows={4}
                  helperText={errors.description && errors.description.message}
                />
                <RHFTextField
                  name="mrp"
                  label="MRP"
                  placeholder="MRP"
                  helperText={errors.mrp && errors.mrp.message}
                />
                <RHFTextField
                  name="listPrice"
                  label="List Price"
                  placeholder="List Price"
                  helperText={errors.listPrice && errors.listPrice.message}
                />
                <RHFTextField
                  name="dealPrice"
                  placeholder="Deal Price"
                  label="Deal Price"
                />
                <RHFTextField
                  name="code"
                  label="Code"
                  placeholder="Code"
                  helperText={errors.code && errors.code.message}
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
                      value={categories.find((c) => c.id === field.value)}
                      onChange={(_, value) => field.onChange(value?.id || "")}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Brand"
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />
                <Controller
                  name="categoryPath"
                  control={methods.control}
                  rules={{ required: "Category is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <Autocomplete
                      {...field}
                      options={categories || []}
                      getOptionLabel={(option) => option?.title || ""}
                      value={categories.find((c) => c.id === field.value)}
                      onChange={(_, value) => field.onChange(value?.id || "")}
                      renderInput={(params) => (
                        <TextField
                          {...params}
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
                      value={categories.find((c) => c.id === field.value)}
                      onChange={(_, value) => field.onChange(value?.id || "")}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Brand"
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                    />
                  )}
                />
                <Button type="submit">Submit</Button>
              </CardContent>
            </Card>
          </Grid>
        </Box>
      </FormProvider>
    </>
  );
};

export default ProductForm;
