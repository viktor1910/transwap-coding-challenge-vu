import React, { useState, useEffect, useMemo } from "react";
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
  header: {
    display: "flex",
    padding: "0px 16px",
  },
  heading: {
    flexBasis: "70%",
    flexShrink: 0,
    cursor: "pointer",
    "& svg": {
      verticalAlign: "bottom",
    },
  },
  status: {
    width: "150px",
    textAlign: "center",
    padding: "10px 0px",
    borderRadius: "8px",
    cursor: "pointer",
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

const useSortableData = (items) => {
  const [sortConfig, setSortConfig] = React.useState(null);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (sortConfig === "name") return a.name > b.name;
        if (sortConfig === "status") return a.isActive < b.isActive;
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    setSortConfig(key);
  };

  return { items: sortedItems, requestSort };
};

export default function BanksInCountry({ banks }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(banks[0].id || 1);

  const { items, requestSort } = useSortableData(banks);

  const { data, isError, error, isFetching } = useQuery(
    ["supportedBank", expanded],
    () => fetchBanks(expanded),
    { keepPreviousData: true, staleTime: 50000 }
  );

  const renderSuportedBank = () => {
    return (
      items &&
      items.map((bank) => (
        <Accordion
          expanded={expanded === bank.id}
          key={bank.name}
          onChange={() => setExpanded(bank.id)}
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
            {isFetching && <CircularProgress />}
            {isError && (
              <Alert severity="error">Something went wrong — {error}!</Alert>
            )}
            {data && !isFetching && (
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
    <div className={classes.root}>
      <div
        className={classes.header}
        aria-controls="main-content"
        id="main-content-header"
      >
        <Typography
          color="primary"
          className={classes.heading}
          onClick={() => requestSort("name")}
        >
          Bank name <ExpandMoreOutlinedIcon />
        </Typography>
        <Typography
          color="textSecondary"
          className={classes.status}
          onClick={() => requestSort("status")}
        >
          Status
        </Typography>
      </div>
      <div className={classes.listBanks}>{renderSuportedBank()}</div>
    </div>
  );
}
