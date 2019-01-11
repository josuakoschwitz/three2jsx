import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/lab/Slider";

const styles = {
  root: {
    // width: 300
  },
  slider: {
    padding: "8px 8px 8px 8px"
  }
};

class SimpleSlider extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ value });
    this.props.onChange(value);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography id="label">{this.props.label}</Typography>
        <Slider
          classes={{ container: classes.slider }}
          value={this.props.value || this.state.value}
          aria-labelledby="label"
          onChange={this.handleChange}
          min={this.props.min}
          max={this.props.max}
        />
      </div>
    );
  }
}

SimpleSlider.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired
};

export default withStyles(styles)(SimpleSlider);
