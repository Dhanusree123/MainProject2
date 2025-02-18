import { TextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Props = TextFieldProps & {
  name: string;
  //   type: "text";
};
const RHFTextField = (props: Props) => {
  const { control, register } = useFormContext();

  const { name, helperText, type = "text" } = props;
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            fullWidth
            type={type}
            value={field.value}
            error={!!error}
            helperText={error ? error?.message : helperText}
            {...register(name)}
          />
        )}
      />
    </>
  );
};

export default RHFTextField;
