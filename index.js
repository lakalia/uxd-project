import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import ReactDropdown from 'react-dropdown';
//import Slider from 'react-rangeslider';
import {
  scaleLinear,
  scaleLog,
  scaleOrdinal,
  scaleSqrt,
  format,
  extent,
  max,
} from 'd3';
import { useData } from './useData';
import { useWorldAtlas } from './useWorldAtlas';
import { useCodes } from './useCodes';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { ColorLegend } from './ColorLegend';
import { Marks } from './Marks';
import { Background } from './Background.js';
import { CountryColorsList } from './CountryColorsList.js';
import { Slider } from './Slider.js';

const width = 960;
const height = 425;
const margin = { top: 20, right: 225, bottom: 17, left: 100 };

const yAttributes = [
  { value: 'income_per_cap', label: 'Income per capita' },
  { value: 'total_population', label: 'Total Population' },
  { value: 'life_expectancy', label: 'Life Expectancy' },
  { value: 'fertility_rate', label: 'Fertility Rate' },
];
const initialYAttribute = 'total_population';

const xAttributes = [
  { value: 'income_per_cap', label: 'Income per capita' },
  { value: 'total_population', label: 'Total Population' },
  { value: 'life_expectancy', label: 'Life Expectancy' },
  { value: 'fertility_rate', label: 'Fertility Rate' },
  { value: 'year', label: 'Year' },
];
//

const initialXAttribute = 'income_per_cap';
//const initialXAttribute = 'year';

const minYr = 1950;
const maxYr = 2015;
const yrStep = 1;
const initialYr = 1950;

const colorList = [
  '#FDAE61',
  '#E6F598',
  '#3288BD',
  '#FEE08B',
  '#66C2A5',
  '#D53E4F',
  '#F46D43',
];

const colorLegendLabel1 = 'World Bank';
const colorLegendLabel2 = 'Global Regions:';

const titleText1 = 'Gapminder';
const titleText2 = 'Data';
const titleText3 = 'by Country';

// React ftn
const App = () => {
  const data = useData();
  const bgData = useWorldAtlas();
  const countryCodes = useCodes();

  const countryColors = useMemo(
    () => CountryColorsList(data, colorList, countryCodes),
    [data, colorList, countryCodes]
  );
  //console.log('just passed countryColors');

  //const hoverColor = null; //= '#FEE08B';
  const [hoverColor, setHoverColor] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]); //'#FEE08B','#3288BD'
  /*  console.log(selectedColors);
  console.log("length:");
  console.log(selectedColors.length);
*/
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  //const yAttribute = initialYAttribute;
  const yValue = (d) => d[yAttribute];

  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  //const yAttribute = initialYAttribute;
  const xValue = (d) => d[xAttribute];
  const sliderHidden = xAttribute == 'year' ? 'hidden' : 'visible';
  //console.log(sliderHidden);

  const [yr, setYr] = useState(initialYr);
  //console.log(yr);

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = useMemo(
    () =>
      data
        ? scaleLinear()
            .domain(extent(data, xValue))
            .range([0, innerWidth])
            .nice()
        : scaleLinear(),
    [data, xValue, innerWidth]
  );

  const yScale = useMemo(
    () =>
      !data
        ? scaleLinear()
        : scaleLinear().domain(extent(data, yValue)).range([innerHeight, 0]),
    [data, yValue, innerHeight]
  );

  const maxRadius =
    xAttribute != 'year' &&
    (yAttribute == 'income_per_cap' || yAttribute == 'total_population')
      ? 20
      : 2;

  const sizeScale = useMemo(
    () =>
      !data
        ? scaleSqrt()
        : maxRadius == 20
        ? scaleSqrt()
            .domain([0, max(data, yValue)])
            .range([0, maxRadius])
        : scaleSqrt()
            .domain([0, max(data, yValue)])
            .range([maxRadius, maxRadius]),
    [data, yValue, maxRadius]
  );

  const colorCategory = (d) => d.world_bank_region;

  const colorScale = useMemo(
    () =>
      data
        ? scaleOrdinal()
            .domain(data.map(colorCategory))
            //.range(d3.schemeSet1);
            .range(colorList)
        : scaleOrdinal(),
    [data, colorCategory, colorList]
  );

  const filteredData = useMemo(
    () =>
      data
        ? data.filter((d) => {
            if (selectedColors.length > 0 || hoverColor) {
              if (
                selectedColors.includes(colorScale(colorCategory(d))) ||
                hoverColor == colorScale(colorCategory(d))
              ) {
                if (xAttribute == 'year' || d.year == yr) {
                  return d;
                }
              }
            } else {
              if (xAttribute == 'year' || d.year == yr) {
                return d;
              }
            }
          })
        : null,
    [data, selectedColors, hoverColor, colorScale, colorCategory, xAttribute]
  );

  if (!data || !countryCodes || !bgData) {
    return <pre>Loading...</pre>;
  }

  const siFormat = format('.2s');
  const yAxisTickFormat = (tickValue) => siFormat(tickValue).replace('G', 'B');
  const xAxisTickFormat = (tickValue) =>
    xAttribute == 'year' ? tickValue : siFormat(tickValue).replace('G', 'B');

  // return svg
  return (
    <>
      <div class="dropdown rotated">
        <ReactDropdown
          options={yAttributes}
          value={yAttribute}
          onChange={({ value }) => setYAttribute(value)}
        />
      </div>
      <svg width={width} height={height}>
        // Background
        <g transform={`scale(0.82)`} opacity="0.75">
          <Background
            bgdata={bgData}
            countryColors={countryColors}
            hoverColor={hoverColor}
            selectedColors={selectedColors}
          />
        </g>
        // Scatterplot
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
            tickOffset={5}
          />
          <AxisLeft
            yScale={yScale}
            innerWidth={innerWidth}
            tickFormat={yAxisTickFormat}
            tickOffset={5}
          />
          <g opacity="0.75">
            <Marks
              data={filteredData}
              xScale={xScale}
              yScale={yScale}
              xValue={xValue}
              yValue={yValue}
              sizeScale={sizeScale}
              colorScale={colorScale}
              colorCategory={colorCategory}
              xAttribute={xAttribute}
              yAttribute={yAttribute}
            />
          </g>
        </g>
        // Title:
        <g
          className="title-text"
          transform={`translate(${innerWidth + margin.right / 2 + 10},${
            innerHeight / 8
          })`}
        >
          <text x="0" dy="0">
            {titleText1}
          </text>
          <text x="0" dy="25">
            {titleText2}
          </text>
          <text x="0" dy="50">
            {titleText3}
          </text>
        </g>
        // Legend:
        <g
          transform={`translate(${innerWidth + margin.right / 2 + 10},${
            innerHeight / 3
          })`}
        >
          <text x="0" dy="0">
            {colorLegendLabel1}
          </text>
          <text x="0" dy="15">
            {colorLegendLabel2}
          </text>
          <ColorLegend
            colorScale={colorScale}
            hoverColor={hoverColor}
            onHover={setHoverColor}
            selectedColors={selectedColors}
            onSelectColor={setSelectedColors}
          />
        </g>
      </svg>
      <div class="slider-container">
        <Slider
          minYr={minYr}
          maxYr={maxYr}
          yrStep={yrStep}
          yr={yr}
          onSlide={setYr}
          sliderHidden={sliderHidden}
        />
      </div>
      <div class="dropdown bottom">
        <ReactDropdown
          options={xAttributes}
          value={xAttribute}
          onChange={({ value }) => setXAttribute(value)}
        />
      </div>
    </>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
