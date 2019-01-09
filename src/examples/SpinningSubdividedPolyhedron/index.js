import React, { PureComponent } from "react";
// import React3 from "react-three";

import { Props } from "../../lib/reactControlFlow";

import Renderer from "../../three/Renderer";
import Scene from "../../three/Scene";
import Camera from "../../three/Camera";
import Light from "../../three/Light";

import SubidideDemo from "./SubidideDemo";
import Planes from "./Planes";

class SpinningSubdividedPolyhedron extends PureComponent {
  state = {
    timestamp: 0
  };

  animationFrame = timestamp => {
    this.setState({ timestamp });
  };

  render() {
    const { width, height } = this.props;
    return (
      <Renderer width={width} height={height} onAnimate={this.animationFrame}>
        <Scene>
          <Camera y={1} z={10} />
          <Light type="ambient" color={0x404040} />
          <Light type="point" color={0xff0040} x={-10} z={10} />
          <Light type="point" color={0x0000dd} x={10} y={5} z={5} />
          <Light type="point" color={0x00dddd} y={10} z={2} />
          <Light type="directional" color={0xaaaaaa} y={5} z={10} />

          <Props timestamp={this.state.timestamp}>
            <Planes size={6} segments={1} />
            <SubidideDemo shape="tetra" size={14} subdivide={6} />
            {/* <SubidideDemo timestamp={this.state.timestamp} shape="octa" size={6} subdivide={5} /> */}
            {/* <SubidideDemo timestamp={this.state.timestamp} shape="hexa" size={6} subdivide={6} /> */}
            {/* <SubidideDemo timestamp={this.state.timestamp} shape="icosa" size={4} subdivide={3} /> */}
            {/* <SubidideDemo timestamp={this.state.timestamp} shape="dodeca" size={4} subdivide={2} /> */}
          </Props>
        </Scene>
      </Renderer>
    );
  }
}

export default SpinningSubdividedPolyhedron;
