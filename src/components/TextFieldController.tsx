// import { TextField } from "@mui/material";
// import { Controller, useFormContext } from "react-hook-form";

// type TextFieldControllerProps = {
//   name: string;
//   label: string;
//   type?: string;
// };

// const TextFieldController = ({
//   name,
//   label,
//   type,
// }: TextFieldControllerProps) => {
//   const { control } = useFormContext();
//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => (
//         <TextField
//           {...field}
//           value={field.value ?? ""}
//           label={label}
//           margin="normal"
//           fullWidth
//           type={type}
//           error={!!error}
//           helperText={error ? error.message : ""}
//           onChange={(e) => field.onChange(e.target.value)}
//         />
//       )}
//     />
//   );
// };

// export default TextFieldController;
