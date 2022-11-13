import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/lakalia/ca6cc81792b9d357a20cf2f9fd4c7924/raw/gapminder_summary_from_1950.csv';

export const useData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const row = (d) => {
      d.year = +d.year;
      d.income_per_cap = +d.income_per_cap;
      d.total_population = +d.total_population;
      d.life_expectancy = +d.life_expectancy;
      d.fertility_rate = +d.fertility_rate;

      //console.log(d); 
      
      //need to filter out rows with 0's
      if (
        d.income_per_cap > 0 &&
        d.total_population > 0 &&
        d.life_expectancy > 0 &&
        d.fertility_rate > 0
      ) {
        return d;
      }
    };
    csv(csvUrl, row).then(setData);
  }, []);
	//console.log(data);
  return data;
};
