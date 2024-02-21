import React from "react";
import Header from "./Header/Header.tsx";
import theme from "./theme.tsx";
import { ThemeProvider } from "@mui/material";

const MyApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
      </div>
    </ThemeProvider>
  );
};

export default MyApp;
