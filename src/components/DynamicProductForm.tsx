// import {
//   Autocomplete,
//   Box,
//   Button,
//   Container,
//   Switch,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { Controller, useForm } from "react-hook-form";
// import { FieldType, ProductSchema } from "../types/product";
// import { zodResolver } from "@hookform/resolvers/zod";

// const DynamicProductForm = ({ fields, onSubmit }: FieldType) => {
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(ProductSchema),
//     defaultValues: {
//       brand: "",
//       code: "",
//       active: false,
//       expired: false,
//       category: "",
//       store: "",
//       handPicked: false,
//       slug: "",
//       dealPrice: 0,
//       description: "",
//       images: [],
//       listPrice: 0,
//       mrp: 0,
//       rating: 0,
//       reviews: 0,
//       title: "",
//     },
//   });

//   return (
//     <Box>
//       <Container>
//         <Box component="form" onSubmit={handleSubmit(onSubmit)}>
//           <Typography>Add Product</Typography>
//           {fields.map(({ name, label, type }) => (
//             <Box key={name} marginBottom={2}>
//               {type === "switch" ? (
//                 <Controller
//                   control={control}
//                   name={name}
//                   render={({ field }) => <Switch {...field} />}
//                 />
//               ) : type === "autocomplete" ? (
//                 <Controller
//                   control={control}
//                   name={name}
//                   render={({ field }) => (
//                     <Autocomplete
//                       {...field}
//                       options={["Option 1", "Option 2", "Option 3"]}
//                       renderInput={(params) => (
//                         <TextField
//                           {...params}
//                           label={label}
//                           margin="normal"
//                           fullWidth
//                           error={!!errors[name]}
//                           helperText={errors[name]?.message as string}
//                         />
//                       )}
//                     />
//                   )}
//                 />
//               ) : (
//                 <TextField
//                   label={label}
//                   margin="normal"
//                   fullWidth
//                   type={type || "text"}
//                   {...register(name)}
//                   error={!!errors[name]}
//                   helperText={errors[name]?.message as string}
//                 />
//               )}
//             </Box>
//           ))}
//           <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//             <Button type="submit" variant="contained">
//               Submit
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default DynamicProductForm;

// // (
// //     <TextField
// //       label={label}
// //       margin="normal"
// //       fullWidth
// //       type={type || "text"}
// //       {...register(name)}
// //       error={!!errors[name]}
// //       helperText={errors[name]?.message}
// //     />
// //   )
