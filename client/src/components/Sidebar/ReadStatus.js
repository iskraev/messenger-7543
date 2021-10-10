import React from "react";
import { Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  badge: {
    background: "#3A8DFF",
    color: 'white',
    fontFamily: "Open Sans, sans-serif",
    fontSize: 10,
    fontWeight: 'bold',
    marginRight: 20,
  },
}));

const ReadStatus = (props) => {
  const classes = useStyles();
  const { count } = props;

  return (
    <Badge badgeContent={count} classes={{ badge: classes.badge }} />
  );
};

export default ReadStatus;
