// // // import { Autocomplete, Box, Button, Switch, TextField } from "@mui/material";
// // // import { AddProduct, AddProductType } from "../types/product";
// // // // import TextFieldController from "./TextFieldController";
// // // import { FetchData } from "../graphql/brands";
// // // import { useCallback, useEffect, useState } from "react";
// // // import { Category } from "../types/category";
// // // import { FetchCategory } from "../graphql/category";
// // // import { FetchStore } from "../graphql/store";
// // // // import { Store } from "../types/store";
// // // import {
// // //   // Controller,
// // //   // Controller,
// // //   FormProvider,
// // //   SubmitHandler,
// // //   useForm,
// // // } from "react-hook-form";
// // // import { zodResolver } from "@hookform/resolvers/zod";
// // // // import { FetchDetails } from "../graphql/scraper";
// // // // import { Scraper } from "../types/scraper";

// // // const ProductForm = () => {
// // //   const methods = useForm<AddProductType>({
// // //     resolver: zodResolver(AddProduct),
// // //     defaultValues: {
// // //       title: "",
// // //       slug: "",
// // //       description: "",
// // //       mrp: 0,
// // //       listPrice: 0,
// // //       dealPrice: 0,
// // //       code: "",
// // //       brand: "",
// // //       category: "",
// // //       store: "",
// // //       rating: 0,
// // //       reviews: 0,
// // //       handPicked: false,
// // //     },
// // //     mode: "onChange",
// // //   });

// // //   const { setValue, reset } = methods;
// // //   // const [brands, setBrands] = useState<AddProductType[]>([]);
// // //   // const [categories, setCategories] = useState<Category[]>([]);
// // //   // const [stores, setStores] = useState<Store[]>([]);
// // //   // const [all, setAll] = useState<Scraper>();
// // //   // const fields: {
// // //   //   name: keyof AddProductType;
// // //   //   label: string;
// // //   //   type?: string;
// // //   // }[] = [
// // //   //   { name: "title", label: "Title", type: "string" },
// // //   //   { name: "slug", label: "Slug", type: "string" },
// // //   //   {
// // //   //     name: "description",
// // //   //     label: "Description",
// // //   //     type: "string",
// // //   //   },
// // //   //   { name: "mrp", label: "mrp", type: "number" },
// // //   //   { name: "listPrice", label: "listPrice", type: "number" },
// // //   //   { name: "dealPrice", label: "dealPrice", type: "number" },
// // //   //   { name: "code", label: "Code", type: "string" },
// // //   //   { name: "rating", label: "Rating", type: "number" },
// // //   //   {
// // //   //     name: "reviews",
// // //   //     label: "Reviews",
// // //   //     type: "number",
// // //   //   },
// // //   // ];

// const getBrands = useCallback(async () => {
//   const fetchedBrands = await FetchData();
//   // console.log(fetchedBrands.brands);
//   setBrands(fetchedBrands.brands);
// }, []);

// // //   // const getCategories = useCallback(async () => {
// // //   //   const fetchedCategories = await FetchCategory();
// // //   //   // console.log(fetchedCategories);
// // //   //   setCategories(fetchedCategories.categories);
// // //   // }, []);

// // //   // const getStores = useCallback(async () => {
// // //   //   const fetchedStores = await FetchStore();
// // //   //   // console.log(fetchedStores);
// // //   //   setStores(fetchedStores.stores);
// // //   // }, []);

// // //   // const setScraperData = (data: Scraper) => {
// // //   //   setValue("title", data.title || "");
// // //   //   // setValue("slug", data.slug || "");
// // //   //   setValue("description", data.description || "");
// // //   //   setValue("mrp", data.mrp || 0);
// // //   //   setValue("listPrice", data.listPrice || 0);
// // //   //   setValue("dealPrice", data.dealPrice || 0);
// // //   //   setValue("code", data.code || "");
// // //   //   setValue("rating", data.rating || 0);
// // //   //   setValue("reviews", data.reviews || 0);
// // //   // };

// // //   const onSubmit: SubmitHandler<AddProductType> = (data) => {
// // //     // console.log("clicked");
// // //     console.log(data);
// // //   };

// // //   // const handleSubmitForm = methods.handleSubmit(
// // //   //   (data) => {
// // //   //     console.log("Form submitted successfully!");
// // //   //     console.log(data);
// // //   //   },
// // //   //   (errors) => {
// // //   //     console.log("Validation failed!", errors);
// // //   //   }
// // //   // );

