// "use client";
// import {
//   Box,
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   Pagination,
//   Tooltip,
//   Typography,
// } from "@mui/material";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Grid from "@mui/material/Grid2";
// import { useRouter } from "next/navigation";
// import PinterestIcon from "@mui/icons-material/Pinterest";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// export type IProduct = {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   category: string;
//   image: string;
//   rating: {
//     rate: number;
//     count: number;
//   };
// };
// const ProductsPage = () => {
//   const [products, setProducts] = useState<IProduct[]>([]);
//   const [page, setPage] = useState<number>(1);
//   const [totalCount, setTotalCount] = useState<number>(0);
//   const [productCount, setProductCount] = useState<{ [key: number]: number }>(
//     {}
//   );

//   const router = useRouter();

//   const limit = 4;
//   const skip = (page - 1) * limit;

//   const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
//     setPage(value);
//     router.push(`?page=${value}`);
//   };

//   const handleAddToLocal = async (id: number) => {
//     const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
//     const productToCart = res.data;
//     const existingStorage = localStorage.getItem("products");
//     const existingCart = localStorage.getItem("cart");

//     const cartItems: IProduct[] = existingStorage
//       ? JSON.parse(existingStorage)
//       : [];
//     const productCount: { [key: number]: number } = existingCart
//       ? JSON.parse(existingCart)
//       : {};

//     if (productCount[id]) {
//       productCount[id] += 1;
//     } else {
//       productCount[id] = 1;
//       cartItems.push(productToCart);
//     }
//     localStorage.setItem("products", JSON.stringify(cartItems));
//     localStorage.setItem("cart", JSON.stringify(productCount));
//   };

