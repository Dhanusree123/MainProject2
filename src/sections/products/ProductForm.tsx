// // import { Controller, FormProvider, useForm } from "react-hook-form";
// // import Grid from "@mui/material/Grid2";
// // import {
// //   Autocomplete,
// //   Box,
// //   Button,
// //   Card,
// //   CardContent,
// //   TextField,
// //   Typography,
// // } from "@mui/material";
// // import RHFTextField from "../../components/RHFTextField";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { IProduct, ProductSchema } from "../../newtypes/product";
// // import { useCallback, useEffect, useMemo, useState } from "react";
// // import { FetchCategory } from "../../graphql/category";
// // import { FetchStore } from "../../graphql/store";
// // import { FetchData } from "../../graphql/brands";
// // import { AddProductType } from "../../types/product";
// // import { Category } from "../../types/category";
// // import { Store } from "../../types/store";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { TextField } from "@mui/material";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Switch from "@mui/material/Switch";
// import { Controller, FormProvider, useForm } from "react-hook-form";
// // import { IProduct, ProductSchema } from "../../types/product";
// import ImagePreviews from "./ProductImagePreview";
// import { useCallback, useEffect, useMemo, useState } from "react";
// import {
//   IProduct,
//   NewProductSchema,
//   ProductSchema,
// } from "../../newtypes/product";
// import RHFTextField from "../../components/RHFTextField";
// import RHFAutoComplete from "../../components/RHFAutoComplete";
// import { FetchData } from "../../graphql/brands";
// import { FetchCategory } from "../../graphql/category";
// import { FetchStore } from "../../graphql/store";

// // type Props = {
// //   onSubmit: (data: IProduct) => void;
// //   product: IProduct | null;
// // };

// // const ProductForm = (props: Props) => {
// //   const { onSubmit, product } = props;

// //   const defaultValues = useMemo(
// //     () => ({
// //       id: product?.id ?? "",
// //       title: product?.title ?? "",
// //       description: product?.description ?? "",
// //       brand: product?.brand ?? "",
// //       categoryId: product?.categoryId ?? "",
// //       categoryPath: product?.categoryPath ?? "",
// //       storeId: product?.storeId ?? "",
// //       mrp: product?.mrp ?? 0,
// //       dealPrice: product?.dealPrice ?? 0,
// //       listPrice: product?.listPrice ?? 0,
// //       rating: product?.rating ?? 0,
// //       reviews: product?.reviews ?? 0,
// //       code: product?.code ?? "",
// //       images: product?.images ?? [],
// //       active: product?.active ?? true,
// //       handPicked: product?.handPicked ?? false,
// //       expired: product?.expired ?? false,
// //       slug: product?.slug ?? "",
// //       sales: product?.sales ?? [],
// //     }),
// //     [product]
// //   );
// //   const methods = useForm<IProduct>({
// //     resolver: zodResolver(ProductSchema),
// //     defaultValues,
// //   });
// //   const {
// //     formState: { errors },
// //   } = methods;

// //   const [brands, setBrands] = useState<AddProductType[]>([]);
// //   const [categories, setCategories] = useState<Category[]>([]);
// //   const [stores, setStores] = useState<Store[]>([]);

// //   const getBrands = useCallback(async () => {
// //     const fetchedBrands = await FetchData();
// //     setBrands(fetchedBrands.brands);
// //   }, []);

// //   const getCategories = useCallback(async () => {
// //     const fetchedCategories = await FetchCategory();
// //     setCategories(fetchedCategories.categories);
// //   }, []);

// //   const getStores = useCallback(async () => {
// //     const fetchedStores = await FetchStore();
// //     setStores(fetchedStores.stores);
// //   }, []);

// //   useEffect(() => {
// //     getBrands();
// //   }, [getBrands]);

// //   useEffect(() => {
// //     getCategories();
// //   }, [getCategories]);

