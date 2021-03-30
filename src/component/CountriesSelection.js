import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles({
  root: {
    position: "relative",
    backgroundColor: "#ffffff",
    textAlign: "center",
    width: "250px",
    height: "150px",
    borderRadius: "8px",
    borderColor: "#CED0D6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    border: "0.15rem solid",
    boxShadow: "none",
    cursor: "pointer",
  },
  isComing: {
    color: "#9e9e9e",
  },
  comingSoon: {
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    left: "0",
    right: "0",
    textAlign: "center",
    color: "#ffffff",
    backgroundColor: "#424242",
    padding: "10px 5px",
    width: "50%",
    borderRadius: "30px",
  },
  selected: {
    borderColor: "#5954E9",
    position: "relative",
  },
  selectedIcon: {
    position: "absolute",
    top: "0",
    left: "0",
    color: "#ffffff",
    width: "40px",
    height: "40px",
    background: "#5954E9",
    clipPath: "polygon(0% 0%,0% 100%,100% 0%)",
    "& svg": {
      position: "absolute",
      top: 0,
      left: 0,
    },
  },
});

export default function CountriesSelection({
  selectedCountry,
  setSelectedCountry,
  contries,
}) {
  const classes = useStyles();

  const renderDataCountries = (data) => {
    return data.map((country) => (
      <Grid item lg={4} md={4} key={country.name}>
        <Card
          className={clsx(classes.root, {
            [classes.isComing]: country.isComing,
            [classes.selected]: selectedCountry === country.id,
          })}
          onClick={() => !country.isComing && setSelectedCountry(country.id)}
        >
          <img src={country.thumbnailUrl} alt={country.name} />
          <Typography variant="h5">{country.name}</Typography>
          {country.isComing && (
            <div className={classes.comingSoon}>Coming soon...</div>
          )}
          {selectedCountry === country.id && (
            <div className={classes.selectedIcon}>
              <CheckIcon />
            </div>
          )}
        </Card>
      </Grid>
    ));
  };
  return (
    <Grid container spacing={4} alignItems="flex-start" wrap="wrap">
      {renderDataCountries(contries)}
    </Grid>
  );
}
