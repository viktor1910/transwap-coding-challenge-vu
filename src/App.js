import React, { useState } from "react";
import { useQuery } from "react-query";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import CountriesSelection from "./component/CountriesSelection";
import BanksInCountry from "./component/BanksInCountry";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#F2F3FA",
    height: "100%",
    color: "#000000",
  },
});

const fetchCountries = async () => {
  const res = await fetch(
    "https://my-json-server.typicode.com/fred-ng/transwap-coding-challenge/countries"
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

function App() {
  const classes = useStyles();
  const { data, isLoading, isError, error } = useQuery(
    "countries",
    fetchCountries
  );
  const [selectedCountry, setSelectedCountry] = useState(1);
  return (
    <div className="App">
      <Box className={classes.root}>
        <Container>
          <Typography variant="h1" gutterBottom>
            Country selection
          </Typography>
          <Typography variant="subtitle1" paragraph>
            Please select your registered country or region:
          </Typography>
          {isLoading && <CircularProgress />}
          {isError && (
            <Alert severity="error">Something went wrong — {error}!</Alert>
          )}
          {data && (
            <>
              <CountriesSelection
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                contries={data}
              />
              <BanksInCountry banks={data[data.findIndex(country => country.id === selectedCountry)].supportedBanks}/>
            </>
          )}
        </Container>
      </Box>
    </div>
  );
}

export default App;