// //   useEffect(() => {
// //     getStores();
// //   }, [getStores]);
// //   return (
// //     <>
// //       <FormProvider {...methods}>
// //         <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
// //           <Grid container spacing={2}>
// //             <Card>
// //               <CardContent>
// //                 <Typography>Product</Typography>
// //                 <RHFTextField
// //                   name="title"
// //                   label="Title"
// //                   placeholder="Title"
// //                   helperText={errors.title && errors.title.message}
// //                 />
// //                 <RHFTextField
// //                   name="slug"
// //                   label="Slug"
// //                   placeholder="slug"
// //                   helperText={errors.slug && errors.slug.message}
// //                   disabled
// //                 />
// //                 <RHFTextField
// //                   name="description"
// //                   placeholder="Description"
// //                   label="Description"
// //                   multiline
// //                   rows={4}
// //                   helperText={errors.description && errors.description.message}
// //                 />
// //                 <RHFTextField
// //                   name="mrp"
// //                   label="MRP"
// //                   placeholder="MRP"
// //                   helperText={errors.mrp && errors.mrp.message}
// //                 />
// //                 <RHFTextField
// //                   name="listPrice"
// //                   label="List Price"
// //                   placeholder="List Price"
// //                   helperText={errors.listPrice && errors.listPrice.message}
// //                 />
// //                 <RHFTextField
// //                   name="dealPrice"
// //                   placeholder="Deal Price"
// //                   label="Deal Price"
// //                 />
// //                 <RHFTextField
// //                   name="code"
// //                   label="Code"
// //                   placeholder="Code"
// //                   helperText={errors.code && errors.code.message}
// //                 />
// //                 <Controller
// //                   name="brand"
// //                   control={methods.control}
// //                   rules={{ required: "Brand is required" }}
// //                   render={({ field, fieldState: { error } }) => (
// //                     <Autocomplete
// //                       {...field}
// //                       options={brands || []}
// //                       getOptionLabel={(option) => option?.title || ""}
// //                       value={categories.find((c) => c.id === field.value)}
// //                       onChange={(_, value) => field.onChange(value?.title || "")}
// //                       renderInput={(params) => (
// //                         <TextField
// //                           {...params}
// //                           label="Brand"
// //                           error={!!error}
// //                           helperText={error?.message}
// //                         />
// //                       )}
// //                     />
// //                   )}
// //                 />
// //                 <Controller
// //                   name="categoryPath"
// //                   control={methods.control}
// //                   rules={{ required: "Category is required" }}
// //                   render={({ field, fieldState: { error } }) => (
// //                     <Autocomplete
// //                       {...field}
// //                       options={categories || []}
// //                       getOptionLabel={(option) => option?.title || ""}
// //                       value={categories.find((c) => c.id === field.value)}
// //                       onChange={(_, value) => field.onChange(value?.id || "")}
// //                       renderInput={(params) => (
// //                         <TextField
// //                           {...params}
// //                           label="Category"
// //                           error={!!error}
// //                           helperText={error?.message}
// //                         />
// //                       )}
// //                     />
// //                   )}
// //                 />
// //                 <Controller
// //                   name="store"
// //                   control={methods.control}
// //                   rules={{ required: "Store is required" }}
// //                   render={({ field, fieldState: { error } }) => (
// //                     <Autocomplete
// //                       {...field}
// //                       options={stores || []}
// //                       getOptionLabel={(option) => option?.title || ""}
// //                       value={categories.find((c) => c.id === field.value)}
// //                       onChange={(_, value) => field.onChange(value?.id || "")}
// //                       renderInput={(params) => (
// //                         <TextField
// //                           {...params}
// //                           label="Brand"
// //                           error={!!error}
// //                           helperText={error?.message}
// //                         />
// //                       )}
// //                     />
// //                   )}
// //                 />
// //                 <Button type="submit">Submit</Button>
// //               </CardContent>
// //             </Card>
// //           </Grid>
// //         </Box>
// //       </FormProvider>
// //     </>
// //   );
// // };

// // export default ProductForm;

// type Props = {
//   onSubmit: (data: IProduct) => void;
//   product: IProduct | null;
// };

// // type OptionType = { id: string; title: string };

// const ProductForm = (props: Props) => {
//   const { onSubmit, product } = props;

