import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";

const VideoUploadIcon = (props: SvgProps) => (
  <Svg {...props}>
    <Path
      fill="#D9D9D9"
      d="M82 56.174h-4.817l-2.366-3.548A1.375 1.375 0 0 0 73.652 52h-11.13a1.373 1.373 0 0 0-1.166.626l-2.365 3.548h-4.817A4.19 4.19 0 0 0 50 60.348v19.478A4.191 4.191 0 0 0 54.174 84H82a4.191 4.191 0 0 0 4.174-4.174V60.348A4.19 4.19 0 0 0 82 56.174Zm-7.652 13.217a6.26 6.26 0 1 1-12.522 0 6.26 6.26 0 0 1 12.522 0Z"
    />
  </Svg>
);

export default VideoUploadIcon;
