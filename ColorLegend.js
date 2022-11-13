export const ColorLegend = ({
  //NOTE: changes must be made to both True and False sections
  colorScale,
  hoverColor,
  onHover,
  selectedColors,
  onSelectColor,
  offset = 15,
  fadeOp = 0.25,
  visibleOp = 1,
}) =>
  colorScale.domain().map((domainValue, i) =>
    !domainValue.indexOf('&') ? (
      <g
        transform={`translate(0,${2 * offset + 2 * i * offset})`}
        onMouseEnter={() => {
          onHover(colorScale(domainValue));
        }} 
  /*      onMouseOver={() => {
          onHover(colorScale(domainValue));
        }} */
        onMouseOut={() => {
          onHover(null);
        }}
        onClick={() => {
          if (!selectedColors.includes(colorScale(domainValue))) {
            selectedColors.push(colorScale(domainValue));
          } else {
            selectedColors.splice(
              selectedColors.indexOf(colorScale(domainValue)),
              1
            );
          }
          //console.log(SelectedColors);
          return onSelectColor(selectedColors);
        }}
        opacity={
          (!hoverColor && selectedColors.length == 0) ||
          hoverColor == colorScale(domainValue) ||
          selectedColors.includes(colorScale(domainValue))
            ? visibleOp
            : fadeOp
        }
      >
        <rect
          x="0"
          y="0"
          width={offset}
          height={2 * offset}
          fill={colorScale(domainValue)}
        />
        <text className="axis-label" x={1.5 * offset} dy={offset}>
          {domainValue.substring(0, domainValue.length)}
        </text>
      </g>
    ) : (
      <g
        transform={`translate(0,${2 * offset + 2 * i * offset})`}
        onMouseEnter={() => {
          onHover(colorScale(domainValue));
        }} 
  /*      onMouseOver={() => {
          onHover(colorScale(domainValue));
        }} */
        onMouseOut={() => {
          onHover(null);
        }}
        onClick={() => {
          if (!selectedColors.includes(colorScale(domainValue))) {
            selectedColors.push(colorScale(domainValue));
          } else {
            selectedColors.splice(
              selectedColors.indexOf(colorScale(domainValue)),
              1
            );
          }
          //console.log(SelectedColors);
          return onSelectColor(selectedColors);
        }}
        opacity={
          (!hoverColor && selectedColors.length == 0) ||
          hoverColor == colorScale(domainValue) ||
          selectedColors.includes(colorScale(domainValue))
            ? visibleOp
            : fadeOp
        }
      >
        <rect
          x="0"
          y="0"
          width={offset}
          height={2 * offset}
          fill={colorScale(domainValue)}
        />
        <text className="axis-label" x={1.5 * offset} dy={offset}>
          {domainValue.substring(0, domainValue.indexOf('&') + 1)}
        </text>
        <text className="axis-label" x={1.5 * offset} dy={offset + 13}>
          {domainValue.substring(
            domainValue.indexOf('&') + 1,
            domainValue.length
          )}
        </text>
      </g>
    )
  );
