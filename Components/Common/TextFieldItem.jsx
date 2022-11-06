import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../theme";
import { TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";

const primary = theme.palette.primary.main;
const secondary = theme.palette.secondary.main;
const white = theme.palette.common.white;

const TextFieldItem = ({
  onKeyDown,
  border,
  onChange,
  width,
  BoxShadow,
  placeHolderText,
  disabled = false,
  value,
  inputProps,
  type,
  backgroundColor,
  myClasses,
  icon,
  maxLength=-1,
}) => {
  const classes = useStyles();
  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{inputProps}</InputAdornment>
        ),
        endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
      }}
      inputProps={{
        maxLength: maxLength,
      }}
      disabled={disabled}
      value={value}
      type={type || "text"}
      onKeyDown={onKeyDown}
      id="standard-full-width"
      style={{
        backgroundColor: backgroundColor || white,
        width: width || "95%",
        boxShadow: BoxShadow || 0
        // border:border||none
      }}
      className={`${classes.inputTextField} ${myClasses}`}
      onChange={onChange}
      placeholder={placeHolderText}
      fullWidth
      margin="normal"
      autoComplete="off"
      InputLabelProps={{
        shrink: true
      }}
    />
  );
};

const useStyles = makeStyles({
  inputTextField: {
    textAlign: "right",
    width: "90%",
    borderRadius: ".5rem",
    marginTop: "0",
    marginBottom: "1.1rem",
    "& :hover::before": {
      borderBottom: "none !important"
    },
    "& input": {
      padding: "1.25rem",
      fontSize: "1.2rem",
      "&:after": {
        borderBottom: "2px solid #00000000 !important"
      }
    },
    "& ::before": {
      borderBottom: "none"
    },
    "& .MuiTypography-colorTextSecondary": {
      color: `#8c8c8c !important`,
      fontSize: "1.4rem"
    },
    "& p": {
      fontWeight: "700"
    }
  }
});

export default TextFieldItem;
