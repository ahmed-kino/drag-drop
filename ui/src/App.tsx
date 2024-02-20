import React from "react";
import Main from "./pages/Main";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
    },
  },
  spacing: 8,
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Main />
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