//   const [brands, setBrands] = useState("");
//   const [categories, setCategories] = useState();
//   const [stores, setStores] = useState();
//   // const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

//   const defaultValues = useMemo(
//     () => ({
//       id: product?.id ?? "",
//       title: product?.title ?? "",
//       description: product?.description ?? "",
//       brandId: product?.brandId ?? "",
//       categoryId: product?.categoryId ?? "",
//       categoryPath: product?.categoryPath ?? "",
//       storeId: product?.storeId ?? "",
//       mrp: product?.mrp ?? 0,
//       listPrice: product?.listPrice ?? 0,
//       dealPrice: product?.dealPrice ?? 0,
//       rating: product?.rating ?? 0,
//       reviews: product?.reviews ?? 0,
//       code: product?.code ?? "",
//       images: product?.images ?? [],
//       handPicked: product?.handPicked ?? false,
//       active: product?.active ?? false,
//       expired: product?.expired ?? false,
//       slug: product?.slug ?? "",
//       sales: product?.sales ?? [],
//       priceHistory: [
//         {
//           mrp: product?.mrp ?? 0,
//           listPrice: product?.listPrice ?? 0,
//           dealPrice: product?.dealPrice ?? 0,
//           date: new Date().toISOString(),
//         },
//       ],
//     }),
//     [product]
//   );
//   const methods = useForm<IProduct>({
//     resolver: zodResolver(NewProductSchema),
//     defaultValues,
//   });

//   const {
//     control,
//     handleSubmit,
//     register,
//     formState: { errors },
//     setValue,
//   } = methods;

//   console.log(errors);

//   // const handleOptionChange = (value: OptionType | null) => {
//   //   setSelectedOption(value);
//   // };
//   // const fetchedBrands = useCallback(async () => {
//   //   const brands = await FetchData();
//   //   setBrands(brands);
//   // }, []);
//   // const fetchedCategories = useCallback(async () => {
//   //   const categories = await FetchCategory();
//   //   setCategories(categories);
//   // }, []);

//   // const fetchedStores = useCallback(async () => {
//   //   const stores = await FetchStore();
//   //   setStores(stores);
//   // }, []);
//   // useEffect(() => {
//   //   fetchedBrands();
//   // }, [fetchedBrands]);

//   // useEffect(() => {
//   //   fetchedCategories();
//   // }, [fetchedCategories]);

//   // useEffect(() => {
//   //   fetchedStores();
//   // }, [fetchedStores]);

//   useEffect(() => {
//     const fetchBrands = async () => setBrands(await FetchData());
//     const fetchCategories = async () => setCategories(await FetchCategory());
//     const fetchStores = async () => setStores(await FetchStore());

//     fetchBrands();
//     fetchCategories();
//     fetchStores();
//   }, []);

//   useEffect(() => {
//     if (product) {
//       setValue("brandId", product.brandId || "");
//       setValue("categoryId", product.categoryId || "");
//       setValue("categoryPath", product.categoryPath || "");
//       setValue("storeId", product.storeId || "");
//     }
//   }, [product, setValue]);

