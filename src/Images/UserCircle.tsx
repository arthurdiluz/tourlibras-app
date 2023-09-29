import React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";

const UserCircleSvg = (props: SvgProps) => (
  <Svg {...props}>
    <G
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={7}
    >
      <Path d="M69.5 121.625c28.788 0 52.125-23.337 52.125-52.125S98.288 17.375 69.5 17.375 17.375 40.712 17.375 69.5s23.337 52.125 52.125 52.125Z" />
      <Path d="M69.5 86.875c11.995 0 21.719-9.724 21.719-21.719 0-11.995-9.724-21.719-21.719-21.719-11.995 0-21.719 9.724-21.719 21.72 0 11.994 9.724 21.718 21.719 21.718Z" />
      <Path d="M34.641 108.268a39.096 39.096 0 0 1 55.31-15.62 39.103 39.103 0 0 1 14.408 15.62" />
    </G>
  </Svg>
);
export default UserCircleSvg;
