import React, { useState } from "react";
import { useQuery } from "react-query";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";

const useStyles = makeStyles({
  root: {
    marginTop: "20px",
    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none",
  },
  heading: {
    flexBasis: "70%",
    flexShrink: 0,
    "& svg": {
      verticalAlign: "bottom",
    },
  },
  status: {
    width: "150px",
    textAlign: "center",
    padding: "10px 0px",
    borderRadius: "8px",
  },
  listBanks: {
    display: "block",
    padding: "0px",
  },
  isActive: {
    backgroundColor: "#4caf50",
    color: "#ffffff",
    marginLeft: "30px",
  },
  inActive: {
    backgroundColor: "#ffc107",
    color: "#ffffff",
    marginLeft: "30px",
  },
  linkHotLine: {
    marginTop: "5px",
    "& svg": {
      verticalAlign: "bottom",
      marginRight: "5px",
    },
  },
  detailBank: {
    borderTop: "5px solid #F2F3FA",
  },
});
const fetchBanks = async (id) => {
  const res = await fetch(
    `https://my-json-server.typicode.com/fred-ng/transwap-coding-challenge/banks/${id}`
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export default function BanksInCountry({ banks }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(banks[0].id || 1);

  const { data, isLoading, isError, error } = useQuery(
    ["supportedBank", expanded],
    () => fetchBanks(expanded)
  );

  const renderSuportedBank = () => {
    return (
      banks &&
      banks.map((bank) => (
        <Accordion
          expanded={expanded === bank.id}
          onChange={() => setExpanded(bank.id)}
          key={bank.name}
        >
          <AccordionSummary
            aria-controls={`${bank.name}-content`}
            id={`${bank.name}-header`}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography className={classes.heading}>{bank.name}</Typography>
            <Typography
              className={clsx(classes.status, {
                [classes.isActive]: bank.isActive,
                [classes.inActive]: !bank.isActive,
              })}
            >
              {bank.isActive ? "Active" : "Inactive"}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.detailBank}>
            {isLoading && <CircularProgress />}
            {isError && (
              <Alert severity="error">Something went wrong — {error}!</Alert>
            )}
            {data && (
              <div>
                <Typography variant="h4">{data.name}</Typography>
                <img src={data.logoUrl} alt={data.name} />
                <Typography
                  variant="subtitle1"
                  color="primary"
                  className={classes.linkHotLine}
                >
                  <CallOutlinedIcon />
                  <a href={`tel:${data.hotline}`}>{data.hotline}</a>
                </Typography>
              </div>
            )}
          </AccordionDetails>
        </Accordion>
      ))
    );
  };
  return (
    <Accordion className={classes.root}>
      <AccordionSummary aria-controls="main-content" id="main-content-header">
        <Typography color="primary" className={classes.heading}>
          Bank name <ExpandMoreOutlinedIcon />
        </Typography>
        <Typography color="textSecondary" className={classes.status}>
          Status
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.listBanks}>
        {renderSuportedBank()}
      </AccordionDetails>
    </Accordion>
  );
}