//   return (
//     <>
//       <Box>
//         <FormProvider {...methods}>
//           <Box component="form" onSubmit={handleSubmit(onSubmit)}>
//             {/* <RHFTextField
//               name="id"
//               label="Id"
//               fullWidth
//               margin="normal"
//               disabled
//             /> */}
//             <RHFTextField
//               // name="title"
//               fullWidth
//               placeholder="Title"
//               margin="normal"
//               {...register("title")}
//             />
//             <RHFTextField
//               name="slug"
//               fullWidth
//               placeholder="Slug"
//               margin="normal"
//               disabled
//             />
//             <RHFTextField
//               name="description"
//               fullWidth
//               placeholder="Description"
//               margin="normal"
//               multiline
//             />
//             <RHFTextField
//               name="mrp"
//               type="number"
//               fullWidth
//               placeholder="MRP"
//               margin="normal"
//             />
//             <RHFTextField
//               type="number"
//               fullWidth
//               name="listPrice"
//               placeholder="List Price"
//               margin="normal"
//             />
//             <RHFTextField
//               type="number"
//               name="dealPrice"
//               fullWidth
//               placeholder="Deal Price"
//               margin="normal"
//             />
//             <RHFTextField
//               fullWidth
//               name="code"
//               placeholder="Code"
//               margin="normal"
//               disabled
//             />
//             {/* <RHFAutoComplete
//               value={selectedOption}
//               name="brand"
//               label="Brand"
//               options={brands || []}
//               onChange={handleOptionChange}
//             /> */}
//             <Controller
//               name="brandId"
//               control={control}
//               render={({ field }) => (
//                 <RHFAutoComplete
//                   label="Brand"
//                   options={brands}
//                   value={brands.find((b) => b.id === field.value) || null}
//                   onChange={(value) => setValue("brandId", value?.id ?? "")}
//                 />
//               )}
//             />
//             {/*
//             <RHFAutoComplete
//               value={selectedOption}
//               name="category"
//               label="Category"
//               options={categories || []}
//               onChange={(value) => setValue("categoryId", value?.title ?? "")}
//             /> */}

//             {/* <RHFAutoComplete
//               value={selectedOption}
//               name="store"
//               label="Store"
//               options={stores || []}
//               onChange={(value) => setValue("storeId", value?.title ?? "")}
//             /> */}

//             <Controller
//               name="categoryId"
//               control={control}
//               render={({ field }) => (
//                 <RHFAutoComplete
//                   label="Category"
//                   options={categories}
//                   value={categories.find((c) => c.id === field.value) || null}
//                   onChange={(value) => {
//                     setValue("categoryId", value?.id ?? "");
//                     setValue("categoryPath", value?.title ?? ""); // Update category path
//                   }}
//                 />
//               )}
//             />

//             <Controller
//               name="storeId"
//               control={control}
//               render={({ field }) => (
//                 <RHFAutoComplete
//                   label="Store"
//                   options={stores}
//                   value={stores.find((s) => s.id === field.value) || null}
//                   onChange={(value) => setValue("storeId", value?.id ?? "")}
//                 />
//               )}
//             />

//             <TextField
//               {...methods.register("categoryPath")}
//               fullWidth
//               placeholder="Category Path"
//               margin="normal"
//             />

//             <TextField
//               {...methods.register("rating")}
//               type="text"
//               inputMode="decimal"
//               fullWidth
//               placeholder="Rating"
//               margin="normal"
//             />
//             <TextField
//               {...methods.register("reviews")}
//               type="number"
//               fullWidth
//               placeholder="Reviews"
//               margin="normal"
//             />

//             <ImagePreviews images={product?.images ?? []} />

//             <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//               <Controller
//                 name="handPicked"
//                 control={control}
//                 render={({ field }) => (
//                   <FormControlLabel
//                     control={
//                       <Switch
//                         checked={field.value}
//                         onChange={(e) => field.onChange(e.target.checked)}
//                       />
//                     }
//                     label="Handpicked"
//                   />
//                 )}
//               />
//             </Box>
//             <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//               <Controller
//                 name="active"
//                 control={control}
//                 render={({ field }) => (
//                   <FormControlLabel
//                     control={
//                       <Switch
//                         checked={field.value}
//                         onChange={(e) => field.onChange(e.target.checked)}
//                       />
//                     }
//                     label="Active"
//                   />
//                 )}
//               />

//               <Controller
//                 name="expired"
//                 control={control}
//                 render={({ field }) => (
//                   <FormControlLabel
//                     control={
//                       <Switch
//                         checked={field.value}
//                         onChange={(e) => field.onChange(e.target.checked)}
//                       />
//                     }
//                     label="Expired"
//                   />
//                 )}
//               />
//             </Box>

//             <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//               <Button type="submit" variant="contained" color="primary">
//                 Submit
//               </Button>
//             </Box>
//           </Box>
//         </FormProvider>
//       </Box>
//     </>
//   );
// };

// export default ProductForm;

