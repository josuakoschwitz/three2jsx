import React, { Component } from "react";
// import _ from "lodash";

import SpinningSubdividedPolyhedron from "./examples/SpinningSubdividedPolyhedron";

// import Radio from "@material-ui/core/Radio";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Switch from "@material-ui/core/Switch";

// const RATIO = 0.6180339887498547;
const RATIO = 1;

class App extends Component {
  // state = {
  //   tetraeder: true,
  //   octaeder: true,
  //   hexaeder: true,
  //   icosaeder: true,
  //   dodecaeder: true
  // };

  // handleChange = key => {
  //   this.setState(state => ({ [key]: !state[key] }));
  // };

  render() {
    return (
      <div>
        <div className="container-right">
          {/* <FormControlLabel
            control={
              <Switch
                checked={this.state.tetraeder}
                onChange={this.handleChange.bind(this, "tetraeder")}
                value="tetraeder"
              />
            }
            label="Tetraeder"
          /> */}
        </div>
        <div className="container-left shadow">
          <SpinningSubdividedPolyhedron
            width={window.innerWidth * RATIO}
            height={window.innerHeight}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowResize, false);
  }

  componentWillUnmount() {
    window.removeEventListener("resize");
  }

  handleWindowResize = () => {
    this.forceUpdate();
    // _.throttle(this.forceUpdate, 1 / 30);
  };
}

export default App;
