import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    // display: "none"
  }
});

function StyledButton(props) {
  const { classes } = props;
  return (
    <Button
      size="small"
      onClick={props.onClick}
      variant="outlined"
      color="secondary"
      className={classes.button}
    >
      {props.label}
    </Button>
  );
}

StyledButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StyledButton);
