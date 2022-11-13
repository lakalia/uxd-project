export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  sizeScale,
  colorScale,
  colorCategory,
  xAttribute,
  yAttribute
}) =>
  data.map((d) => {
    const tooltipValue = (d) =>
    d.country.concat(
      xAttribute == 'year' ? ', ' : ' '.concat(d.year, ', '),
      xAttribute,
      ': ',
      d[xAttribute],
      ', ',
      yAttribute,
      ': ',
      d[yAttribute]
    );

    return (
      <circle
        className="mark"
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={sizeScale(yValue(d))}
        fill={colorScale(colorCategory(d))}
      >
        <title>{tooltipValue(d)}</title>
      </circle>
    );
  });
