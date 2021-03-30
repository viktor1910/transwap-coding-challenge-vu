import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const queryClient = new QueryClient();
const theme = createMuiTheme({
  overrides: {
    MuiContainer: {
      root: {
        paddingTop: "24px",
        paddingBottom: "24px",
        marginLeft: "0px",
        marginRight: "0px",
      },
    },
    MuiTypography: {
      gutterBottom: {
        marginBottom: "2rem",
      },
    },
    MuiAccordion: {
      root: {
        marginBottom: '10px',
        '&:before': {
          content: 'none',
        }
      },
      rounded: {
        borderRadius: '8px'
      }
    }
  },
  typography: {
    h1: {
      fontSize: "3rem",
      fontWeight: "revert",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
