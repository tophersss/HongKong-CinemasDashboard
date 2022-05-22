export const AxisBottom = ({ xScale, innerHeight, tickFormat }) =>
  xScale.ticks().map((tickValue, idx) => {
    if (idx % 3 == 0) {
      return (
        <g
          className="tick"
          key={tickValue}
          transform={`translate(${xScale(tickValue)},0)`}
        >
          <line y2={innerHeight} />
          <text style={{ textAnchor: "middle" }} dy=".71em" y={innerHeight + 3}>
            {tickFormat(tickValue)}
          </text>
        </g>
      )
    }
  }
  );