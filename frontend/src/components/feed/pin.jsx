import * as React from "react";

const ICON = `m 10 35 l 15 30 l 15 -30 A 20 20 180 1 0 10 35 z`;

const pinStyle = {
  cursor: "pointer",
  fill: "#d31",
  stroke: "none",
};

function Pin({ size = 20 }) {
  return (
    <svg height={size} viewBox="-8 0 55 65" style={pinStyle}>
      <path d={ICON} />
    </svg>
  );
}

export default React.memo(Pin);
