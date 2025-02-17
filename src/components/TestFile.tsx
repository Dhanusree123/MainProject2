// import {
//   Box,
//   Button,
//   Skeleton,
//   Stack,
//   // TextField,
//   Typography,
// } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import ProductForm from "../components/ProductForm";
// import { Scraper } from "../types/scraper";
// import ProductsFromScraper from "../graphql/scraper";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { AddProduct, AddProductType } from "../types/product";

// const ProductFormPage = () => {
//   const methods = useForm<AddProductType>({
//     resolver: zodResolver(AddProduct),
//     defaultValues: {
//       title: "",
//       slug: "",
//       description: "",
//       mrp: 0,
//       listPrice: 0,
//       dealPrice: 0,
//       code: "",
//       brand: "",
//       category: "",
//       store: "",
//       rating: 0,
//       reviews: 0,
//       handPicked: false,
//     },
//     mode: "onChange",
//   }); // For updating form values

//   const { setValue } = methods;
//   const setScraperData = (data: Scraper) => {
//     setValue("title", data.title || "");
//     // setValue("slug", data.slug || "");
//     setValue("description", data.description || "");
//     setValue("mrp", data.mrp || 0);
//     setValue("listPrice", data.listPrice || 0);
//     setValue("dealPrice", data.dealPrice || 0);
//     setValue("code", data.code || "");
//     setValue("rating", data.rating || 0);
//     setValue("reviews", data.reviews || 0);
//   };
//   return (
//     <Box sx={{ width: "70%", height: "100vh", padding: 2 }}>
//       <Grid container spacing={2}>
//         <Grid size={{ xs: 12, md: 12 }} sx={{ borderRadius: 4 }}>
//           <Typography sx={{ pl: 2 }} variant="h6">
//             Product URL
//           </Typography>
//           <Box
//             sx={{
//               height: 100,
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               order: 1,
//               pl: 2,
//               pr: 2,
//             }}
//           >
//             {/* <TextField
//               sx={{ m: 2 }}
//               label="Product URL"
//               fullWidth
//               size="medium"
//             />
//             <Button variant="contained">Fetch</Button> */}

//             <ProductsFromScraper onDataFetched={setScraperData} />
//           </Box>
//         </Grid>

//         <Grid size={{ xs: 12, md: 7 }}>
//           <Box
//             sx={{
//               width: "100%",
//               height: "auto",
//               display: "flex",
//               justifyContent: "center",
//               order: { xs: 4, md: 2 },
//             }}
//           >
//             <ProductForm />
//           </Box>
//         </Grid>

//         <Grid size={{ xs: 12, md: 5 }}>
//           <Stack
//             sx={{
//               height: "auto",
//               width: "100%",
//               display: "flex",
//               // bgcolor: "gray",
//               direction: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               order: { xs: 2, md: 3 },
//               mb: 2,
//             }}
//           >
//             <Skeleton variant="rectangular" width={340} height={270} />
//             <Stack direction="row">
//               <Skeleton variant="text" width={162} height={80} sx={{ mr: 2 }} />
//               <Skeleton variant="text" width={162} />
//             </Stack>
//             <Skeleton variant="text" width={340} height={50} />
//           </Stack>
//           <Box
//             sx={{
//               height: "auto",
//               width: "78%",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               order: { xs: 3, md: 4 },
//               ml: 6,
//             }}
//           >
//             <Typography variant="h6">Product Sales</Typography>
//             <Button variant="contained" size="small">
//               Sale
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default ProductFormPage;