// // //   // console.log(brands);

// // //   // const scraper = useCallback(async () => {
// // //   //   const url = `https://amazon.in/dp/${asin}`;
// // //   //   const fetched = await FetchDetails(url);
// // //   //   console.log(fetched);
// // //   //   // setAll(fetched);
// // //   // }, []);

// // //   // useEffect(() => {
// // //   //   getBrands();
// // //   // }, [getBrands]);

// // //   // useEffect(() => {
// // //   //   getCategories();
// // //   // }, [getCategories]);

// // //   // useEffect(() => {
// // //   //   getStores();
// // //   // }, [getStores]);

// // //   // useEffect(() => {
// // //   //   scraper();
// // //   // }, [scraper]);

// // //   useEffect(() => {
// // //     const fetchProductData = async () => {
// // //       try {
// // //         const fetchedData = await FetchData();
// // //         console.log(fetchedData); // Assume this returns the product details
// // //         if (fetchedData) {
// // //           reset({
// // //             title: fetchedData.title || "",
// // //             slug: fetchedData.slug || "",
// // //             description: fetchedData.description || "",
// // //             mrp: fetchedData.mrp || 0,
// // //             listPrice: fetchedData.listPrice || 0,
// // //             dealPrice: fetchedData.dealPrice || 0,
// // //             code: fetchedData.code || "",
// // //             brand: fetchedData.brand || "",
// // //             category: fetchedData.category || "",
// // //             store: fetchedData.store || "",
// // //             rating: fetchedData.rating || 0,
// // //             reviews: fetchedData.reviews || 0,
// // //             handPicked: fetchedData.handPicked || false,
// // //           });
// // //         }
// // //       } catch (error) {
// // //         console.error("Error fetching product data:", error);
// // //       }
// // //     };

// // //     fetchProductData();
// // //   }, [reset]);

// // //   return (
// // //     <>
// // //       <FormProvider {...methods}>
// // //         <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
// // //           {/* {fields.map((m) => (
// // //             <TextFieldController
// // //               key={m.name}
// // //               // name={m.name}
// // //               {...methods.register(m.name)}
// // //               label={m.label}
// // //               type={m.type}
// // //             />
// // //           ))} */}
// // //           {/* <Controller
// // //             name="title"
// // //             control={methods.control}
// // //             rules={{ required: "title is required" }}
// // //             render={({ field, fieldState: { error } }) => ( */}
// // //           <TextField
// // //             // {...field}
// // //             label="Title"
// // //             {...methods.register("title")}
// // //             // error={!!errors}
// // //             // helperText={error ? error.message : ""}
// // //           />
// // //           {/* )}
// // //           /> */}

// // //           {/* <Controller
// // //             name="code"
// // //             control={methods.control}
// // //             rules={{ required: "title is required" }}
// // //             render={({ field, fieldState: { error } }) => ( */}
// // //           <TextField
// // //             // {...field}
// // //             label="Code"
// // //             {...methods.register("code")}
// // //             // error={!!error}
// // //             // helperText={error ? error.message : ""}
// // //           />
// // //           {/* )} */}
// // //           {/* /> */}

