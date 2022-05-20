export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
}) => {

  const handleClick = (id) => {
    console.log(`mark clicked: ${id}`);
    return;
  }

  console.log(`printing data`);
  var sortedData = data.sort((a, b) => a.Population - b.Population);
  console.log(sortedData);

  return (sortedData.map((d, idx) => (
    <rect
      className="mark"
      key={yValue(d)}
      x={0}
      y={yScale(yValue(d))}
      rx={3}
      width={xScale(xValue(d))}
      height={yScale.bandwidth()}
      data-id={idx}
      onClick={() => {handleClick(idx)}}
    >
      <title>{tooltipFormat(xValue(d))}</title>
    </rect>
  )));

}