// {
//   /*
//             {imagePreviews.length > 0 && (
//               <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
//                 {imagePreviews.map((img, index) => (
//                   <Box key={index} sx={{ width: 100, height: 100 }}>
//                     <img
//                       src={img}
//                       alt={`Preview ${index}`}
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                       }}
//                     />
//                   </Box>
//                 ))}
//               </Box>
//             )} */
// }

import { toast } from "sonner";
import { FormProvider, useForm } from "react-hook-form";
// import { useLazyQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState, useEffect, useCallback } from "react";

import Grid from "@mui/material/Grid2";
// import { LoadingButton } from "@mui/lab";
import { Box, Card, Stack, Typography, CardContent } from "@mui/material";
import {
  IProduct,
  NewProductSchema,
  UpdateProductSchema,
} from "../../newtypes/product";
import RHFTextField from "../../components/RHFTextField";

// import useDebounce from "@/hooks/use-debounce";

// import { generateSlug } from "@/utils/common";
// import { getErrorMessage } from "@/utils/error";

// import FormProvider from "@/components/hook-form/form-provider";
// import { RHFSwitch, RHFTextField } from "@/components/hook-form";

// import { CHECK_PRODUCT_SLUG } from "@/graphql/product";

// import {
//   type IProduct,
//   NewProductSchema,
//   UpdateProductSchema,
// } from "@/types/product";

// import PriceHistory from "./PriceHistory";
// import ProductPreview from "./ProductPreview";
// import ProductSalesList from "./ProductSalesList";
// import CustomAutocomplete from "../filters/CustomAutocomplete";

type Props = {
  onSubmit: (data: IProduct) => void;
  isEdit?: boolean;
  product: IProduct | null;
  loading: boolean;
};

type IFields = {
  id: string;
  title: string;
  path?: string;
  active: boolean;
};

type ISelected = {
  brand: IFields | null;
  category: (IFields & { path: string }) | null;
  store: IFields | null;
};

