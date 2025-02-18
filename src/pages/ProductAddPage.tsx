import { Home } from "@mui/icons-material";
import { Link, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ProductForm from "../sections/products/ProductForm";
import { useState } from "react";
// import { AddProductType } from "../types/product";
import ProductFetchButton from "../sections/products/ProductFetchButton";
// import { Scraper } from "../types/scraper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IProduct, ProductSchema } from "../newtypes/product";

const ProductPage = () => {
  const [product, setProduct] = useState<IProduct>();
  const methods = useForm<IProduct>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      mrp: 0,
      listPrice: 0,
      dealPrice: 0,
      code: "",
      brand: "",
      brandId: "",
      categoryId: "",
      // categoryPath: "",
      store: "",
      storeId: "",
      images: [],
      rating: 0,
      reviews: 0,
      handPicked: false,
      // sales:""
    },
    mode: "onChange",
  });

  const { setValue } = methods;
  const setScraperData = (data: IProduct) => {
    if (!data) return;

    setValue("title", data.title);
    setValue("slug", data.slug);
    setValue("description", data.description);
    setValue("mrp", data.mrp);
    setValue("listPrice", data.listPrice);
    setValue("dealPrice", data.dealPrice);
    setValue("code", data.code);
    setValue("brand", data.brand);
    setValue("brandId", data.brandId);
    setValue("categoryId", data.categoryId);
    setValue("store", data.store);
    setValue("storeId", data.storeId);
    setValue("images", data.images);
    setValue("rating", data.rating);
    setValue("reviews", data.reviews);
    setValue("handPicked", data.handPicked);

    setProduct(data);
    console.log(data);
  };
  // const transformedData: IProduct = {
  // id: crypto.randomUUID(), // Generate a unique ID
  // brand: data.brand || "",
  // brandId: crypto.randomUUID(),
  // categoryId: crypto.randomUUID(),
  // active: true,
  // expired: false,
  // storeId: crypto.randomUUID(),
  // handPicked: false,
  // categoryPath: "",
  // sales:data.sales||[],
  // code: data.code || "",
  // store: "", // Default or fetch store information
  // handPicked: false, // Default value
  // category: data.category || "", // Default or fetch category
  // slug: data.title
  //   .trim()
  //   .replace(/\s*:\s*/g, "-")
  //   .replace(/_/g, "-")
  //   .replace(/\s+/g, "-")
  //   .toLowerCase(),
  // dealPrice: data.dealPrice,
  // description: data.description,
  // images: data.images,
  // listPrice: data.listPrice,
  // mrp: data.mrp,
  // rating: data.rating,
  // reviews: data.reviews,
  // title: data.title,
  // };

  // setProduct(transformedData);
  // Object.entries(transformedData).forEach(([key, value]) => {
  // setValue(key as keyof IProduct, value);
  // });
  // console.log(data);
  // setProduct(data);
  // setValue("title", data.title || "");
  // setValue("description", data.description || "");
  // setValue("mrp", data.mrp || 0);
  // setValue("listPrice", data.listPrice || 0);
  // setValue("dealPrice", data.dealPrice || 0);
  // setValue("code", data.code || "");
  // setValue("rating", data.rating || 0);
  // setValue("reviews", data.reviews || 0);
  // setValue("images", data.images || []);

  // const slug = data.title
  //   .trim()
  //   .replace(/\s*:\s*/g, "-")
  //   .replace(/_/g, "-")
  //   .replace(/\s+/g, "-")
  //   .toLowerCase();
  // console.log(slug);
  // setValue("slug", slug);
  // if (data.images && data.images.length > 0) {
  //   setTimeout(() => {
  //     setImagePreviews(data.images);
  //     setMainImage(data.images[0]);
  //     setLoading(false);
  //   }, 500);
  // } else {
  //   setLoading(false);
  // }
  // };

  console.log(product);
  const handleSubmit = async () => {};
  return (
    <>
      <Box>
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
          <Typography>Add Product</Typography>
          <ProductFetchButton onDataFetched={setScraperData} />

          <ProductForm product={product ?? null} onSubmit={handleSubmit} />
        </Breadcrumbs>
      </Box>
    </>
  );
};

export default ProductPage;
