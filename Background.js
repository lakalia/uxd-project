import { geoNaturalEarth1, geoPath } from 'd3';

//const projection = geoMercator();
const projection = geoNaturalEarth1();
const path = geoPath(projection);

export const Background = ({
  bgdata: { countries, interiors },
  countryColors,
  hoverColor,
  selectedColors,
}) => {
  const countryColor = (country) => {
    for (let c of countryColors) {
      if (
        country == c.country
          .replace('United States', 'United States of America')
          .replace('Dominican Republic', 'Dominican Rep.')
          .replace('Lao', 'Laos')
          .replace('Central African Republic', 'Central African Rep.')
          .replace('Equatorial Guinea', 'Eq. Guinea')
        //.replace('\u00F4','o')
      ) {
        return hoverColor == c.color || selectedColors.includes(c.color)
          ? c.color
          : '#C0C0BB';
        //return c.color;
      }
    }
  };

  return (
    <g className="atlas">
      {countries.features.map((feature) => (
        <path
          d={path(feature)}
          fill={
            countryColor(feature.properties.name)
              ? countryColor(feature.properties.name)
              : '#C0C0BB'
          }
        />
      ))}
      <path className="interiors" d={path(interiors)} />
    </g>
  );
};
