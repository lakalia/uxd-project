import { scaleLinear, scaleOrdinal } from 'd3';

export const CountryColorsList = (data, colorList, countryCodes) => {
  if (data && countryCodes) {
    //const colorCategory = (d) => d.world_bank_region;
    const colorScale = scaleOrdinal()
      .domain(data.map((d) => d.world_bank_region))
      //.domain(data.map(colorCategory))
      //.range(d3.schemeSet1);
      .range(colorList);

    const countryCode = (d) => {
      for (let i = 0; i < countryCodes.length; i++) {
        if (countryCodes[i]['name'] === d.country) {
          return countryCodes[i]['country-code'];
        }
      }
    };

    const countryColors = [];
    const map = new Map();
    for (const c of data.map((d) => {
      return { country: d.country, region: d.world_bank_region };
    })) {
      if (!map.has(c.country)) {
        map.set(c.country, true);
        countryColors.push({
          country: c.country,
          countryCode: countryCode(c),
          color: colorScale(c.region),
        });
      }
    }
    // add missing countries
       countryColors.push(
      {
        country: 'S. Sudan',
        countryCode: countryCode('S. Sudan'),
        color: '#FEE08B',
      },
      {
        country: 'Congo',
        countryCode: countryCode('Congo'),
        color: '#FEE08B',
      },
      {
        country: 'Dem. Rep. Congo',
        countryCode: countryCode('Dem. Rep. Congo'),
        color: '#FEE08B',
      },
      {
        country: 'Greenland',
        countryCode: countryCode('Greenland'),
        color: '#E6F598',
      }
    );

    //console.log(countryColors);

    return countryColors;
  } else {
    return [];
  }
};