const ProductForm = (props: Props) => {
  const { onSubmit, isEdit = false, product, loading } = props;
  const [selected, setSelected] = useState<ISelected>({
    brand: null,
    category: null,
    store: null,
  });

  const productSchema = isEdit ? UpdateProductSchema : NewProductSchema;

  // const [checkProductSlug] = useLazyQuery(CHECK_PRODUCT_SLUG, {
  //   fetchPolicy: "no-cache",
  // });

  const defaultValues = useMemo(
    () => ({
      id: product?.id ?? "",
      title: product?.title ?? "",
      description: product?.description ?? "",
      brandId: product?.brandId ?? "",
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
      priceHistory: [
        {
          mrp: product?.mrp ?? 0,
          listPrice: product?.listPrice ?? 0,
          dealPrice: product?.dealPrice ?? 0,
          date: new Date().toISOString(),
        },
      ],
    }),
    [product]
  );

  const methods = useForm<IProduct>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    setError,
    clearErrors,
    watch,
  } = methods;

  const setFormValue = useCallback(
    (field: keyof IProduct, value: string) => {
      setValue(field, value, { shouldValidate: true });
    },
    [setValue]
  );

  const handleSelected = useCallback(
    <T extends keyof ISelected>(key: T, value: ISelected[T]) => {
      setSelected((prev) => ({
        ...prev,
        [key]: value,
      }));

      switch (key) {
        case "brand":
          setFormValue("brandId", value?.id ?? "");
          break;
        case "category":
          setFormValue("categoryId", value?.id ?? "");
          setFormValue("categoryPath", value?.path ?? "");
          break;
        case "store":
          setFormValue("storeId", value?.id ?? "");
          break;
        default:
          break;
      }
    },
    [setFormValue]
  );

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormValue("title", value);
    // setFormValue("slug", generateSlug(value));
  };

  const title = watch("title");
  const mrp = watch("mrp");
  const dealPrice = watch("dealPrice");
  const images = watch("images");
  const listPrice = watch("listPrice");
  const slugValue = watch("slug");
  const expired = watch("expired");

  // const debounceSlug = useDebounce(slugValue);

  useEffect(() => {
    if (expired) {
      setValue("dealPrice", listPrice, { shouldValidate: true });
    }
  }, [expired, setValue, listPrice]);

  useEffect(() => {
    if (product) {
      const { brand, brandId, categoryId, categoryPath, store, storeId } =
        product;

      if (brand && brandId) {
        handleSelected("brand", { id: brandId, title: brand, active: true });
      }

      if (categoryId) {
        handleSelected("category", {
          id: categoryId,
          title: categoryPath.split("_").pop() ?? "",
          path: categoryPath,
          active: true,
        });
      }

      if (store && storeId) {
        handleSelected("store", { id: storeId, title: store, active: true });
      }
    }
  }, [product, handleSelected]);

  useEffect(() => {
    reset({
      ...defaultValues,
    });
  }, [defaultValues, reset]);

  useEffect(() => {
    if (!isEdit && title) {
      const slug = generateSlug(title);
      setFormValue("slug", slug);
    }
  }, [title, setFormValue, isEdit]);

  useEffect(() => {
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        toast.error(error.message);
      }
    });
  }, [errors]);

  return (
    <Box>
      <FormProvider {...methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }} order={{ xs: 2, md: 1, l: 1, xl: 1 }}>
            <Stack spacing={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3 }}>
                    {isEdit ? "Edit" : "Add"} Product
                  </Typography>
                  <Stack spacing={2}>
                    {isEdit && <RHFTextField name="id" label="ID" disabled />}
                    <RHFTextField
                      name="title"
                      label="Title"
                      placeholder="Title"
                      helperText={errors.title && errors.title.message}
                      onChange={handleTitleChange}
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
                      helperText={
                        errors.description && errors.description.message
                      }
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
                      disabled={isEdit}
                    />

                    {/* <CustomAutocomplete
                      label="Brand"
                      selectedFilter={selected.brand}
                      handleSelectedFilter={(value) =>
                        handleSelected("brand", value)
                      }
                      error={errors.brandId}
                      showAddButton
                    /> */}
                    {/* <CustomAutocomplete
                      label="Category"
                      selectedFilter={selected.category}
                      handleSelectedFilter={(value) =>
                        handleSelected("category", value)
                      }
                      error={errors.categoryId}
                      showAddButton
                    /> */}

                    {isEdit && (
                      <RHFTextField
                        name="categoryPath"
                        label="Category Path"
                        placeholder="Category Path"
                        helperText={
                          errors.categoryPath && errors.categoryPath.message
                        }
                        disabled={true}
                      />
                    )}
                    {/* <CustomAutocomplete
                      label="Store"
                      selectedFilter={selected.store}
                      handleSelectedFilter={(value) =>
                        handleSelected("store", value)
                      }
                      error={errors.storeId}
                      showAddButton
                    /> */}
                    <RHFTextField
                      name="rating"
                      label="Rating"
                      placeholder="Rating"
                      helperText={errors.rating && errors.rating.message}
                    />
                    <RHFTextField
                      name="reviews"
                      label="Reviews"
                      placeholder="Reviews"
                      helperText={errors.reviews && errors.reviews.message}
                    />
                    <Stack direction="row" alignItems="center">
                      {/* <RHFSwitch
                        name="handPicked"
                        label="HandPicked"
                        sx={{ ml: "auto" }}
                      /> */}
                    </Stack>
                    {isEdit && (
                      <Stack direction="row" justifyContent="space-between">
                        {/* <RHFSwitch name="active" label="Active" />
                        <RHFSwitch name="expired" label="Expired" /> */}
                      </Stack>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 2, l: 2, xl: 2 }}>
            {/* <ProductPreview
              title={title}
              images={images}
              dealPrice={dealPrice}
              mrp={mrp}
              listPrice={listPrice}
              loading={loading}
            /> */}
            {/* <ProductSalesList
              sales={product?.sales || []}
              onSaleSubmit={(sales) => setValue("sales", sales)}
            /> */}
          </Grid>
        </Grid>
      </FormProvider>
    </Box>
  );
};

export default ProductForm;
