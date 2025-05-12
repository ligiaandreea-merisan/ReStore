import { useEffect, useState } from "react";
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import NavBar from "./NavBar";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  //if "dark mode" = "true" -> specify "dark". If it's "dark mode" = "false" -> then "light".
  const palleteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: palleteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  //  For useEffect -> we provide a callback function by using "=>" and we need to specify dependencies 
  // (an array of dep. "[]" from the end) even tough they are not required. When the dependencies change,
  // then the idea is that the useEffect runs again to attempt to synchronize with the external state
  // of API.
  //  We will not have dependencies so the useEffect will only run once when this component first mounts.
  //  Inside useEffect we'll use a JavaScript fetch function to go and get some data from API. Then we 
  // hardcode the address of the API server. Then, because the fetch returns a JavaScript promise, we get hold
  // of the response and use response.json and execute this (so it will give us a list of products). But to use
  // the list of products, we'll have the list of products "data" and use our setProducts method to set the products 
  // to what we get back from API.
  //  Now we need CORS and we'll move the app to run on port 3000, not 5001 and from http to https -> Program.cs

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <Box
        sx={{
          minHeight: "100vh",
          background: darkMode
            ? "radial-gradient(circle, #1e3aBa, #111B27)"
            : "radial-gradient(circle, #baecf9, #f0f9ff)",
          py: 6,
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 8 }}>
          <Catalog products={products} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
