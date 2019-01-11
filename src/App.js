import React, { Component } from "react";

// controls
import Slider from "./ui/Slider";
import Button from "./ui/Button";

// three scenes
import SpinningSubdividedPolyhedron from "./examples/SpinningSubdividedPolyhedron";
import SegmentationChart from "./examples/SegmentationChart";

import { example1, radioactive, piano } from "./constants/chartExamples";
const examples = [example1, radioactive, piano];

class App extends Component {
  state = {
    morph: 0,
    morphAnimate: 0,
    threeWidth: window.innerWidth,
    timestamp: 0,
    exampleNr: 0
  };

  three = React.createRef();
  control = React.createRef();

  handleChange = (key, value) => {
    this.setState(state => ({ [key]: value }));
  };

  handleToggle = key => {
    this.setState(state => ({ [key]: !state[key] }));
  };

  animationFrame = timestamp => {
    this.setState(state => {
      const sec = (timestamp - state.timestamp) / 1000;
      let { morph, morphAnimate } = state;
      if (morphAnimate !== 0) {
        morph += sec / morphAnimate;
        if (morph > 0.999) {
          morph = 0.999;
          morphAnimate = 0;
        }

        if (morph < 0) {
          morph = 0;
          morphAnimate = 0;
        }
      }

      return { timestamp, morph, morphAnimate };
    });
  };

  handleChangeExample = inc => {
    this.setState(state => ({
      morph: 0,
      morphAnimate: 0,
      exampleNr: (state.exampleNr + examples.length + inc) % examples.length
    }));
  };

  render() {
    return (
      <div ref={this.control}>
        <div className="container-right">
          {/* <Slider
            label="Donut … Bars"
            min={0}
            max={0.999}
            value={this.state.morph}
            onChange={this.handleChange.bind(this, "morph")}
          /> */}
          <Button
            color="secondary"
            label="morph to donut"
            onClick={() => this.setState({ morphAnimate: -1.5 })}
          />
          <Button
            color="secondary"
            label="morph to bars"
            onClick={() => this.setState({ morphAnimate: 1.5 })}
          />
          <br />
          <br />
          <Button
            color="secondary"
            label="prev example"
            onClick={this.handleChangeExample.bind(this, -1)}
          />
          <Button
            color="secondary"
            label="next example"
            onClick={this.handleChangeExample.bind(this, +1)}
          />
        </div>
        <div ref={this.three} className="container-left shadow">
          <SegmentationChart
            onAnimate={this.animationFrame}
            width={this.state.threeWidth}
            height={window.innerHeight}
            data={examples[this.state.exampleNr]}
            morph={this.state.morph}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.handleWindowResize();
    window.addEventListener("resize", this.handleWindowResize);
    this.control.current.addEventListener("resize", this.stopProp);
  }

  componentWillUnmount() {
    window.removeEventListener("resize");
    this.control.current.removeEventListener("resize");
  }

  handleWindowResize = () => {
    this.setState({
      threeWidth: this.three.current.offsetWidth
    });
    // _.throttle(this.forceUpdate, 1 / 30);
  };

  stopProp = event => {
    event.stopPropagation();
  };
}

export default App;