//   const updateLocalStorage = (updatedCart: { [key: number]: number }) => {
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const handleIncrease = (id: number, product: IProduct) => {
//     const updatedCart = { ...productCount, [id]: (productCount[id] || 0) + 1 };

//     if (!products.some((p) => p.id === id)) {
//       setProducts((prev) => [...prev, product]);
//       localStorage.setItem("products", JSON.stringify([...products, product]));
//     }

//     setProductCount(updatedCart);
//     updateLocalStorage(updatedCart);
//   };
//   const handleDecrease = (id: number) => {
//     const updatedCart = { ...productCount };
//     if (updatedCart[id] > 1) {
//       updatedCart[id] -= 1;
//     } else {
//       delete updatedCart[id];
//       const updatedProducts = products.filter((product) => product.id !== id);
//       setProducts(updatedProducts);
//       localStorage.setItem("products", JSON.stringify(updatedProducts));
//     }

//     setProductCount(updatedCart);
//     updateLocalStorage(updatedCart);
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const response = await axios.get(`https://fakestoreapi.com/products`);
//       const fetchedProducts = response.data;
//       setTotalCount(response.data.length);
//       setProducts(fetchedProducts);
//     };
//     fetchProducts();
//   }, [page]);

//   const productsToShow = products.slice(skip, limit + skip);

//   return (
//     <Box sx={{ p: 4 }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
//         <Box>
//           <Typography variant="h4" fontWeight="bold">
//             <PinterestIcon />
//             Products
//           </Typography>
//         </Box>
//         <Button
//           variant="text"
//           sx={{ borderRadius: "20px", px: 3 }}
//           onClick={() => router.push("/cart")}
//         >
//           <ShoppingCartIcon />
//           Go to Cart
//         </Button>
//       </Box>
//       <Box sx={{ m: 5 }}>
//         <Grid container spacing={2}>
//           {productsToShow.map((product) => (
//             <Grid key={product.id} size={{ xs: 12, md: 12, lg: 6 }}>
//               <Card sx={{ maxWidth: 500 }}>
//                 <CardContent>
//                   <Box
//                     component="img"
//                     src={product.image}
//                     alt={product.title}
//                     sx={{ m: 2, width: 300, height: 300 }}
//                   />
//                   <Tooltip title={product.title} sx={{ maxWidth: 100 }}>
//                     <Typography>{product.title}</Typography>
//                   </Tooltip>
//                 </CardContent>
//                 <CardActions>
//                   <Button onClick={() => handleAddToLocal(product.id)}>
//                     Add to Cart
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           mt: 4,
//           fontSize: "60px",
//         }}
//       >
//         <Pagination
//           count={totalCount / limit}
//           page={page}
//           onChange={handleChange}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default ProductsPage;

"use client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Pagination,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/navigation";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
export type IProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};
const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [productCount, setProductCount] = useState<{ [key: number]: number }>(
    {}
  );
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);

  const router = useRouter();

  const limit = 4;
  const skip = (page - 1) * limit;

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(`https://fakestoreapi.com/products`);
      setTotalCount(response.data.length);
      setProducts(response.data);
    };
    fetchProducts();

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setProductCount(JSON.parse(storedCart));
    }
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setCartProducts(JSON.parse(storedProducts));
    }
  }, [page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    router.push(`?page=${value}`);
  };

  const updateLocalStorage = (
    updatedCart: { [key: number]: number },
    updatedProducts: IProduct[]
  ) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const handleIncrease = (id: number, product: IProduct) => {
    const updatedCart = { ...productCount, [id]: (productCount[id] || 0) + 1 };
    // setProductCount(updatedCart);
    // updateLocalStorage(updatedCart);
    const existingProduct = cartProducts.find((p) => p.id === id);
    const updatedProducts = existingProduct
      ? cartProducts
      : [...cartProducts, product];

    setProductCount(updatedCart);
    setCartProducts(updatedProducts);
    updateLocalStorage(updatedCart, updatedProducts);
  };
  // const handleAddToLocal = async (id: number) => {
  //   const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
  //   const productToCart = res.data;
  //   const existingStorage = localStorage.getItem("products");
  //   const existingCart = localStorage.getItem("cart");

  //   const cartItems: IProduct[] = existingStorage
  //     ? JSON.parse(existingStorage)
  //     : [];
  //   const productCount: { [key: number]: number } = existingCart
  //     ? JSON.parse(existingCart)
  //     : {};

  //   if (productCount[id]) {
  //     productCount[id] += 1;
  //   } else {
  //     productCount[id] = 1;
  //     cartItems.push(productToCart);
  //   }
  //   localStorage.setItem("products", JSON.stringify(cartItems));
  //   localStorage.setItem("cart", JSON.stringify(productCount));
  // };

  const handleDecrease = (id: number) => {
    const updatedCart = { ...productCount };
    if (updatedCart[id] > 1) {
      updatedCart[id] -= 1;
    } else {
      delete updatedCart[id];
      const updatedProducts = cartProducts.filter(
        (product) => product.id !== id
      );
      setCartProducts(updatedProducts);
      updateLocalStorage(updatedCart, updatedProducts);
      return;
    }
    setProductCount(updatedCart);
    updateLocalStorage(updatedCart, cartProducts);
  };

  const productsToShow = products.slice(skip, limit + skip);

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Products
        </Typography>
        <Button
          variant="text"
          sx={{ borderRadius: "20px", px: 3 }}
          onClick={() => router.push("/cart")}
        >
          <ShoppingCartIcon />
        </Button>
      </Box>
      <Box sx={{ m: 5 }}>
        <Grid container spacing={2}>
          {productsToShow.map((product) => (
            <Grid key={product.id} size={{ xs: 12, md: 12, lg: 6 }}>
              <Card sx={{ maxWidth: 500 }}>
                <CardContent>
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.title}
                    sx={{ m: 2, width: 300, height: 300 }}
                  />
                  <Tooltip title={product.title}>
                    <Typography>{product.title}</Typography>
                  </Tooltip>
                </CardContent>
                <CardActions>
                  {productCount[product.id] ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Button onClick={() => handleDecrease(product.id)}>
                        -
                      </Button>
                      <Typography>{productCount[product.id]}</Typography>
                      <Button
                        onClick={() => handleIncrease(product.id, product)}
                      >
                        +
                      </Button>
                    </Box>
                  ) : (
                    <Button onClick={() => handleIncrease(product.id, product)}>
                      Add to Cart
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={Math.ceil(totalCount / limit)}
          page={page}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};

export default ProductsPage;
