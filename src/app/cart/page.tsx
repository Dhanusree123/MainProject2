"use client";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import { IProduct } from "../page";
import { useRouter } from "next/navigation";

const CardPage = () => {
  const router = useRouter();
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
  const [productCount, setProductCount] = useState<{ [key: number]: number }>(
    {}
  );
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProducts = JSON.parse(
        localStorage.getItem("products") || "[]"
      );
      const storedCart = JSON.parse(localStorage.getItem("cart") || "{}");

      const uniqueProducts = storedProducts.reduce(
        (acc: IProduct[], product: IProduct) => {
          if (!acc.some((p) => p.id === product.id)) {
            acc.push(product);
          }
          return acc;
        },
        []
      );

      setCartProducts(uniqueProducts);
      setProductCount(storedCart);
    }
  }, []);

  const updateLocalStorage = (updatedCart: { [key: number]: number }) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
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
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    }

    setProductCount(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const handleIncrease = (id: number, product: IProduct) => {
    const updatedCart = { ...productCount, [id]: (productCount[id] || 0) + 1 };

    if (!cartProducts.some((p) => p.id === id)) {
      setCartProducts((prev) => [...prev, product]);
      localStorage.setItem(
        "products",
        JSON.stringify([...cartProducts, product])
      );
    }

    setProductCount(updatedCart);
    updateLocalStorage(updatedCart);
  };

  return (
    <>
      <Button variant="outlined" onClick={() => router.push("/")}>
        Go To Products
      </Button>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Card>
              <CardContent>
                {cartProducts.map((product) => (
                  <Box
                    key={product.id}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        component="img"
                        src={product.image}
                        width={180}
                        height={180}
                        padding={2}
                        sx={{ objectFit: "cover" }}
                      />
                      <Box sx={{ marginLeft: 2 }}>
                        <Typography>{product.title}</Typography>
                        <Typography>Rs. {product.price}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Button onClick={() => handleDecrease(product.id)}>
                        ➖
                      </Button>
                      <Typography>{productCount[product.id] || 1}</Typography>
                      <Button
                        onClick={() => handleIncrease(product.id, product)}
                      >
                        ➕
                      </Button>
                    </Box>
                  </Box>
                ))}
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" color="warning">
                  {cartProducts.reduce(
                    (acc, p) => acc + p.price * (productCount[p.id] || 1),
                    0
                  )}
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <Typography>PRICE DETAILS</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>MRP ({Object.keys(productCount).length} items)</Box>
              <Box>
                Rs.
                {cartProducts.reduce(
                  (acc, p) => acc + p.price * (productCount[p.id] || 1),
                  0
                )}
              </Box>
            </Box>

            <Typography>
              Total Amount Rs.
              {cartProducts.reduce(
                (acc, p) => acc + p.price * (productCount[p.id] || 0),
                0
              ) + 12}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CardPage;
