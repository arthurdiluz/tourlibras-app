import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";

const ArrowLeftIcon = (props: SvgProps) => (
  <Svg {...props}>
    <G
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
    >
      <Path d="M32.906 19.5H6.094M17.063 8.531 6.092 19.5l10.97 10.969" />
    </G>
  </Svg>
);
export default ArrowLeftIcon;