// // //           {/* <Controller
// // //             name="brand"
// // //             control={methods.control}
// // //             rules={{ required: "Brand is required" }}
// // //             render={({ field, fieldState: { error } }) => (
// // //               <Autocomplete
// // //                 {...field}
// // //                 options={brands || []}
// // //                 getOptionLabel={(option) => option?.title || ""}
// // //                 value={brands.find((b) => b.title === field.value) || null}
// // //                 onChange={(_, value) => field.onChange(value?.title || "")}
// // //                 renderInput={(params) => (
// // //                   <TextField
// // //                     {...params}
// // //                     label="Brand"
// // //                     error={!!error}
// // //                     helperText={error?.message}
// // //                   />
// // //                 )}
// // //               />
// // //             )}
// // //           />
// // //           <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
// // //             <Button variant="text" size="small">
// // //               Add Brand
// // //             </Button>
// // //           </Box>
// // //           <Controller
// // //             name="category"
// // //             control={methods.control}
// // //             rules={{ required: "Category is required" }}
// // //             render={({ field, fieldState: { error } }) => (
// // //               <Autocomplete
// // //                 {...field}
// // //                 options={categories || []}
// // //                 getOptionLabel={(option) => option?.title || ""}
// // //                 value={categories.find((c) => c.id === field.value)}
// // //                 onChange={(_, value) => field.onChange(value?.title || "")}
// // //                 renderInput={(params) => (
// // //                   <TextField
// // //                     {...params}
// // //                     label="Brand"
// // //                     error={!!error}
// // //                     helperText={error?.message}
// // //                   />
// // //                 )}
// // //               />
// // //             )}
// // //           />
// // //           <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
// // //             <Button variant="text" size="small">
// // //               Add Category
// // //             </Button>
// // //           </Box>
// // //           <Controller
// // //             name="store"
// // //             control={methods.control}
// // //             rules={{ required: "Store is required" }}
// // //             render={({ field, fieldState: { error } }) => (
// // //               <Autocomplete
// // //                 {...field}
// // //                 options={stores || []}
// // //                 getOptionLabel={(option) => option?.title || ""}
// // //                 value={stores.find((s) => s.title === field.value) || null}
// // //                 onChange={(_, value) => field.onChange(value?.title || "")}
// // //                 renderInput={(params) => (
// // //                   <TextField
// // //                     {...params}
// // //                     label="Store"
// // //                     error={!!error}
// // //                     helperText={error?.message}
// // //                   />
// // //                 )}
// // //               />
// // //             )}
// // //           />
// // //           <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
// // //             <Button variant="text" size="small">
// // //               Add Store
// // //             </Button>
// // //           </Box>
// // //           <Controller
// // //             name="handPicked"
// // //             control={methods.control}
// // //             defaultValue={false}
// // //             // rules={{ required: "Required" }}
// // //             render={({ field }) => (
// // //               <Switch
// // //                 {...field}
// // //                 // defaultChecked
// // //                 checked={field.value}
// // //                 onChange={(e) => field.onChange(e.target.checked)}
// // //               />
// // //             )}
// // //           /> */}
// // //           <Box>
// // //             <Button type="submit">Submit</Button>
// // //           </Box>
// // //         </Box>
// // //       </FormProvider>
// // //     </>
// // //   );
// // // };

// // // export default ProductForm;

// // import { useEffect, useState } from "react";
// // import { useForm, FormProvider } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { Box, Button, TextField } from "@mui/material";
// // import { AddProduct, AddProductType } from "../types/product";
// // import { FetchData } from "../graphql/brands";
// // import { Scraper } from "../types/scraper";

// // const ProductForm = () => {
// //   const methods = useForm<AddProductType>({
// //     resolver: zodResolver(AddProduct),
// //     defaultValues: {
// //       title: "",
// //       slug: "",
// //       description: "",
// //       mrp: 0,
// //       listPrice: 0,
// //       dealPrice: 0,
// //       code: "",
// //       brand: "",
// //       category: "",
// //       store: "",
// //       rating: 0,
// //       reviews: 0,
// //       handPicked: false,
// //     },
// //     mode: "onChange",
// //   });

// //   const { setValue, reset, watch } = methods;
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchProductData = async () => {
// //       try {
// //         const fetchedData = await FetchData();
// //         console.log("Fetched Data:", fetchedData);

// //         if (fetchedData) {
// //           reset({ ...fetchedData }); // Update entire form
// //           console.log("Form reset with:", fetchedData);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching product data:", error);
// //       } finally {
// //         setLoading(false); // Ensure form re-renders
// //       }
// //     };

// //     fetchProductData();
// //   }, [reset]);

// //   const onSubmit = (data: Scraper) => {
// //     console.log("Form Submitted:", data);
// //   };

// //   if (loading) return <p>Loading...</p>;

// //   return (
// //     <FormProvider {...methods}>
// //       <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
// //         <TextField
// //           label="Title"
// //           {...methods.register("title")}
// //           fullWidth
// //           margin="normal"
// //         />
// //         <TextField
// //           label="Code"
// //           {...methods.register("code")}
// //           fullWidth
// //           margin="normal"
// //         />

// //         <Box>
// //           <Button type="submit">Submit</Button>
// //         </Box>
// //       </Box>
// //     </FormProvider>
// //   );
// // };

// // export default ProductForm;
