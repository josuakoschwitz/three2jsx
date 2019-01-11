import React, { PureComponent } from "react";

import Renderer from "../../three/Renderer";
import Scene from "../../three/Scene";
import Camera from "../../three/Camera";
import Light from "../../three/Light";

import Axes from "../SpinningSubdividedPolyhedron/Axes";
import Chart from "./Chart";

class SpinningSubdividedPolyhedron extends PureComponent {
  state = {
    timestamp: 0
  };

  animationFrame = timestamp => {
    this.setState({ timestamp });
    this.props.onAnimate && this.props.onAnimate(timestamp);
  };

  render() {
    const { width, height, ...others } = this.props;
    return (
      <Renderer width={width} height={height} onAnimate={this.animationFrame}>
        {/* <Scene background={0xeeeeee} fog={0xff0000}> */}
        <Scene background={0x110033} fog={0x110033}>
          <Camera x={-1} y={8} z={10} />
          <Light type="ambient" color={0xaaaaaa} />
          <Light type="directional" color={0xffffff} y={5} z={10} />
          <Light type="directional" color={0xffffff} x={5} y={5} z={-10} />
          {/* <Axes /> */}
          <Chart {...others} />
        </Scene>
      </Renderer>
    );
  }
}

export default SpinningSubdividedPolyhedron;
