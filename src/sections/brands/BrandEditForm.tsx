import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  // IconButton,
  Link,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { IBrand, UpdateBrandSchema } from "../../pages/BrandEditPage";
import AddIcon from "@mui/icons-material/Add";
import Home from "@mui/icons-material/Home";
//   import { Bedtime, WbSunny } from "@mui/icons-material";
//   import { BrandsPageProps } from "../pages/BrandListPage";

type Props = {
  brand: IBrand | undefined;
  onSubmit: (data: IBrand) => void;
};

const BrandEditForm = ({ brand, onSubmit }: Props) => {
  // const { brand, onSubmit } = props;

  const {
    handleSubmit,
    // setValue,
    control,
    formState: { errors },
  } = useForm<IBrand>({
    resolver: zodResolver(UpdateBrandSchema),
    defaultValues: {
      id: brand?.id ?? "",
      title: brand?.title ?? "",
      active: brand?.active ?? false,
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgColor: "Background.default",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            m: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Breadcrumbs separator="›">
            <Link
              href="/login"
              sx={{ color: "text.secondary", textDecoration: "none" }}
            >
              <Home />
            </Link>
            <Link
              href="/brands"
              sx={{ color: "text.secondary", textDecoration: "none" }}
            >
              Brands
            </Link>
            <Typography>Add Brand</Typography>
          </Breadcrumbs>
          <Box>
            {/* <IconButton onClick={toggleTheme} color="inherit">
                {mode === "dark" ? <WbSunny /> : <Bedtime />}
              </IconButton> */}
          </Box>
        </Box>
        <Box>
          <Stack justifyContent="center" alignItems="center">
            <Card sx={{ m: 2 }}>
              <Typography variant="h6">Edit Brand</Typography>
              <Box
                component={Button}
                variant="text"
                sx={{
                  border: "2px dashed black",
                  borderRadius: "10px",
                  marginTop: 3,
                  p: 23,
                  textAlign: "center",
                  color: "black",
                }}
              >
                <AddIcon />
                Add Image
              </Box>
              <Stack
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ width: "100%", mt: 3 }}
              >
                <Controller
                  name="id"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth margin="normal" disabled />
                  )}
                />

                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      fullWidth
                      error={!!errors.title}
                      helperText={errors.title?.message}
                    />
                  )}
                />

                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Controller
                    name="active"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    )}
                  />
                  <Typography>Active</Typography>
                </Stack>

                <Button
                  sx={{ alignSelf: "flex-end", width: 120, mt: 3 }}
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
              </Stack>
            </Card>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default BrandEditForm;
