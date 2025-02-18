import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import Navbar from "./components/Navbar";
import ProjectHomePage from "./pages/ProjectHomePage";
import BrandListPage from "./pages/BrandListPage";
import BrandEditPage from "./pages/BrandEditPage";
import BrandNew from "./pages/BrandNewPage";
import ProductEditFormPage from "./pages/ProductEditFormPage";
import ProductAddFormPage from "./pages/ProductAddFormPage";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import getTheme from "./theme/useTheme";
import { CssBaseline } from "@mui/material";
import ProductAddPage from "./pages/ProductAddPage";

const App = () => {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    document.documentElement.setAttribute("data-theme", newMode);
  };

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={getTheme(mode)}>
          <CssBaseline />
          <Navbar mode={mode} toggleTheme={toggleTheme} />
          <Routes>
            <Route path="/login" element={<ProjectHomePage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route
              path="/products/:id/edit"
              element={<ProductEditFormPage />}
            />
            <Route path="/products/new" element={<ProductAddFormPage />} />
            <Route path="/brands" element={<BrandListPage />} />
            <Route path="/brands/:id/edit" element={<BrandEditPage />} />
            <Route path="/brands/new" element={<BrandNew />} />
            <Route path="/test" element={<ProductAddPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
