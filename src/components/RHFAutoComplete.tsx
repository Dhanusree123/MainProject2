// import { Autocomplete, TextField } from "@mui/material";
// import { Controller, useFormContext } from "react-hook-form";

// type Props = {
//   name: string;
//   options: string[];
//   label: string;
//   value: string;
//   placeholder?: string;
//   helperText?: string;
// };
// const RHFAutoComplete = (props: Props) => {
//   const { control } = useFormContext();
//   const {
//     name,
//     options = [],
//     label,
//     value,
//     placeholder = "",
//     helperText = "",
//   } = props;
//   return (
//     <>
//       <Controller
//         name={name}
//         control={control}
//         render={({ field, fieldState: { error } }) => (
//           <Autocomplete
//             {...field}
//             multiple
//             freeSolo
//             options={options}
//             value={field.value || []}
//             onChange={(_event, value) => {
//               field.onChange(value);
//             }}
//             renderInput={(params) => (
//               <TextField
//                 sx={{ textTransform: "capitalize" }}
//                 {...params}
//                 label={label}
//                 value={value}
//                 placeholder={placeholder}
//                 error={!!error}
//                 helperText={error ? error.message : helperText}
//               />
//             )}
//           />
//         )}
//       />
//     </>
//   );
// };

// export default RHFAutoComplete;

import { Autocomplete, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type OptionType = { id: string; title: string };

type Props = {
  name: string;
  label: string;
  value: OptionType | null;
  options: OptionType[];
  onChange: (value: OptionType | null) => void;
};

const CustomAutocomplete = ({
  name,
  label,
  options,
  value,
  onChange,
}: Props) => {
  const {
    control,
    // setValue,
    formState: { errors },
  } = useFormContext();

  // const [values, setValues] = useState<OptionType | null>(null);

  // const handleChange = (
  //   event: React.ChangeEvent,
  //   newValue: OptionType | null
  // ) => {
  //   setValues(newValue);
  //   onChange(newValue);
  // };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          {...field}
          value={value}
          options={options}
          getOptionLabel={(option) => (option.title ? option.title : "")}
          onChange={(_, newValue) => {
            // setValue(name, value?.id || "");
            onChange(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!errors[name]}
              helperText={errors[name]?.message as string}
            />
          )}
        />
      )}
    />
  );
};

export default CustomAutocomplete;
