import React from "react";
import { Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  badge: {
    background: theme.palette.primary.main,
    color: theme.palette.white.main,
    fontSize: 10,
    fontWeight: theme.typography.fontWeight.bold,
    marginRight: theme.spacing(10),
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
