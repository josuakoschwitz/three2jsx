import React, { PureComponent } from "react";
// import React3 from "react-three";

import Renderer from "../three/Renderer";
import Scene from "../three/Scene";
import Light from "../three/light";
import SubidideDemo from "../three/experimental/SubidideDemo";
import Planes from "../three/experimental/Planes";

class Chart extends PureComponent {
  static defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  render() {
    return (
      <Renderer width={this.props.width} height={this.props.height}>
        <Scene>
          <Light type="ambient" color={0x404040} />
          <Light type="point" color={0xff0040} x={-10} z={10} />
          <Light type="point" color={0x0000dd} x={10} y={5} z={5} />
          <Light type="point" color={0x00dddd} y={10} z={2} />
          <Light type="directional" color={0xaaaaaa} y={5} z={10} />

          <Planes size={6} segments={1} />
          <SubidideDemo shape="tetra" size={14} subdivide={7} />
          {/* <SubidideDemo shape="octa" size={6} subdivide={5} /> */}
          {/* <SubidideDemo shape="hexa" size={6} subdivide={6} /> */}
          {/* <SubidideDemo shape="icosa" size={4} subdivide={2} /> */}
          {/* <SubidideDemo shape="dodeca" size={4} subdivide={2} /> */}
        </Scene>
      </Renderer>
    );
  }
}

export default Chart;
