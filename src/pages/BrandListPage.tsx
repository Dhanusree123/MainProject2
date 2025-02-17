type Brand = {
  id: string;
  title: string;
  active: string;
};

export type BrandsPageProps = {
  mode: "light" | "dark";
  toggleTheme: () => void;
};

import {
  Box,
  Breadcrumbs,
  Button,
  IconButton,
  Link,
  Pagination,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import EditIcon from "@mui/icons-material/Edit";
import { useTable } from "../hooks/useTable";
import { useLocation, useNavigate } from "react-router-dom";
// import BrandDelete from "./brand-delete";
import { Home } from "@mui/icons-material";
import { FetchData } from "../graphql/brand";
import { useCallback, useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import BrandDelete from "../sections/brands/BrandDelete";

const BrandListPage = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const getTabIndexFromUrl = (tab: string | null): number => {
    switch (tab) {
      case "all":
        return 0;
      case "active":
        return 1;
      case "inactive":
        return 2;
      default:
        return 0;
    }
  };
  const initialTab = getTabIndexFromUrl(params.get("tab"));
  const { page, setPage, rowsPerPage, onChangePage } = useTable();

  const [brands, setBrands] = useState<Brand[]>([]);
  const [count, setCount] = useState<number>(0);
  const [tab, setTab] = useState<number>(initialTab);
  const [searchBrand, setSearchBrand] = useState<string>(
    params.get("search") || ""
  );

  const navigate = useNavigate();

  const debouncedBrand = useDebounce(searchBrand, 500);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchBrand(value);
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    navigate(`?${params.toString()}`);
  };

  const editBrand = (id: string) => {
    navigate(`/brands/${id}/edit`);
  };

  const token = localStorage.getItem("accessToken");

  const getBrands = useCallback(async () => {
    const limit = rowsPerPage;
    const skip = (page - 1) * rowsPerPage;
    const search = { title: debouncedBrand };
    const filter = tab !== 0 ? { active: tab === 1 } : undefined;
    const fetchedBrands = await FetchData(
      limit,
      search,
      skip,
      undefined,
      filter
    );
    setBrands(fetchedBrands.brands);
    setCount(fetchedBrands.count);
  }, [page, rowsPerPage, debouncedBrand, tab]);

  const handleSearchFocus = () => {
    const params = new URLSearchParams(location.search);
    const val = params.get("tab");
    navigate(`/brands?page=1&tab=${val}`);
    setPage(1);
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("accessToken");
  //   navigate("/login");
  // };

  const handleTab = (_event: unknown, newValue: number) => {
    setTab(newValue);
    const tabName =
      newValue === 0 ? "all" : newValue === 1 ? "active" : "inactive";
    const params = new URLSearchParams(location.search);
    if (tabName) {
      params.delete("page");
      params.set("tab", tabName);
      if (tabName !== "all") {
        setPage(1);
      }
      navigate(`?${params.toString()}`);
    } else {
      params.delete("tab");
    }
  };

  useEffect(() => {
    getBrands();
  }, [getBrands]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  return (
    <>
      <Box sx={{ ml: "auto", mr: "auto", px: 3, py: 2, width: "80%" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          {/* <IconButton onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <WbSunny /> : <Bedtime />}
          </IconButton> */}
          {/* <Button onClick={handleLogout}>Logout</Button> */}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Breadcrumbs>
            <Link
              href="/login"
              sx={{ color: "text.secondary", textDecoration: "none" }}
            >
              <Home />
            </Link>
            <Typography>Brands</Typography>
          </Breadcrumbs>
          <Button onClick={() => navigate("/brands/new")}>Add Brand</Button>
        </Box>

        <TextField
          value={searchBrand}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
          sx={{ width: "100%", mb: 3 }}
        />

        <Grid component="div" sx={{ ml: 0, mr: 0 }}>
          <Tabs
            value={tab}
            onChange={handleTab}
            aria-label="brand filter tabs"
            sx={{ mb: 2 }}
          >
            <Tab label="All" id="tab-all" value={0} />
            <Tab label="Active" id="tab-active" value={1} />
            <Tab label="Inactive" id="tab-inactive" value={2} />
          </Tabs>

          <TableContainer sx={{ maxWidth: "100%", border: "1px solid #555" }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                    Id
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "left" }}>
                    Title
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                    Active
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {brands.map((b, index) => (
                  <TableRow key={b.id}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {(page - 1) * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell sx={{ textAlign: "left" }}>{b.title}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {b.active ? "Active" : "Inactive"}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <IconButton>
                        <EditIcon
                          fontSize="small"
                          sx={{ marginRight: 2 }}
                          onClick={() => editBrand(b.id)}
                        />
                      </IconButton>

                      <BrandDelete id={b.id} onDeleteSuccess={getBrands} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          <Pagination
            count={Math.ceil(count / 5)}
            page={page}
            onChange={onChangePage}
          />
        </Box>
      </Box>
    </>
  );
};

export default BrandListPage;
