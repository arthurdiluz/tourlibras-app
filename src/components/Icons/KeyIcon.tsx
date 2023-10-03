import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const KeyIcon = (props: SvgProps) => (
  <Svg fill="white" {...props}>
    <Path
      fillOpacity={1}
      stroke="#fff"
      d="M47.5 4.75a23.78 23.78 0 0 0-22.592 31.112l-17.1 17.07a2.405 2.405 0 0 0-.683 1.693V66.5A2.375 2.375 0 0 0 9.5 68.875h11.875A2.375 2.375 0 0 0 23.75 66.5v-4.75h4.75a2.375 2.375 0 0 0 2.375-2.375v-4.75h4.75a2.405 2.405 0 0 0 1.692-.683l2.82-2.85a23.751 23.751 0 0 0 30.189-29.021A23.75 23.75 0 0 0 47.5 4.75Zm5.938 22.563a4.75 4.75 0 1 1 0-9.501 4.75 4.75 0 0 1 0 9.5Z"
    />
  </Svg>
);
export default KeyIcon;
